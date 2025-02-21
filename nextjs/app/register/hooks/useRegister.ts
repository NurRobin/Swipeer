import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

const registerMutationKey = ['register']

export function useRegister() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get('callbackUrl') || '/';

    return useMutation({
        mutationKey: registerMutationKey,
        mutationFn: async (params: {
            email: string,
            displayName: string,
            password: string,
            passwordConfirm: string
        }) => {
            return await pb.collection('users').create({
                email: params.email,
                display_name: params.displayName,
                password: params.password,
                passwordConfirm: params.passwordConfirm,
            });
        },
        onSuccess: () => {
            router.push(callbackUrl);
        }
    })
}