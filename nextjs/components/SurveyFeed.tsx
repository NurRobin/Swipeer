import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import Link from 'next/link';
import { SurveysRecord } from '@/types/pocketbase-types';

const SurveyFeed: React.FC = () => {
  const [surveys, setSurveys] = useState<SurveysRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const surveys = await pb.collection('surveys').getFullList({
          sort: '-start_at',
        });
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
    <div className="space-y-4">
      {surveys.map((survey) => (
        <Link key={survey.id} href={`/survey/${survey.id}`}>
          <div className="p-4 rounded-lg auto-shadow cursor-pointer transition-transform transform hover:scale-105">
            <h3 className="text-lg font-bold text-[var(--primary-color)]">{survey.title}</h3>
            <p className="">{survey.description}</p>
            <p className="text-sm">{new Date(survey.start_at).toLocaleString()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SurveyFeed;
