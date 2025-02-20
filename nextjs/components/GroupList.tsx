import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import { GroupsRecord } from '@/types/pocketbase-types';

const GroupList: React.FC = () => {
  const [groups, setGroups] = useState<GroupsRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groups = await pb.collection('groups').getFullList();
        setGroups(groups);
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
    <div className="feed">
      <h2 className="text-xl font-bold mb-4">Your Groups</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id} className="feed-item">
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;