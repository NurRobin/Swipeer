import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const leaveGroupMutationKey = (groupId: string) => ['group', 'leave', groupId]

export function useLeaveGroup(groupId: string) {
    const router = useRouter();
    return useMutation({
        mutationKey: leaveGroupMutationKey(groupId),
        mutationFn: async () => {
            const user = pb.authStore.model;
            if (!user) {
                throw new Error('You are not logged in. Please log in and try again.')
            }

            const groupMembersRecord = await pb.collection('group_members').getFullList({
                filter: `group_id = "${groupId}"`
            });

            if (groupMembersRecord.length === 0) {
                throw new Error('You are not a member of this group.')
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
                        .sort((a, b) => new Date(a.joined_at).getTime() - new Date(b.joined_at).getTime())[0];

                    if (newAdmin) {
                        await pb.collection('group_members').update(newAdmin.id, { role: 'admin' });
                    }
                }
            }
            for (const record of groupMembersRecord.filter(m => m.user_id === user.id)) {
                try {
                    await pb.collection('group_members').delete(record.id);
                } catch(ex) {
                    console.error(ex)
                }
            }
        },
        onSuccess: () => {
            router.push('/');
        }
    })
}