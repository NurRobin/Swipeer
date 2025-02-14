import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

const groupQueryKey = (groupId: string) => ['group', groupId]

export function useGroup(groupId: string) {
    return useQuery({
        queryKey: groupQueryKey(groupId),
        queryFn: async () => {
            const group = await pb.collection('groups').getOne(groupId);
            const members = await pb.collection('group_members').getFullList({
                filter: `group_id = "${groupId}"`
            });

            const userPromises = members.map((member) => pb.collection('users').getOne(member.user_id));

            const users = await Promise.all(userPromises);

            members.forEach((member, index) => {
                member.display_name = users[index].display_name;
                member.role = member.role.charAt(0).toUpperCase() + member.role.slice(1);
            });

            // Sort members by "joined_at" date
            members.sort((a, b) => new Date(a.joined_at).getTime() - new Date(b.joined_at).getTime());

            console.log('Group:', group);
            console.log('Members:', members);

            const user = pb.authStore.model;
            return {
                id: group.id,
                created_by: group.created_by,
                members: members.map((member) => ({
                    id: member.id,
                    display_name: member.display_name,
                    role: member.role,
                    email: member.email,
                    created: member.created,
                    updated: member.updated,
                    joined_at: member.joined_at,
                })),
                name: group.name,
                description: group.description,
                created: group.created,
                updated: group.updated,
                isAdmin: user ? members.some(member => member.user_id === user.id && member.role.toLowerCase() === 'admin') : false
            }
        },
    })
}