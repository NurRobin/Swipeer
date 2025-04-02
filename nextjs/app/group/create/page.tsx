'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import pb from '@/lib/pocketbase';
import Link from 'next/link';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-secondary)] py-12 px-4">
      {/* Main card */}
      <div className="w-full max-w-lg bg-[var(--background-primary)] rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]">
          Gruppe erstellen
        </h1>
        <p className="text-[var(--text-secondary)] mb-6">Erstelle eine neue Gruppe und lade Freunde ein.</p>
        
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-[var(--accent-color-1)] p-4 mb-6 rounded-md">
            <p className="text-[var(--accent-color-1)] text-sm">{errorMessage}</p>
          </div>
        )}
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="loader"></div>
            <p className="text-[var(--text-secondary)]">Gruppe wird erstellt...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-none p-0 shadow-none">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Gruppenname
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                  placeholder="Gruppenname"
                  className="pl-10 block w-full rounded-lg border border-[var(--background-tertiary)] bg-[var(--background-secondary)] text-[var(--text-primary)] py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Beschreibung
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <textarea
                  id="description"
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Gruppenbeschreibung"
                  className="pl-10 block w-full rounded-lg border border-[var(--background-tertiary)] bg-[var(--background-secondary)] text-[var(--text-primary)] py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                ></textarea>
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
                Gruppe erstellen
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateGroupPage;
