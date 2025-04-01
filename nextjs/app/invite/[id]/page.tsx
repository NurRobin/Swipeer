'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useInviteLinkGroupInfo } from './hooks/useInviteLinkGroupInfo';
import { useJoinGroup } from './hooks/useJoinGroup';
import Link from 'next/link';

const InvitePage: React.FC = () => {
    const params = useParams<{ id: string }>();
    const [error, setError] = useState<string | null>(null);
    const inviteLinkGroupQuery = useInviteLinkGroupInfo(params.id);
    const joinGroupMutation = useJoinGroup(params.id);

    const handleJoinGroup = async () => {
        const invite = inviteLinkGroupQuery.data?.invite;
        if (invite) {
            joinGroupMutation.mutate({ invite });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4">
            {inviteLinkGroupQuery.isLoading && (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <div className="loader"></div>
                    <p className="text-[var(--text-secondary)]">Gruppeneinladung wird geladen...</p>
                </div>
            )}

            {!inviteLinkGroupQuery.isLoading && inviteLinkGroupQuery.error && (
                <div className="w-full max-w-md bg-[var(--background-primary)] rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl text-center relative overflow-hidden">
                    {/* Dekorative Elemente */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--primary-color)] to-transparent opacity-10 rounded-bl-full -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--secondary-color)] to-transparent opacity-10 rounded-tr-full -z-10"></div>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--accent-color-1)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]">Einladungsfehler</h2>
                    <p className="text-[var(--text-secondary)] mb-6">{inviteLinkGroupQuery.error.message}</p>
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
            )}

            {error && (
                <div className="w-full max-w-md bg-[var(--background-primary)] rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl text-center relative overflow-hidden">
                    {/* Dekorative Elemente */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--primary-color)] to-transparent opacity-10 rounded-bl-full -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--secondary-color)] to-transparent opacity-10 rounded-tr-full -z-10"></div>
                    
                    <p className="text-[var(--accent-color-1)] mb-4">{error}</p>
                    <button
                        onClick={() => setError(null)}
                        className="px-5 py-2.5 bg-gradient-to-r from-[var(--accent-color-1)] to-[var(--secondary-color)] text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Schließen
                    </button>
                </div>
            )}

            {!inviteLinkGroupQuery.isLoading && !error && inviteLinkGroupQuery.data?.invite && inviteLinkGroupQuery.data?.groupInfo && (
                <div className="w-full max-w-md bg-[var(--background-primary)] rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                    {/* Dekorative Elemente */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--primary-color)] to-transparent opacity-10 rounded-bl-full -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--secondary-color)] to-transparent opacity-10 rounded-tr-full -z-10"></div>
                    
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--accent-color-1)] to-[var(--secondary-color)] flex items-center justify-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]">
                        {inviteLinkGroupQuery.data?.groupInfo.name}
                    </h2>
                    
                    <p className="text-[var(--text-secondary)] text-center mb-6">{inviteLinkGroupQuery.data?.groupInfo.description}</p>
                    
                    <div className="flex items-center justify-center mb-8 p-3 bg-[var(--background-secondary)] rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-[var(--text-secondary)]">
                            {inviteLinkGroupQuery.data?.groupInfo.member_count} {inviteLinkGroupQuery.data?.groupInfo.member_count === 1 ? 'Mitglied' : 'Mitglieder'}
                        </span>
                    </div>
                    
                    {joinGroupMutation.error && (
                        <div className="bg-red-50 border-l-4 border-[var(--accent-color-1)] p-4 mb-6 rounded-md">
                            <p className="text-[var(--accent-color-1)] text-sm">{joinGroupMutation.error.message}</p>
                        </div>
                    )}
                    
                    <div className="flex items-center justify-center gap-4">
                        <Link href="/">
                            <button 
                                className="px-5 py-2.5 bg-transparent border border-[var(--background-tertiary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--background-secondary)] transition-colors duration-200"
                            >
                                Abbrechen
                            </button>
                        </Link>
                        <button
                            onClick={handleJoinGroup}
                            disabled={joinGroupMutation.isPending}
                            className="px-5 py-2.5 bg-gradient-to-r from-[var(--accent-color-1)] to-[var(--secondary-color)] text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            {joinGroupMutation.isPending ? 'Wird beigetreten...' : 'Gruppe beitreten'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvitePage;