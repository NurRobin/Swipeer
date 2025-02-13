'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import pb from '@/lib/pocketbase';

interface InviteRecord {
    collectionId: string;
    collectionName: string;
    id: string;
    group_id: string;
    created_by: string;
    max_uses: number;
    uses: number;
    infinite: boolean;
    created: string;
    updated: string;
}

interface GroupInfo {
    name: string;
    description: string;
    member_count: number;
}

const InvitePage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const [invite, setInvite] = useState<InviteRecord | null>(null);
    const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchInvite = async () => {
            if (id && !hasFetched.current) {
                try {
                    const record = await pb.collection('invite_links').getOne(id);
                    if (record.uses >= record.max_uses) {
                        setError('This invite has been used too many times.');
                        setLoading(false);
                        return;
                    }
                    const inviteRecord: InviteRecord = {
                        collectionId: record.collectionId,
                        collectionName: record.collectionName,
                        id: record.id,
                        group_id: record.group_id,
                        created_by: record.created_by,
                        max_uses: record.max_uses,
                        uses: record.uses,
                        infinite: record.infinite,
                        created: record.created,
                        updated: record.updated,
                    };
                    setInvite(inviteRecord);
                    hasFetched.current = true;

                    const response = await fetch(`/api/invites/group-info?group_id=${record.group_id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch group info');
                    }
                    const data = await response.json();
                    setGroupInfo(data);
                    setShowDialog(true);
                } catch (error) {
                    console.error('Error fetching invite:', error);
                    setError('This invite does not exist.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchInvite();
    }, [id]);

    const handleJoinGroup = async () => {
        if (!invite) return;

        if (!pb.authStore.isValid) {
            router.push(`/login?callbackUrl=/invite/${id}`);
            return;
        }

        try {
            const response = await fetch('/api/invites/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ invite_id: invite.id, group_id: invite.group_id, user_id: pb.authStore.model?.id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to join group');
            }

            const result = await response.json();
            if (result.success) {
                router.push(`/group/${invite.group_id}`);
            } else {
                throw new Error(result.error || 'Failed to join group');
            }
        } catch (error) {
            console.error('Error joining group:', error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            {loading && (
                <div className="text-center">
                    <p>Loading...</p>
                </div>
            )}
            {!loading && error && (
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
            {!loading && !error && invite && groupInfo && (
                <div className="bg-white p-6 rounded-lg text-center">
                    <h2 className="text-2xl font-bold">{groupInfo.name}</h2>
                    <p className="mt-2">{groupInfo.description}</p>
                    <p className="mt-2">Members: {groupInfo.member_count}</p>
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