'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthenticatedUser } from './hooks/useAuthenticatedUser';
import { useDeleteAccount } from './hooks/useDeleteAccount';
import { useRequestVerifcation } from './hooks/useRequestVerification';

export default function Dashboard() {
  const router = useRouter();
  const authenticatedUserQuery = useAuthenticatedUser()
  const deleteAccountMutation = useDeleteAccount()
  const requestVerificationMutation = useRequestVerifcation()

  const handleLogout = async () => {
    router.push('/logout');
  };

  const handleVerification = async () => {
    // Implement the verification logic here
    // For example, send a verification email
    if (authenticatedUserQuery.data) {
      requestVerificationMutation.mutate({
        email: authenticatedUserQuery.data.email
      })
    }
  };

  const handleDeleteAccount = async () => {
    if (authenticatedUserQuery.data) {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        deleteAccountMutation.mutate({
          userId: authenticatedUserQuery.data.id
        })
      }
    }
  };

  return (
    <div className="min-h-screen bg-black-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      {authenticatedUserQuery.data ? (
        <div className="bg-black p-6 rounded-lg auto-shadow w-full max-w-md">
          <p className="text-xl mb-4">Welcome, <span className="font-semibold">{authenticatedUserQuery.data.display_name}</span></p>
          <p className="mb-2"><span className="font-semibold">Email:</span> {authenticatedUserQuery.data.email}</p>
          <p className="mb-2"><span className="font-semibold">Verified?</span> {authenticatedUserQuery.data.verified ? 'Yes' : 'No'}</p>
          {!authenticatedUserQuery.data.verified && (
            <button onClick={handleVerification} className="bg-blue-500  py-2 px-4 rounded hover:bg-blue-600 mb-4">Verify Account</button>
          )}
          <p className="mb-2"><span className="font-semibold">Account Created:</span> {new Date(authenticatedUserQuery.data.created ?? '').toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          <p className="mb-4"><span className="font-semibold">Last Updated:</span> {new Date(authenticatedUserQuery.data.updated ?? '').toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          <div className="flex flex-col space-y-4">
            <button onClick={handleLogout} className="bg-red-500  py-2 px-4 rounded hover:bg-red-600">Logout</button>
            <button onClick={handleDeleteAccount} className="bg-red-700  py-2 px-4 rounded hover:bg-red-800">Delete Account</button>
          </div>
        </div>
      ) : (
        <p className="text-xl centered">Loading...</p>
      )}
    </div>
  );
}
