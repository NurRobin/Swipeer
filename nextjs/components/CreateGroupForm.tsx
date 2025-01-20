// src/components/CreateGroupForm.tsx
import React, { useState } from 'react';

const CreateGroupForm: React.FC = () => {
  const [groupName, setGroupName] = useState('');

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace 'userId' with actual user ID
    await fetch('/api/groups/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupName, userId: 'userId' }),
    });
  };

  return (
    <form onSubmit={handleCreateGroup}>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        required
      />
      <button type="submit">Create Group</button>
    </form>
  );
};

export default CreateGroupForm;
