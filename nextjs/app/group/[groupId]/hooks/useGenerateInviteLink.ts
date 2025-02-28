import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";

const generateInviteLinkMutationKey = (groupId: string) => ['login', 'submit', groupId]

export function useGenerateInviteLink(groupId: string) {
    return useMutation({
        mutationKey: generateInviteLinkMutationKey(groupId),
        mutationFn: async (params: {
            isUnlimited: boolean, 
            maxUses: number | null
        }) => {
            const user = pb.authStore.model;
            if (!user) {
                throw new Error('You are not logged in. Please log in and try again.');
            }

            if (!groupId) {
                throw new Error('Group ID is missing.');
            }

            return await pb.collection('invite_links').create({
                group_id: groupId,
                created_by: user.id,
                max_uses: params.isUnlimited ? null : params.maxUses ?? 1,
                infinite: params.isUnlimited,
            });
        },
    })
}