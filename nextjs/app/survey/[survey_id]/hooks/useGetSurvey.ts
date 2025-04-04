import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export function useGetSurvey() {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    return useQuery({
        queryKey: ['get', 'survey', id],
        queryFn: async () => {
            const user = pb.authStore.model;
            if (!user) {
                throw new Error('Not logged in');
            }
            const survey = await pb.collection('surveys').getOne(id!);
            console.log(survey);
            return survey;
        }
    });
}
