import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';

interface Survey {
  id: string;
  title: string;
}

const SurveyList: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const surveys = await pb.collection('surveys').getFullList();
        const mappedSurveys = surveys.map((survey: any) => ({
          id: survey.id,
          title: survey.title,
        }));
        setSurveys(mappedSurveys);
      } catch (err) {
        setError('Failed to fetch surveys');
        console.error(err);
      }
    };

    fetchSurveys();
  }, []);

  if (error) {
    return <div className="p-4 bg-red-100 text-red-800 rounded-lg shadow-md">{error}</div>;
  }

  return (
    <div className="feed">
      <h2 className="text-xl font-bold mb-4">Your Surveys</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.id} className="feed-item">
            {survey.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyList;