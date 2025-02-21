'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserGroups } from './hooks/useUserGroups';
import { useCreateSurvey } from './hooks/useCreateSurvey';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl auto-shadow p-8">
        <h1 className="text-2xl font-bold text-center text-[var(--primary-color)] mb-6">
          Create Survey
        </h1>
        {userGroupsQuery.error?.message && (
          <p className="text-red-500 text-center mb-4">{userGroupsQuery.error.message}</p>
        )}
        {createSurveyMutation.error?.message && (
          <p className="text-red-500 text-center mb-4">{createSurveyMutation.error.message}</p>
        )}
        {createSurveyMutation.isPending ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="spinner border-4 border-t-[var(--primary-color)] border-gray-200 rounded-full w-16 h-16 animate-spin"></div>
            <p className="text-gray-700">Creating survey...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 auto-shadow focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] text-black"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 auto-shadow focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] text-black"
              >
                <option value="" disabled>Select survey type</option>
                <option value="majority">Majority</option>
                <option value="score">Score</option>
                <option value="consensus">Consensus</option>
              </select>
            </div>
            <div>
              <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                Group
              </label>
              <select
                id="group"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 auto-shadow focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] text-black"
              >
                <option value="public">Make survey public</option>
                {userGroupsQuery.data?.map((group) => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 auto-shadow focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] text-black"
              ></textarea>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Select End-Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 auto-shadow focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[var(--primary-color)] rounded-md hover:brightness-90 transition-colors"
            >
              Create Survey
            </button>
          </form>
        )}
        <button
          onClick={() => router.push('/')}
          className="w-full py-2 px-4 mt-4 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-md hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CreateSurveyPage;