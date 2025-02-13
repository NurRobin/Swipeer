'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import '@/styles/globals.css';
import InviteLinkModal from './components/InviteLinkModal';
import LeaveGroupModal from './components/LeaveGroupModal';
import { useGroup } from './hooks/useGroup';
import { useLeaveGroup } from './hooks/useLeaveGroup';
import { useGenerateInviteLink } from './hooks/useGenerateInviteLink';

const GroupPage = () => {
  const [maxUses, setMaxUses] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const router = useRouter();

  const { groupId } = useParams<{ groupId: string }>()
  const groupQuery = useGroup(groupId)
  const leaveGroupMutation = useLeaveGroup(groupId);
  const generateInviteLinkMutation = useGenerateInviteLink(groupId)

  if (groupQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (groupQuery.error) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-black">Fehler</h1>
        <p className="text-gray-700 mb-6">{groupQuery.error.message}</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
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
    <div className="relative p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      {groupQuery.data?.isAdmin && (
        <div className="absolute top-6 right-6 flex flex-col items-end">
          <button
            className="py-2 px-4 bg-primary-color text-white font-semibold rounded-md hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color w-auto"
            onClick={() => {
              setShowModal(true);
              setMaxUses(null);
            }}
          >
            Generate invite link
          </button>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4 text-black">{groupQuery.data?.name}</h1>
      <p className="text-gray-700 mb-6">{groupQuery.data?.description}</p>
      <h2 className="text-2xl font-semibold mb-4 text-black">Members</h2>
      <ul className="list-none pl-0">
        {groupQuery.data?.members.map((member) => (
          <li key={member.id} className="mb-4 flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 font-medium flex-1">{member.display_name}</p>
            <p className="text-gray-500 text-sm flex-1 text-right">
              Member since {calculateMemberSince(member.joined_at)} {calculateMemberSince(member.joined_at) === 1 ? 'day' : 'days'}
            </p>
            <span className="text-gray-600 flex-1 text-right">{member.role}</span>
          </li>
        ))}
      </ul>
      {leaveGroupMutation.error && (
        <div className="text-red-500 text-center mt-4">
          {leaveGroupMutation.error.message}
        </div>
      )}
      {generateInviteLinkMutation.data?.created && (
        <div className="text-green-500 text-center mt-4">
          {'Invite link generated successfully'}
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setShowLeaveModal(true)}
          className="w-full max-w-xs py-2 px-4 bg-primary-color text-white font-semibold rounded-md hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
        >
          Leave group
        </button>
      </div>
      {showModal && (
        <InviteLinkModal
          maxUses={maxUses}
          setMaxUses={setMaxUses}
          handleGenerateInviteLink={(isUnlimited: boolean) => generateInviteLinkMutation.mutateAsync({
            isUnlimited,
            maxUses
          })}
          setShowModal={setShowModal}
        />
      )}
      {showLeaveModal && (
        <LeaveGroupModal
          handleLeaveGroup={leaveGroupMutation.mutateAsync}
          setShowLeaveModal={setShowLeaveModal}
        />
      )}
    </div>
  );
};

export default GroupPage;

