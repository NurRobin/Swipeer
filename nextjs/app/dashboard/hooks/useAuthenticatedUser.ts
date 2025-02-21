import pb from "@/lib/pocketbase";
import { UsersRecord } from "@/types/pocketbase-types";
import { useQuery } from "@tanstack/react-query";

const authenticatedUserKey = ['user', 'authenticated']

export function useAuthenticatedUser() {
    return useQuery({
        queryKey: authenticatedUserKey,
        queryFn: async () => {
            pb.collection('users').authRefresh()
            return await pb.collection('users').getOne(pb.authStore.model?.id) as UsersRecord
        }
    })
}