import React, { useState } from 'react';

interface InviteLinkModalProps {
  maxUses: number | null;
  setMaxUses: (value: number | null) => void;
  handleGenerateInviteLink: (isUnlimited: boolean) => void;
  setShowModal: (value: boolean) => void;
}

const InviteLinkModal: React.FC<InviteLinkModalProps> = ({ maxUses, setMaxUses, handleGenerateInviteLink, setShowModal }) => {
  const [isUnlimited, setIsUnlimited] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black text-center">Generate invite link</h2>
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
          className={`mb-4 py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color text-black ${isUnlimited ? 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-700'}`}
          placeholder="Maximum uses..."
          min="1"
          disabled={isUnlimited}
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isUnlimited}
            onChange={() => {
              setIsUnlimited(!isUnlimited);
              if (!isUnlimited) {
                setMaxUses(null);
              }
            }}
            className="mr-2"
          />
          <label className="text-black">Unlimited uses</label>
        </div>
        <div className="flex justify-center">
          <button
            className="mr-2 py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => {
              setShowModal(false);
              setMaxUses(null);
              setIsUnlimited(false);
            }}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 bg-primary-color text-white font-semibold rounded-md hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
            onClick={() => handleGenerateInviteLink(isUnlimited)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteLinkModal;
