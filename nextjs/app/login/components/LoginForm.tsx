'use client';
import React, { useState } from 'react';
import { useLoginSubmit } from '../hooks/useLoginSubmit';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginSubmitMutation = useLoginSubmit()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        loginSubmitMutation.mutate({
            email,
            password
        })
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm text-black"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm text-black"
                />
            </div>
            <button type="submit" data-loading={loginSubmitMutation.isPending} className="w-full py-2 px-4 bg-primary-color text-white font-semibold rounded-md hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color">
                Login
            </button>
            {loginSubmitMutation.error && <p className="text-red-500 text-sm mt-2">{loginSubmitMutation.error.message}</p>}
        </form>
    );
}