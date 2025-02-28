import React, {  } from 'react';
import { useGroups } from '@/hooks/useGroups';

const GroupList: React.FC = () => {
  const groupsQuery = useGroups()

  if (groupsQuery.error) {
    return <div className="p-4 bg-red-100 text-red-800 rounded-lg auto-shadow">{groupsQuery.error.message}</div>;
  }

  return (
    <div className="feed">
      <h2 className="text-xl font-bold mb-4">Your Groups</h2>
      <ul>
        {groupsQuery.data?.map((group) => (
          <li key={group.id} className="feed-item">
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;