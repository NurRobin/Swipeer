import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import {usePathname, useRouter} from "next/navigation";

const postVoteKey = ['post', 'vote']

export function usePostVote() {

    const pathname = usePathname();
    const survey_id = pathname.split('/').pop();

    return useMutation({
        mutationKey: postVoteKey,
        mutationFn: async (params: {
            options_id: string;
            pro: boolean;
        }) => {
            const user = pb.authStore.model;
            if (!user) {
                throw new Error('Not logged in');
            }
            if (!survey_id) {
                throw new Error('Survey ID is missing');
            }
            if (!params.options_id) {
                throw new Error('Options ID is missing');
            }

            if (params.pro === undefined) {
                throw new Error('Vote value is missing');
            }


            const data = {
                user_id: user.id,
                survey_id: survey_id,
                options_id: params.options_id,
                pro: params.pro,
            };

            console.log(data);

            return await pb.collection('votes').create(data);
        },
        onSuccess: (createdVote) => {
            console.log("Vote created:", createdVote);
        }
    });
}