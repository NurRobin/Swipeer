import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const deleteAccountKey = ['user', 'account', 'delete']

export function useDeleteAccount() {
    const router = useRouter();
    return useMutation({
        mutationKey: deleteAccountKey,
        mutationFn: async (params: {
            userId: string
        }) => {
            await pb.collection('users').delete(params.userId);
            await pb.authStore.clear();
        },
        onSuccess: () => {
            router.push('/register?callbackUrl=/dashboard');
        }
    })
}