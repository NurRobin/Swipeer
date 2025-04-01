'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-secondary)]">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="loader"></div>
          <p className="text-[var(--text-secondary)] mt-4">Gruppe wird geladen...</p>
        </div>
      </div>
    );
  }

  if (groupQuery.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-secondary)] py-12 px-4">
        <div className="w-full max-w-lg bg-[var(--background-primary)] rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--accent-color-1)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]">Fehler</h1>
          <p className="text-[var(--text-secondary)] mb-6">{groupQuery.error.message}</p>
          <Link href="/">
            <button
              type="button"
              className="px-5 py-2.5 bg-transparent border border-[var(--background-tertiary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--background-secondary)] transition-colors duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Zurück zur Startseite
              </div>
            </button>
          </Link>
        </div>
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
    <div className="min-h-screen flex flex-col items-center bg-[var(--background-secondary)] py-12 px-4">
      <div className="w-full max-w-4xl">
        {/* Header mit Zurück-Button */}        
        {/* Hauptkarte */}
        <div className="bg-[var(--background-primary)] rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl relative overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]">
                {groupQuery.data?.name}
              </h1>
              <p className="text-[var(--text-secondary)]">{groupQuery.data?.description}</p>
            </div>
            
            {groupQuery.data?.isAdmin && (
              <button
                className="mt-4 md:mt-0 py-2.5 px-5 bg-gradient-to-r from-[var(--accent-color-1)] to-[var(--secondary-color)] text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 self-start"
                onClick={() => {
                  setShowModal(true);
                  setMaxUses(null);
                }}
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Einladungslink erstellen
                </div>
              </button>
            )}
          </div>
          
          {/* Mitglieder-Liste */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)] flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Mitglieder ({groupQuery.data?.members.length})
            </h2>
            <div className="bg-[var(--background-secondary)] rounded-xl overflow-hidden">
              <ul className="divide-y divide-[var(--background-tertiary)]">
                {groupQuery.data?.members.map((member) => (
                  <li key={member.id} className="p-4 hover:bg-[var(--background-tertiary)] transition-colors flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center flex-1">
                      <div className="min-w-10 h-10 rounded-full bg-gradient-to-r from-[var(--accent-color-1)] to-[var(--secondary-color)] flex items-center justify-center text-white font-medium text-lg mr-3">
                        {member.display_name.charAt(0)}
                      </div>
                      <span className="font-medium text-[var(--text-primary)]">{member.display_name}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end flex-1 text-sm gap-4">
                      <span className="text-[var(--text-secondary)]">
                        Mitglied seit {calculateMemberSince(member.joined_at)} {calculateMemberSince(member.joined_at) === 1 ? 'Tag' : 'Tagen'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${member.role === 'admin' ? 'bg-[var(--primary-color)]' : 'bg-[var(--secondary-color)]'}`}>
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Feedback-Meldungen */}
          {leaveGroupMutation.error && (
            <div className="bg-red-50 border-l-4 border-[var(--accent-color-1)] p-4 mb-6 rounded-md">
              <p className="text-[var(--accent-color-1)] text-sm">{leaveGroupMutation.error.message}</p>
            </div>
          )}
          
          {generateInviteLinkMutation.data?.created && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">Einladungslink wurde erfolgreich erstellt!</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Gruppe verlassen Button */}
          <div className="flex justify-center mt-8">
            <Link href="/">
              <button type="button" className="px-5 py-2.5 bg-transparent border border-[var(--background-tertiary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--background-secondary)] transition-colors duration-200">
                Zurück
              </button>
            </Link>
            <button
              onClick={() => setShowLeaveModal(true)}
              className="px-5 py-2.5 bg-transparent border border-[var(--accent-color-1)] text-[var(--accent-color-1)] rounded-lg hover:bg-[var(--accent-color-1)] hover:text-white transition-all duration-200">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Gruppe verlassen
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Modals */}
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
