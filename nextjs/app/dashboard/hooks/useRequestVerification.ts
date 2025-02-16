import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";

const requestVerificationKey = ['user', 'account', 'requestVerification']

export function useRequestVerifcation() {
    return useMutation({
        mutationKey: requestVerificationKey,
        mutationFn: async (params: {
            email: string
        }) => {
            await pb.collection('users').requestVerification(params.email);
        },
    })
}