import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

const userGroupsKey = ['user', 'groups']

export function useUserGroups() {
    return useQuery({
        queryKey: userGroupsKey,
        queryFn: async () => {
            const user = pb.authStore.model;
            if (!user) {
                throw new Error('Not logged in');
            }

            const groupMembers = await pb.collection('group_members').getFullList({
                filter: `user_id = "${user.id}"`,
            });

            const groupIds = groupMembers.map((member) => member.group_id);
            if (groupIds.length === 0) {
                return [];
            }

            const filterQuery = groupIds.map((id) => `id = "${id}"`).join(" || ");
            return await pb.collection('groups').getFullList({
                filter: filterQuery,
            });
        }
    })
}