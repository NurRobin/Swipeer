'use client';
import React, { useState } from 'react';
import { useRegister } from '../hooks/useRegister';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const registerMutation = useRegister()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        registerMutation.mutate({
            email,
            displayName,
            password,
            passwordConfirm
        })
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Email
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email Adresse"
                        className="pl-10 block w-full rounded-lg border border-[var(--background-tertiary)] bg-[var(--background-secondary)] text-[var(--text-primary)] py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                    />
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Display Name
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                        placeholder="Anzeigename"
                        className="pl-10 block w-full rounded-lg border border-[var(--background-tertiary)] bg-[var(--background-secondary)] text-[var(--text-primary)] py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                    />
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Passwort
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Passwort"
                        className="pl-10 block w-full rounded-lg border border-[var(--background-tertiary)] bg-[var(--background-secondary)] text-[var(--text-primary)] py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                    />
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Passwort bestätigen
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                        placeholder="Passwort bestätigen"
                        className="pl-10 block w-full rounded-lg border border-[var(--background-tertiary)] bg-[var(--background-secondary)] text-[var(--text-primary)] py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                    />
                </div>
            </div>
            <button 
                type="submit" 
                className="w-full py-3 px-4 bg-gradient-to-r from-[var(--accent-color-1)] to-[var(--secondary-color)] text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
                {registerMutation.isPending ? 'Registrierung...' : 'Registrieren'}
            </button>
            {registerMutation.error && <p className="text-[var(--accent-color-1)] text-sm mt-2">{registerMutation.error.message}</p>}
        </form>
    );
}