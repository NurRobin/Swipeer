'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserGroups } from './hooks/useUserGroups';
import { useCreateSurvey } from './hooks/useCreateSurvey';
import Link from 'next/link';

const CreateSurveyPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [group, setGroup] = useState('public');

  const userGroupsQuery = useUserGroups()
  const createSurveyMutation = useCreateSurvey()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSurveyMutation.mutate({
      title, type, description, date, group
    })
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-secondary)] py-12 px-4">  
      {/* Main card */}
      <div className="w-full max-w-lg bg-[var(--background-primary)] rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]">
          Umfrage erstellen
        </h1>
        <p className="text-[var(--text-secondary)] mb-6">Erstelle eine neue Umfrage und teile sie mit deinen Gruppen.</p>
        
        {userGroupsQuery.error?.message && (
          <div className="bg-red-50 border-l-4 border-[var(--accent-color-1)] p-4 mb-6 rounded-md">
            <p className="text-[var(--accent-color-1)] text-sm">{userGroupsQuery.error.message}</p>
          </div>
        )}
        
        {createSurveyMutation.error?.message && (
          <div className="bg-red-50 border-l-4 border-[var(--accent-color-1)] p-4 mb-6 rounded-md">
            <p className="text-[var(--accent-color-1)] text-sm">{createSurveyMutation.error.message}</p>
          </div>
        )}
        
        {createSurveyMutation.isPending ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="loader"></div>
            <p className="text-[var(--text-secondary)]">Umfrage wird erstellt...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-none p-0 shadow-none">
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Titel
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Umfragetitel"
                  className="pl-10 block w-full rounded-lg border border-[var(--background-tertiary)] bg-[var(--background-secondary)] text-[var(--text-primary)] py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="type" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Umfragetyp
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className="pl-10 block w-full rounded-lg border border-[var(--background-tertiary)] bg-[var(--background-secondary)] text-[var(--text-primary)] py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200 appearance-none"
                >
                  <option value="" disabled>Umfragetyp auswählen</option>
                  <option value="majority">Mehrheit</option>
                  <option value="score">Bewertung</option>
                  <option value="consensus">Konsens</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="group" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Gruppe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <select
                  id="group"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  required
                  className="pl-10 block w-full rounded-lg border border-[var(--background-tertiary)] bg-[var(--background-secondary)] text-[var(--text-primary)] py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200 appearance-none"
                >
                  <option value="public">Öffentliche Umfrage</option>
                  {userGroupsQuery.data?.map((group) => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Beschreibung
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Umfragebeschreibung"
                  className="pl-10 block w-full rounded-lg border border-[var(--background-tertiary)] bg-[var(--background-secondary)] text-[var(--text-primary)] py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                ></textarea>
              </div>
            </div>
            
            <div className="mb-8">
              <label htmlFor="date" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Enddatum
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div 
                  className="absolute inset-0 cursor-pointer" 
                  onClick={() => {
                    const dateInput = document.getElementById('date') as HTMLInputElement;
                    dateInput?.showPicker();
                  }}
                ></div>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="pl-10 block w-full rounded-lg border border-[var(--background-tertiary)] bg-[var(--background-secondary)] text-[var(--text-primary)] py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200 cursor-pointer"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-4">
              <Link href="/">
                <button type="button" className="px-5 py-2.5 bg-transparent border border-[var(--background-tertiary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--background-secondary)] transition-colors duration-200">
                  Abbrechen
                </button>
              </Link>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-[var(--accent-color-1)] to-[var(--secondary-color)] text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Umfrage erstellen
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateSurveyPage;