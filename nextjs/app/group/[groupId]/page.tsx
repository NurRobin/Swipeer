'use client';
import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css';
import InviteLinkModal from './components/InviteLinkModal';
import LeaveGroupModal from './components/LeaveGroupModal';
import { UsersRecord, GroupMembersRecord, GroupsRecord, SurveysRecord, InviteLinksRecord, GroupMembersRoleOptions} from '@/types/pocketbase-types';

const GroupPage = ({ params }: { params: Promise<{ groupId: string }> }) => {
  const [group, setGroup] = useState<GroupsRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [leaveGroupError, setLeaveGroupError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [maxUses, setMaxUses] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [surveys, setSurveys] = useState<(SurveysRecord & { creator_name: string })[]>([]);
  const [membersWithDisplayName, setMembersWithDisplayName] = useState<(GroupMembersRecord & { display_name: string })[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setGroupId(unwrappedParams.groupId);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!groupId) return;

    const fetchGroup = async () => {
      try {
        const group = await pb.collection('groups').getOne<GroupsRecord>(groupId);
        const members = await pb.collection('group_members').getFullList<GroupMembersRecord>({
          filter: `group_id = "${groupId}"`
        });

        const userPromises = members.map((member) => pb.collection('users').getOne<UsersRecord>(member.user_id));

        const users = await Promise.all(userPromises);

        const membersWithDisplayName = members.map((member, index) => ({
          ...member,
          display_name: users[index].display_name,
          role: member.role as GroupMembersRoleOptions,
        }));

        membersWithDisplayName.sort((a, b) => new Date(a.joined_at ?? 0).getTime() - new Date(b.joined_at ?? 0).getTime());
        console.log('Group:', group);
        console.log('Members:', membersWithDisplayName);

        setGroup(group);
        setMembersWithDisplayName(membersWithDisplayName);

        const user = pb.authStore.model as UsersRecord;
        if (user) {
          const isAdmin = membersWithDisplayName.some(member => member.user_id === user.id && member.role.toLowerCase() === 'admin');
          setIsAdmin(isAdmin);
        }

        const surveys = await pb.collection('surveys').getFullList<SurveysRecord>({
          filter: `created_in = "${groupId}"`
        });

        const surveyCreators = await Promise.all(surveys.map(survey => pb.collection('users').getOne<UsersRecord>(survey.created_by)));

        setSurveys(surveys.map((survey, index) => ({
          ...survey,
          creator_name: surveyCreators[index].display_name,
        })));

      } catch (error) {
        if ((error as any).status === 404) {
          setError('This group could not be found or you do not have access.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  const handleLeaveGroup = async () => {
    try {
      const user = pb.authStore.model as UsersRecord;
      if (!user) {
        setLeaveGroupError('You are not logged in. Please log in and try again.');
        return;
      }

      if (!group) return;

      const groupMembersRecord = await pb.collection('group_members').getFullList<GroupMembersRecord>({
        filter: `group_id = "${groupId}"`
      });

      if (groupMembersRecord.length === 0) {
        setLeaveGroupError('You are not a member of this group.');
        return;
      }

      const isAdmin = groupMembersRecord.some(member => member.user_id === user.id && member.role === 'admin');

      if (isAdmin) {
        if (groupMembersRecord.length === 1) {
          const confirmDelete = confirm('You are the last member of this group. The group will be deleted if you leave. Do you want to proceed?');
          if (confirmDelete) {
            if (groupId) {
              await pb.collection('groups').delete(groupId);
              router.push('/');
              return;
            }
          } else {
            return;
          }
        } else {
          const newAdmin = groupMembersRecord
            .filter(member => member.user_id !== user.id)
            .sort((a, b) => new Date(a.joined_at ?? 0).getTime() - new Date(b.joined_at ?? 0).getTime())[0];

          if (newAdmin) {
            await pb.collection('group_members').update(newAdmin.id, { role: 'admin' });
          }
        }
      }

      for (const record of groupMembersRecord.filter(m => m.user_id === user.id)) {
        try {
          await pb.collection('group_members').delete(record.id);
        } catch (error) {
        }
      }

      router.push('/');
    } catch (error) {
      setLeaveGroupError('An error occurred while trying to leave the group. Please try again later.');
    }
  };

  const handleGenerateInviteLink = async (isUnlimited: boolean) => {
    try {
      const user = pb.authStore.model as UsersRecord;
      if (!user) {
        throw new Error('You are not logged in. Please log in and try again.');
      }

      if (!groupId) {
        throw new Error('Group ID is missing.');
      }

      await pb.collection('invite_links').create<InviteLinksRecord>({
        group_id: groupId,
        created_by: user.id,
        max_uses: isUnlimited ? null : maxUses ?? 1,
        infinite: isUnlimited,
      });

      setFeedback('Invite link generated successfully.');
      setShowModal(false);
      setMaxUses(null);
    } catch (error) {
      throw new Error('An error occurred while generating the invite link. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 bg-white auto-shadow rounded-lg max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 ">Fehler</h1>
        <p className="text-gray-700 mb-6">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500  rounded-lg auto-shadow hover:bg-blue-600"
        >
          Zurück zum Start
        </button>
      </div>
    );
  }

  const calculateMemberSince = (joinedAt: string) => {
    const joinedDate = new Date(joinedAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - joinedDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="relative p-6 bg-white auto-shadow rounded-lg max-w-4xl mx-auto">
      {isAdmin && (
        <div className="absolute top-6 right-6 flex flex-col items-end">
          <button
            className="py-2 px-4 bg-[var(--primary-color)] font-semibold rounded-md hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] w-auto"
            onClick={() => {
              setShowModal(true);
              setMaxUses(null);
            }}
          >
            Generate invite link
          </button>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4 text-[var(--primary-color)]">{group?.name}</h1>
      <p className="text-gray-700 mb-6">{group?.description}</p>
  
      {/* Members List */}
      <h2 className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">Members</h2>
      <ul className="list-none pl-0">
        {membersWithDisplayName.map((member) => (
          <li key={member.id} className="mb-4 flex items-center bg-gray-100 p-4 rounded-lg auto-shadow">
            <p className="text-gray-800 font-medium flex-1">{member.display_name}</p>
            <p className="text-gray-500 text-sm flex-1 text-center">
              Member since {member.joined_at ? calculateMemberSince(member.joined_at) : 'N/A'} {member.joined_at && calculateMemberSince(member.joined_at) === 1 ? 'day' : 'days'}
            </p>
            <span className="text-gray-600 flex-1 text-right">{member.role}</span>
          </li>
        ))}
      </ul>
  
      {/* Surveys List */}
      <h2 className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">Surveys</h2>
      <ul className="list-none pl-0">
        {surveys.map((survey) => (
          <li
            key={survey.id}
            className="mb-4 flex items-center bg-gray-100 p-4 rounded-lg auto-shadow cursor-pointer hover:bg-gray-200"
            onClick={() => router.push(`/survey/${survey.id}`)}
          >
            <p className="text-gray-800 font-medium flex-1">{survey.title}</p>
            <p className="text-gray-600 text-sm flex-1 text-center">Created by {survey.creator_name}</p>
            <p className="text-gray-600 text-sm flex-1 text-right">
              {new Date(survey.start_at).toLocaleDateString()} - {new Date(survey.end_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
  
      {leaveGroupError && (
        <div className="text-red-500 text-center mt-4">
          {leaveGroupError}
        </div>
      )}
      {feedback && (
        <div className="text-green-500 text-center mt-4">
          {feedback}
        </div>
      )}
      <div className="mt-6 flex justify-center items-center">
        <button
          onClick={() => setShowLeaveModal(true)}
          className="w-full max-w-xs py-2 px-4 bg-[var(--primary-color)] font-semibold rounded-md hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)]"
        >
          Leave group
        </button>
      </div>
      {showModal && (
        <InviteLinkModal
          maxUses={maxUses}
          setMaxUses={setMaxUses}
          handleGenerateInviteLink={handleGenerateInviteLink}
          setShowModal={setShowModal}
        />
      )}
      {showLeaveModal && (
        <LeaveGroupModal
          handleLeaveGroup={handleLeaveGroup}
          setShowLeaveModal={setShowLeaveModal}
        />
      )}
    </div>
  );
};

export default GroupPage;