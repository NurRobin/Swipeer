import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

const inviteLinkGroupInfoMutationQueryKey = (inviteLinkId: string) => ['invite', 'group', 'info', inviteLinkId]

export type Invite = NonNullable<ReturnType<typeof useInviteLinkGroupInfo>['data']>['invite']
export type GroupInfo = NonNullable<ReturnType<typeof useInviteLinkGroupInfo>['data']>['groupInfo']

export function useInviteLinkGroupInfo(inviteLinkId: string) {
    return useQuery({
        queryKey: inviteLinkGroupInfoMutationQueryKey(inviteLinkId),
        queryFn: async () => {
            const record = await pb.collection('invite_links').getOne(inviteLinkId);
            if (record.uses >= record.max_uses) {
                throw new Error('This invite has been used too many times.')
            }
            const invite = {
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

            const response = await fetch(`/api/invites/group-info?group_id=${record.group_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch group info');
            }
            const groupInfo = await response.json() as {
                name: string;
                description: string;
                member_count: number;
            };

            return {
                invite,
                groupInfo
            }
        }
    })
}