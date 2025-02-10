'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import pb from '@/lib/pocketbase';
import { User } from '@/types/pocketbase';

export default function Dashboard() {
  const [user, setUser] = React.useState<User | null>(null);

  const router = useRouter();
  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push('/login?callbackUrl=/dashboard');
    }

    // Fetch data
    pb.collection('users').authRefresh()
    pb.collection('users').getOne(pb.authStore.model?.id).then((userModel) => {
      setUser(userModel as unknown as User);
    });
  }, []);

  const handleLogout = async () => {
    router.push('/logout');
  };

  const handleVerification = async () => {
    // Implement the verification logic here
    // For example, send a verification email
    if (user) {
      await pb.collection('users').requestVerification(user.email);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (user) {
        await pb.collection('users').delete(user.id);
        await pb.authStore.clear();
        router.push('/register?callbackUrl=/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      {user ? (
        <div className="bg-black p-6 rounded-lg shadow-md w-full max-w-md">
          <p className="text-xl mb-4">Welcome, <span className="font-semibold">{user.display_name}</span></p>
          <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
          <p className="mb-2"><span className="font-semibold">Verified?</span> {user.verified ? 'Yes' : 'No'}</p>
          {!user.verified && (
            <button onClick={handleVerification} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4">Verify Account</button>
          )}
          <p className="mb-2"><span className="font-semibold">Account Created:</span> {new Date(user.created).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          <p className="mb-4"><span className="font-semibold">Last Updated:</span> {new Date(user.updated).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          <div className="flex flex-col space-y-4">
            <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Logout</button>
            <button onClick={handleDeleteAccount} className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800">Delete Account</button>
          </div>
        </div>
      ) : (
        <p className="text-xl centered">Loading...</p>
      )}
    </div>
  );
}
