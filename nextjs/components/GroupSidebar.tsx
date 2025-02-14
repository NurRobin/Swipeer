import React from 'react';
import Link from 'next/link';
import { useGroups } from '@/hooks/useGroups';

const GroupSidebar: React.FC = () => {
  const groupsQuery = useGroups()

  if (groupsQuery.error) {
    return <div className="p-4 bg-red-100 text-red-800 rounded-lg auto-shadow">{groupsQuery.error.message}</div>;
  }

  return (
    <div className="p-4">
      <Link href="/group/create">
        <button className="bg-[var(--primary-color)] text-[var(--secondary-color)] px-4 py-2 rounded-md auto-shadow hover:bg-opacity-90 transition mb-4 w-full">
          + Create Group
        </button>
      </Link>
      {groupsQuery.data?.map((group) => (
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
