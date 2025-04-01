import React, { useState } from 'react';

interface InviteLinkModalProps {
  maxUses: number | null;
  setMaxUses: (value: number | null) => void;
  handleGenerateInviteLink: (isUnlimited: boolean) => Promise<unknown>;
  setShowModal: (value: boolean) => void;
}

const InviteLinkModal: React.FC<InviteLinkModalProps> = ({ maxUses, setMaxUses, handleGenerateInviteLink, setShowModal }) => {
  const [isUnlimited, setIsUnlimited] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConfirmDisabled = !isUnlimited && (maxUses === null || maxUses <= 0);

  const handleConfirm = async () => {
    try {
      await handleGenerateInviteLink(isUnlimited);
      setShowModal(false);
      setMaxUses(null);
      setIsUnlimited(false);
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[var(--background-primary)] rounded-xl shadow-lg p-6 transform transition-all duration-300 relative overflow-hidden">
        {/* Dekorative Elemente */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--primary-color)] to-transparent opacity-10 rounded-bl-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--secondary-color)] to-transparent opacity-10 rounded-tr-full -z-10"></div>
        
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]">
          Einladungslink erstellen
        </h2>
        
        <div className="mb-6">
          <p className="text-[var(--text-secondary)] mb-4">
            Erstelle einen Einladungslink, mit dem andere Benutzer dieser Gruppe beitreten können.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Maximale Verwendungen
            </label>
            <div className="relative">
              <input
                type="number"
                value={isUnlimited ? '' : maxUses?.toString() ?? ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue === '') {
                    setMaxUses(null);
                  } else {
                    const num = Math.max(1, Math.floor(Number(inputValue)));
                    setMaxUses(num);
                  }
                }}
                className={`pl-3 block w-full rounded-lg border border-[var(--background-tertiary)] ${
                  isUnlimited 
                    ? 'bg-[var(--background-tertiary)] text-[var(--text-secondary)] cursor-not-allowed' 
                    : 'bg-[var(--background-secondary)] text-[var(--text-primary)]'
                } py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200`}
                placeholder="Anzahl der maximalen Verwendungen..."
                min="1"
                disabled={isUnlimited}
              />
            </div>
          </div>
          
          <div className="flex items-center mb-6 bg-[var(--background-secondary)] rounded-lg p-3 cursor-pointer" onClick={() => {
            setIsUnlimited(!isUnlimited);
            if (!isUnlimited) {
              setMaxUses(null);
            }
          }}>
            <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
              isUnlimited 
                ? 'bg-[var(--primary-color)]' 
                : 'border-2 border-[var(--text-secondary)]'
            }`}>
              {isUnlimited && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <label className="text-[var(--text-primary)] cursor-pointer select-none">Unbegrenzte Verwendungen</label>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-[var(--accent-color-1)] p-4 mb-4 rounded-md">
              <p className="text-[var(--accent-color-1)] text-sm">{error}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-5 py-2.5 bg-transparent border border-[var(--background-tertiary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--background-secondary)] transition-colors duration-200"
            onClick={() => {
              setShowModal(false);
              setMaxUses(null);
              setIsUnlimited(false);
            }}
          >
            Abbrechen
          </button>
          
          <button
            type="button"
            className={`px-5 py-2.5 ${
              isConfirmDisabled 
                ? 'bg-[var(--background-tertiary)] text-[var(--text-secondary)] cursor-not-allowed' 
                : 'bg-gradient-to-r from-[var(--accent-color-1)] to-[var(--secondary-color)] text-white transform hover:-translate-y-0.5 hover:shadow-lg'
            } font-medium rounded-lg transition-all duration-200`}
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
          >
            Erstellen
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteLinkModal;
