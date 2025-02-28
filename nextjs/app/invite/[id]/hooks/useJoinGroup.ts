import { useMutation } from "@tanstack/react-query";
import { Invite } from "./useInviteLinkGroupInfo";
import { useRouter } from "next/navigation";
import pb from "@/lib/pocketbase";

const joinGroupMutationKey = (inviteLinkId: string) => ['join', 'group', inviteLinkId]

export function useJoinGroup(inviteLinkId: string) {
    const router = useRouter();
    return useMutation({
        mutationKey: joinGroupMutationKey(inviteLinkId),
        mutationFn: async (params: {
            invite: Invite
        }) => {
            if (!pb.authStore.isValid) {
                router.push(`/login?callbackUrl=/invite/${inviteLinkId}`);
                throw new Error('Not signed in')
            }

            const invite = params.invite
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
            if (!result.success) {
                throw new Error(result.error || 'Failed to join group');
            }
            return {
                result,
                invite
            }
        },
        onSuccess: (data) => {
            router.push(`/group/${data.invite.group_id}`);
        }
    })
}