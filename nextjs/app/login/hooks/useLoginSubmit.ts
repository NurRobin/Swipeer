import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

const loginSubmitMutationKey = ['login', 'submit']

export function useLoginSubmit() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get('callbackUrl') || '/';
    return useMutation({
        mutationKey: loginSubmitMutationKey,
        mutationFn: async (params: {
            email: string,
            password: string
        }) => {
            return await pb.collection('users').authWithPassword(params.email, params.password);
        },
        onSuccess: () => {
            // als parameter bekommt man theoretisch den return von der mutation fn zurück wenn man ihn hier braucht
            router.push(callbackUrl);
        } 
    })
}