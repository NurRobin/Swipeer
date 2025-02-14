'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import pb from '@/lib/pocketbase';

const CreateSurveyPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const user = pb.authStore.model;
      if (!user) {
        throw new Error('Not logged in');
      }

      if (!title) {
        throw new Error('Title is required');
      }
      if (!type) {
        throw new Error('Type is required');
      }
      if (!description) {
        throw new Error('Description is required');
      }
      if (!date) {
        throw new Error('End date is required');
      }

      const selectedDate = new Date(date);
      const todayDate = new Date();

      if (selectedDate <= todayDate) {
        throw new Error('The duration must be at least 1 day');
      }

      const data = {
        created_by: user.id,
        title,
        type,
        description,
        start_at: todayDate.toISOString(),
        end_at: selectedDate.toISOString(),
      };

      const createdSurvey = await pb.collection('surveys').create(data);
      console.log("Survey created:", createdSurvey);

      router.push(`/survey/${createdSurvey.id}`);
    } catch (error: any) {
      setErrorMessage(error.message || 'Error creating survey');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl auto-shadow p-8">
        <h1 className="text-2xl font-bold text-center text-[var(--primary-color)] mb-6">
          Create Survey
        </h1>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        {loading ? (
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
                Select Date
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
      </div>
    </div>
  );
};

export default CreateSurveyPage;
