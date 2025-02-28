import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

const groupsQueryKey = ['groups']

export function useGroups() {
    return useQuery({
        queryKey: groupsQueryKey,
        queryFn: async () => {
            const groups = await pb.collection('groups').getFullList();
            return groups.map((group) => ({
                id: group.id,
                name: group.name,
                description: group.description,
            }));
        }
    })
}