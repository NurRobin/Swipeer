// src/app/group/[groupId]/page.tsx
import React from 'react';
import GroupPageClient from './GroupPageClient';
import pb from '@/lib/pocketbase';

async function getGroupWithMembers(groupId: string): Promise<Group> {
  console.log('getting group with groupId', groupId);
  const group = await pb.collection('groups').getOne(groupId, {
    expand: 'members',
  });

  console.log('we got the group', group);

  return {
    id: group.id,
    created_by: group.created_by,
    members: (group.expand?.members || []).map((user: any) => ({
      id: user.id,
      email: user.email,
      display_name: user.display_name,
      created: user.created,
      updated: user.updated,
    })) as User[],
    name: group.name,
    description: group.description,
    created: group.created,
    updated: group.updated,
  };
}

export default async function GroupPage({ params }: { params: { groupId: string } }) {
  const group = await getGroupWithMembers(params.groupId);

  return <GroupPageClient group={group} members={group.members} />;
}

interface Group {
  id: string;
  created_by: string;
  members: User[];
  name: string;
  description: string;
  created: string;
  updated: string;
}

interface User {
  id: string;
  email: string;
  display_name: string;
  created: string;
  updated: string;
}
