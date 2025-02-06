import React from 'react';
import Link from 'next/link';

interface InviteLayoutProps {
    children: React.ReactNode;
}

const InviteLayout: React.FC<InviteLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-2xl font-bold text-gray-800">Swipeer</h1>
                    <nav>
                        <Link href="/" className="text-gray-600 hover:text-gray-800 mx-2">Home</Link>
                        <Link href="/profile" className="text-gray-600 hover:text-gray-800 mx-2">Profile</Link>
                        <Link href="/support" className="text-gray-600 hover:text-gray-800 mx-2">Support</Link>
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