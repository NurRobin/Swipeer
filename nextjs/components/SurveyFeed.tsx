import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import Link from 'next/link';
import { SurveysRecord } from '@/types/pocketbase-types';

const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000; // years
  if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? ' Jahr' : ' Jahre');
  
  interval = seconds / 2592000; // months
  if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? ' Monat' : ' Monate');
  
  interval = seconds / 86400; // days
  if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? ' Tag' : ' Tage');
  
  interval = seconds / 3600; // hours
  if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? ' Stunde' : ' Stunden');
  
  interval = seconds / 60; // minutes
  if (interval >= 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? ' Minute' : ' Minuten');
  
  return Math.floor(seconds) + (Math.floor(seconds) === 1 ? ' Sekunde' : ' Sekunden');
};

const SurveyFeed: React.FC = () => {
  const [surveys, setSurveys] = useState<SurveysRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setLoading(true);
        const surveys = await pb.collection('surveys').getFullList({
          sort: '-start_at',
          expand: 'created_by,created_in',
        });
        setSurveys(surveys);
        setError(null);
      } catch (err) {
        setError('Failed to fetch surveys');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="loader"></div>
        <p className="mt-4 text-[var(--text-secondary)]">Umfragen werden geladen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[var(--background-secondary)] bg-opacity-70 backdrop-blur-sm text-[var(--accent-color-1)] rounded-lg text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <p className="mb-3">{error}</p>
        <button 
          className="btn btn-primary" 
          onClick={() => window.location.reload()}
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="feed p-4">
      {surveys.length === 0 ? (
        <div className="text-center p-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--text-secondary)] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-bold mt-4">Keine Umfragen gefunden</h3>
          <p className="text-[var(--text-secondary)] mt-2">Erstelle eine neue Umfrage, um loszulegen.</p>
          <Link href="/survey/create">
            <button className="btn btn-gradient mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Umfrage erstellen
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {surveys.map((survey) => {
            const creatorName = survey.expand?.created_by?.display_name || 'Unbekannt';
            const groupName = survey.expand?.created_in?.name || 'Keine Gruppe';
            
            return (
              <div key={survey.id} className="bg-[var(--background-secondary)] bg-opacity-50 backdrop-blur-sm rounded-lg overflow-hidden mb-4 hover:bg-opacity-70 transition-all">
                <div className="feed-item-header px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center pr-2">
                    <div className="avatar bg-[var(--secondary-color)]">
                      {creatorName.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <span className="font-medium block">{creatorName}</span>
                      {survey.expand?.created_in ? (
                        <Link href={`/group/${survey.created_in}`} className="text-xs text-[var(--primary-color)] hover:underline">
                          {groupName}
                        </Link>
                      ) : (
                        <span className="text-xs text-[var(--text-secondary)]">{groupName}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
                    vor {getTimeAgo(survey.start_at)}
                  </span>
                </div>
                
                <Link href={`/survey/${survey.id}`}>
                  <div className="feed-item-content cursor-pointer hover:bg-[var(--background-primary)] hover:bg-opacity-40 transition-colors">
                    <h3 className="font-bold text-lg mb-1">{survey.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm">{survey.description || 'Keine Beschreibung'}</p>
                    
                    <div className="mt-3 flex items-center">
                      <span className={`badge ${
                        survey.type === 'majority' ? 'badge-primary' : 
                        survey.type === 'score' ? 'badge-secondary' : 
                        'bg-[var(--accent-color-2)] text-white'
                      }`}>
                        {survey.type === 'majority' ? 'Mehrheit' : 
                         survey.type === 'score' ? 'Bewertung' : 
                         'Konsens'}
                      </span>
                      
                      <span className="text-xs text-[var(--text-secondary)] ml-2">
                        Endet am {new Date(survey.end_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
                
                <div className="feed-item-footer">
                  <div className="flex-1"></div>
                  <Link href={`/survey/${survey.id}`}>
                    <button className="btn-primary text-sm py-1 px-4 rounded-full">
                      Abstimmen
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SurveyFeed;
