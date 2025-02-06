import { NextRequest, NextResponse } from 'next/server';
import pb from '@/lib/admin-pocketbase';

export async function POST(request: NextRequest): Promise<NextResponse> {
    const { invite_id, group_id, user_id } = await request.json();

    if (!invite_id || !group_id || !user_id) {
        console.error('Missing required fields: invite_id, group_id, user_id');
        return NextResponse.json({ error: 'Invite ID, Group ID, and User ID are required' }, { status: 400 });
    }

    try {
        console.log(`Processing invite: ${invite_id} for user: ${user_id} in group: ${group_id}`);

        const invite = await pb.collection('invite_links').getOne(invite_id);
        console.log(`Fetched invite: ${JSON.stringify(invite)}`);

        if (invite.uses >= invite.max_uses) {
            console.warn(`Invite ${invite_id} has been used too many times`);
            return NextResponse.json({ error: 'This invite has been used too many times.' }, { status: 400 });
        }

        const existingMember = await pb.collection('group_members').getFullList({
            filter: `group_id="${group_id}" && user_id="${user_id}"`,
        });
        console.log(`Existing member check: ${JSON.stringify(existingMember)}`);

        if (existingMember.length > 0) {
            console.warn(`User ${user_id} is already in group ${group_id}`);
            return NextResponse.json({ error: 'You are already a member of this group.' }, { status: 400 });
        }

        await pb.collection('group_members').create({
            group_id: group_id,
            user_id: user_id,
        });
        console.log(`User ${user_id} added to group ${group_id}`);

        await pb.collection('invite_links').update(invite_id, {
            uses: (invite.uses || 0) + 1,
        });
        console.log(`Invite ${invite_id} uses updated to ${invite.uses + 1}`);

        console.log(`User ${user_id} successfully joined group ${group_id}`);
        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Error joining group:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to join group';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
