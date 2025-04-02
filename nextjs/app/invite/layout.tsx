import React from 'react';
import Link from 'next/link';

interface InviteLayoutProps {
    children: React.ReactNode;
}

const InviteLayout: React.FC<InviteLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[var(--background-secondary)]">
            <header className="bg-[var(--background-primary)] shadow-md py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]">Swipeer</h1>
                    <nav className="flex items-center gap-4">
                        <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200">Home</Link>
                        <Link href="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200">Dashboard</Link>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto py-8 px-4">
                {children}
            </main>
        </div>
    );
};

export default InviteLayout;