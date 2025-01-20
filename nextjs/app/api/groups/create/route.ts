// src/app/api/groups/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pb from '@/lib/pocketbase';

export async function POST(request: NextRequest) {
  const { groupName, userId } = await request.json();

  try {
    const group = await pb.collection('groups').create({ name: groupName, admin: userId });
    return NextResponse.json({ group });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
