'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-secondary)] py-12 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]">
          Dashboard
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">Verwalte dein Konto und Einstellungen</p>
        
        {authenticatedUserQuery.isPending ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="loader"></div>
            <p className="text-[var(--text-secondary)] mt-4">Daten werden geladen...</p>
          </div>
        ) : authenticatedUserQuery.error ? (
          <div className="bg-red-50 border-l-4 border-[var(--accent-color-1)] p-4 rounded-md">
            <p className="text-[var(--accent-color-1)]">Fehler beim Laden deiner Daten.</p>
            <button 
              onClick={() => authenticatedUserQuery.refetch()} 
              className="mt-2 px-3 py-1.5 bg-transparent border border-[var(--accent-color-1)] text-[var(--accent-color-1)] rounded-md hover:bg-[var(--accent-color-1)] hover:text-white transition-all"
            >
              Erneut versuchen
            </button>
          </div>
        ) : authenticatedUserQuery.data ? (
          <div className="space-y-6">
            {/* Profilkarte */}
            <div className="bg-[var(--background-primary)] rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl relative overflow-hidden">
              {/* Dekorative Elemente */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--primary-color)] to-transparent opacity-10 rounded-bl-full -z-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--secondary-color)] to-transparent opacity-10 rounded-tr-full -z-10"></div>
              
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] rounded-full p-0.5 mr-4">
                  <div className="bg-[var(--background-primary)] rounded-full p-1">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-[var(--accent-color-1)] to-[var(--secondary-color)] text-white text-xl font-bold">
                      {authenticatedUserQuery.data.display_name?.charAt(0) || 'U'}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">{authenticatedUserQuery.data.display_name}</h2>
                  <p className="text-[var(--text-secondary)]">{authenticatedUserQuery.data.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[var(--background-secondary)] rounded-lg p-4">
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Account Status</p>
                  <div className="flex items-center">
                    {authenticatedUserQuery.data.verified ? (
                      <div className="flex items-center text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Verifiziert</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-[var(--accent-color-1)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Nicht verifiziert</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-[var(--background-secondary)] rounded-lg p-4">
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Mitglied seit</p>
                  <div className="flex items-center text-[var(--text-primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-[var(--primary-color)]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {new Date(authenticatedUserQuery.data.created ?? '').toLocaleDateString('de-DE', { 
                        day: '2-digit', month: '2-digit', year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              {!authenticatedUserQuery.data.verified && (
                <div className="mb-6 bg-blue-50 border-l-4 border-[var(--primary-color)] p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0 text-[var(--primary-color)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-[var(--primary-color)]">
                        Dein Account ist noch nicht verifiziert. Verifiziere deinen Account, um alle Funktionen nutzen zu können.
                      </p>
                      <div className="mt-2">
                        <button 
                          onClick={handleVerification} 
                          disabled={requestVerificationMutation.isPending}
                          className="px-4 py-1.5 bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color-2)] rounded-md text-white text-sm hover:shadow-lg transition-all duration-200 flex items-center"
                        >
                          {requestVerificationMutation.isPending ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Wird gesendet...
                            </>
                          ) : (
                            'Verifizierungs-E-Mail senden'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <hr className="border-[var(--background-tertiary)] my-6" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <button 
                    onClick={handleLogout} 
                    className="flex-1 py-2.5 px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--background-tertiary)] to-[var(--background-secondary)] text-[var(--text-secondary)] font-medium rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-4-4H3zm9 3a1 1 0 00-1 1v7a1 1 0 002 0V7a1 1 0 00-1-1z" clipRule="evenodd" />
                      <path d="M4 7h5v5H4V7z" />
                    </svg>
                    Abmelden
                  </button>
                  
                  <button 
                    onClick={handleDeleteAccount} 
                    disabled={deleteAccountMutation.isPending}
                    className="flex-1 py-2.5 px-4 flex items-center justify-center gap-2 bg-transparent border border-[var(--accent-color-1)] text-[var(--accent-color-1)] rounded-lg hover:bg-[var(--accent-color-1)] hover:text-white transition-all duration-200"
                  >
                    {deleteAccountMutation.isPending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Wird gelöscht...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Account löschen
                      </>
                    )}
                  </button>
                </div>
                
                <Link href="/" className="block w-full">
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 flex items-center justify-center gap-2 bg-transparent border border-[var(--background-tertiary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--background-secondary)] transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Zurück zur Startseite
                  </button>
                </Link>
                
                {requestVerificationMutation.isSuccess && (
                  <div className="animate-fade-in mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                    <p className="text-green-700 text-sm">Verifizierungs-E-Mail wurde erfolgreich gesendet!</p>
                  </div>
                )}
                
                {deleteAccountMutation.isSuccess && (
                  <div className="animate-fade-in mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <p className="text-red-700 text-sm">Dein Account wird gelöscht. Du wirst in Kürze abgemeldet...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="loader"></div>
            <p className="text-[var(--text-secondary)] mt-4">Daten werden geladen...</p>
          </div>
        )}
      </div>
      
      {/* Dekorative Hintergrundelemente */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-bl from-[var(--primary-color)] to-[var(--accent-color-2)] rounded-full opacity-5 blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-[var(--accent-color-1)] to-[var(--secondary-color)] rounded-full opacity-5 blur-3xl -z-10"></div>
    </div>
  );
}
