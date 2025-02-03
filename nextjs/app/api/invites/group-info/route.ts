//api/invites/group-info
import { NextRequest, NextResponse } from 'next/server';
import pb from '@/lib/admin-pocketbase';

interface AdvancedGroupRecord {
    id: string;
    created_by: string;
    name: string;
    description: string;
    member_count: number;
    created: string;
    updated: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('group_id');

    if (!groupId) {
        return NextResponse.json({ error: 'Group ID is required' }, { status: 400 });
    }

    try {
        const group = await pb.collection('groups').getOne(groupId);
        if (!group) {
            return NextResponse.json({ error: 'Group not found' }, { status: 404 });
        }
        // Get a count of members in the group by querying the group_members collection
        const member_count = await pb.collection('group_members').getList(1, 1, {
            filter: `group_id="${groupId}"`,
        }).then(res => res.totalItems);

        const groupRecord: AdvancedGroupRecord = {
            id: group.id,
            created_by: group.created_by,
            name: group.name,
            description: group.description,
            member_count: member_count,
            created: group.created,
            updated: group.updated,
        };

        return new NextResponse(JSON.stringify(groupRecord), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch group info' }, { status: 500 });
    }
}
