'use client';
import pb from '@/lib/pocketbase';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get('callbackUrl') || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }

        try {
            await pb.collection('users').create({
                email,
                display_name: displayName,
                password,
                passwordConfirm,
            });
            router.push(callbackUrl);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md auto-shadow focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Display Name
                </label>
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md auto-shadow focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md auto-shadow focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md auto-shadow focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm"
                />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-primary-color  font-semibold rounded-md hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color">
                Register
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
    );
}