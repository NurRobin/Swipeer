import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import { SurveysRecord } from '@/types/pocketbase-types';

const SurveyList: React.FC = () => {
  const [surveys, setSurveys] = useState<SurveysRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const surveys = await pb.collection('surveys').getFullList();
        setSurveys(surveys);
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
