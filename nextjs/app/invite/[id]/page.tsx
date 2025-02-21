'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useInviteLinkGroupInfo } from './hooks/useInviteLinkGroupInfo';
import { useJoinGroup } from './hooks/useJoinGroup';


const InvitePage: React.FC = () => {
    const params = useParams<{ id: string }>();
    const [error, setError] = useState<string | null>(null);
    const inviteLinkGroupQuery = useInviteLinkGroupInfo(params.id)
    const joinGroupMutation = useJoinGroup(params.id)

    const handleJoinGroup = async () => {
        const invite = inviteLinkGroupQuery.data?.invite
        if (invite) {
            joinGroupMutation.mutate({ invite })
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            {inviteLinkGroupQuery.isLoading && (
                <div className="text-center">
                    <p>Loading...</p>
                </div>
            )}
            {!inviteLinkGroupQuery.isLoading && error && (
                <div className="bg-white p-6 rounded-lg text-center">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={() => setError(null)}
                        className="mt-4 px-4 py-2 bg-blue-500  rounded-lg"
                    >
                        Close
                    </button>
                </div>
            )}
            {!inviteLinkGroupQuery.isLoading && !error && inviteLinkGroupQuery.data?.invite && inviteLinkGroupQuery.data?.groupInfo && (
                <div className="bg-white p-6 rounded-lg text-center">
                    <h2 className="text-2xl font-bold">{inviteLinkGroupQuery.data?.groupInfo.name}</h2>
                    <p className="mt-2">{inviteLinkGroupQuery.data?.groupInfo.description}</p>
                    <p className="mt-2">Members: {inviteLinkGroupQuery.data?.groupInfo.member_count}</p>
                    <button
                        onClick={handleJoinGroup}
                        className="mt-4 px-4 py-2 bg-blue-500  rounded-lg"
                    >
                        Join Group
                    </button>
                </div>
            )}
        </div>
    );
};

export default InvitePage;