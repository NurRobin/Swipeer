'use client';
import React from 'react';

interface user {
    id: string;
    email: string;
    display_name: string;
    created: string;
    updated: string;
    role?: string; // Added role property to user interface
}

interface Props {
    group: {
        id: string;
        created_by: string;
        members: user[];
        name: string;
        description: string;
        created: string;
        updated: string;
    };
    members: user[];
}

const GroupPageClient: React.FC<Props> = ({ group, members }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">{group.name}</h1>
                    <p className="mt-2 text-gray-600">{group.description}</p>
                </div>
                <ul>
                    {members.map((member: user) => (
                        <li key={member.id} className="py-3 flex items-center justify-between">
                            <span className="text-gray-700">{member.display_name}</span>
                            {member.id === group.created_by ? (
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Admin</span>
                            ) : (
                                member.role && (
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{member.role}</span>
                                )
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GroupPageClient;