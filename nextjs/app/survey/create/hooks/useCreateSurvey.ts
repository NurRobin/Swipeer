import pb from "@/lib/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const createSurveyKey = ['user', 'groups']

export function useCreateSurvey() {
    const router = useRouter()
    return useMutation({
        mutationKey: createSurveyKey,
        mutationFn: async (params: {
            title?: string,
            type?: string,
            description?: string,
            date?: string,
            group?: string,
            questions: Array<string>
        }) => {
            const user = pb.authStore.model;
            if (!user) {
                throw new Error('Not logged in');
            }

            if (!params.title) {
                throw new Error('Title is required');
            }
            if (!params.type) {
                throw new Error('Type is required');
            }
            if (!params.description) {
                throw new Error('Description is required');
            }
            if (!params.date) {
                throw new Error('End date is required');
            }
            if (params.questions.length < 1) {
                throw new Error('Questions must not be empty');
            }

            const selectedDate = new Date(params.date);
            const todayDate = new Date();

            if (selectedDate <= todayDate) {
                throw new Error('The duration must be at least 1 day');
            }

            const optionData = convertArrayToMap(params.questions);

            console.log(optionData);

            const data = {
                created_by: user.id,
                title: params.title,
                type: params.type,
                description: params.description,
                start_at: todayDate.toISOString(),
                end_at: selectedDate.toISOString(),
                created_in: params.group === 'public' ? null : params.group,
                options: optionData
            };

            return await pb.collection('surveys').create(data);
        },
        onSuccess: (createdSurvey) => {
            console.log("Survey created:", createdSurvey);
            router.push(`${createdSurvey.id}`);
        }
    })
}

function generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
}

// Funktion, die einen Array von Strings empfängt und in die gewünschte Map umwandelt
function convertArrayToMap(questions: string[]): Record<string, { question: string }> {
    const result: Record<string, { question: string }> = {};
    questions.forEach((question) => {
        const randomId = generateRandomId();
        result[randomId] = { question };
    });
    return result;
}