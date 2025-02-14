import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import Link from 'next/link';

interface Group {
  id: string;
  name: string;
  description: string;
}

const GroupSidebar: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groups = await pb.collection('groups').getFullList();
        const mappedGroups = groups.map((group: any) => ({
          id: group.id,
          name: group.name,
          description: group.description,
        }));
        setGroups(mappedGroups);
      } catch (err) {
        setError('Failed to fetch groups');
        console.error(err);
      }
    };

    fetchGroups();
  }, []);

  if (error) {
    return <div className="p-4 bg-red-100 text-red-800 rounded-lg auto-shadow">{error}</div>;
  }

  return (
    <div className="p-4">
      <Link href="/group/create">
        <button className="bg-[var(--primary-color)] text-[var(--secondary-color)] px-4 py-2 rounded-md auto-shadow hover:bg-opacity-90 transition mb-4 w-full">
          + Create Group
        </button>
      </Link>
      {groups.map((group) => (
        <Link key={group.id} href={`/group/${group.id}`}>
          <div className="cursor-pointer p-4 mb-4 rounded-lg hover:auto-shadow transition">
            <h3 className="text-lg font-bold text-[var(--primary-color)]">{group.name}</h3>
            <p className="text-gray-600">{group.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GroupSidebar;
