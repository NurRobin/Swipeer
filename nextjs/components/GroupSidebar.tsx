import React from 'react';
import Link from 'next/link';
import { useGroups } from '@/hooks/useGroups';

const GroupSidebar: React.FC = () => {
  const { data: groups, isLoading, error } = useGroups();

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="loader mx-auto"></div>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">Gruppen werden geladen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-[var(--background-secondary)] bg-opacity-60 backdrop-blur-sm rounded-lg text-center">
        <p className="text-sm text-[var(--accent-color-1)]">Fehler beim Laden der Gruppen</p>
        <button 
          className="btn btn-outline mt-3 py-1.5 px-3 text-sm" 
          onClick={() => window.location.reload()}
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="px-2 py-3">
      {groups && groups.length > 0 ? (
        <div className="space-y-4">
          {groups.map((group) => (
            <Link key={group.id} href={`/group/${group.id}`}>
              <div className="bg-[var(--background-secondary)] rounded-lg overflow-hidden mb-4 transform transition-all duration-200 hover:scale-105 hover:shadow-md">
                <div className="flex items-center gap-2.5 p-3 cursor-pointer hover:bg-[var(--background-primary)] hover:bg-opacity-40 transition-colors">
                  <div className="min-w-8 h-8 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-white font-bold text-sm">
                    {group.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[var(--text-primary)] truncate">{group.name}</h3>
                    <p className="text-xs leading-tight text-[var(--text-secondary)] truncate">
                      {group.description || 'Keine Beschreibung'}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-[var(--text-secondary)] opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">Du bist noch keiner Gruppe beigetreten</p>
        </div>
      )}
    </div>
  );
};

export default GroupSidebar;
