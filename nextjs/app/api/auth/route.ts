// src/app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pb from '@/lib/pocketbase';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    return NextResponse.json({ user: authData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
