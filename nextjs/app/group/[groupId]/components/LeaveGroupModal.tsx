import React from 'react';

interface LeaveGroupModalProps {
  handleLeaveGroup: () => Promise<void>;
  setShowLeaveModal: (value: boolean) => void;
}

const LeaveGroupModal: React.FC<LeaveGroupModalProps> = ({ handleLeaveGroup, setShowLeaveModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[var(--background-primary)] rounded-xl shadow-lg p-6 transform transition-all duration-300 relative overflow-hidden">
        {/* Dekorative Elemente */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--primary-color)] to-transparent opacity-10 rounded-bl-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--secondary-color)] to-transparent opacity-10 rounded-tr-full -z-10"></div>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--accent-color-1)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color-1)] to-[var(--secondary-color)]">
            Gruppe verlassen
          </h2>
          <p className="text-[var(--text-secondary)]">
            Bist du sicher, dass du diese Gruppe verlassen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="px-5 py-2.5 flex-1 bg-transparent border border-[var(--background-tertiary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--background-secondary)] transition-colors duration-200"
            onClick={() => setShowLeaveModal(false)}
          >
            Abbrechen
          </button>
          
          <button
            type="button"
            className="px-5 py-2.5 flex-1 bg-gradient-to-r from-[var(--accent-color-1)] to-red-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            onClick={handleLeaveGroup}
          >
            Gruppe verlassen
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveGroupModal;