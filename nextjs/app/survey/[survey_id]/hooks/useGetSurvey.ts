import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

const userGroupsKey = ['get', 'survey']

export function useGetSurvey() {
    return useQuery({
        queryKey: userGroupsKey,
        queryFn: async () => {
            const user = pb.authStore.model;
            if (!user) {
                throw new Error('Not logged in');
            }

            pb.collection('surveys').getOne("")

            ///TODO: fetch all data
        }
    })
}