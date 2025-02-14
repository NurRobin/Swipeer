'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import pb from '@/lib/pocketbase';

const CreateGroupPage: React.FC = () => {
  const router = useRouter();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect, falls der User nicht eingeloggt ist
  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push('/');
    }
  }, [router]);

  const pollForGroupMember = async (userId: string, groupId: string) => {
    console.log("Start polling for group_members entry...");
    let found = false;
    while (!found) {
      try {
        // Wir holen maximal 1 Eintrag, der unseren Filterkriterien entspricht
        const members = await pb.collection('group_members').getFullList(1, {
          filter: `user_id = "${userId}" && group_id = "${groupId}"`,
        });
        console.log("Polling-Ergebnis:", members);
        if (members.length > 0) {
          found = true;
          break;
        }
      } catch (err) {
        console.error("Fehler beim Polling in group_members:", err);
      }
      // Warte 500ms, bevor erneut geprüft wird
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    console.log("Eintrag in group_members gefunden.");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const user = pb.authStore.model;
      if (!user) {
        throw new Error('Nicht eingeloggt');
      }

      const data = {
        created_by: user.id,
        name: groupName,
        description: groupDescription,
      };

      // Erstelle den Gruppen-Datensatz in der Collection "groups"
      const createdGroup = await pb.collection('groups').create(data);
      console.log("Gruppe erstellt:", createdGroup);

      // Starte das Polling, bis der group_members Eintrag existiert
      await pollForGroupMember(user.id, createdGroup.id);

      // Sobald der Eintrag existiert, leite weiter
      router.push(`/group/${createdGroup.id}`);
    } catch (error: any) {
      setErrorMessage(error.message || 'Fehler bei der Gruppenerstellung');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl auto-shadow p-8">
        <h1 className="text-2xl font-bold text-center text-[var(--primary-color)] mb-6">
          Gruppe erstellen
        </h1>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="spinner border-4 border-t-[var(--primary-color)] border-gray-200 rounded-full w-16 h-16 animate-spin"></div>
            <p className="text-gray-700">Gruppe wird erstellt...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Gruppenname
              </label>
              <input
                type="text"
                id="name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 auto-shadow focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Beschreibung
              </label>
              <textarea
                id="description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 auto-shadow focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[var(--primary-color)]  rounded-md hover:brightness-90 transition-colors"
            >
              Gruppe erstellen
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateGroupPage;
