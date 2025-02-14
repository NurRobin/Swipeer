import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import { Survey } from '@/types/pocketbase';

const SurveyList: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const surveys = await pb.collection('surveys').getFullList();
        const mappedSurveys = surveys.map((survey: any) => ({
          id: survey.id,
          created: survey.created,
          updated: survey.updated,
          created_by: survey.created_by,
          created_in: survey.created_in,
          type: survey.type,
          title: survey.title,
          description: survey.description,
          start_at: survey.start_at,
          end_at: survey.end_at,
        }));
        setSurveys(mappedSurveys as Survey[]);
      } catch (err) {
        setError('Failed to fetch surveys');
        console.error(err);
      }
    };

    fetchSurveys();
  }, []);

  if (error) {
    return <div className="p-4 bg-red-100 text-red-800 rounded-lg auto-shadow">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Surveys</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.id} className="mb-2 p-2 rounded auto-shadow">
            {survey.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyList;
