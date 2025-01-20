// src/app/api/votes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pb from '@/lib/pocketbase';

export async function POST(request: NextRequest) {
  const { groupId, cardId, vote } = await request.json();

  try {
    await pb.collection('votes').create({ groupId, cardId, vote });
    return NextResponse.json({ message: 'Vote recorded' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
