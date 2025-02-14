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
      setError('An error occurred while generating the invite link. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg auto-shadow">
        <h2 className="text-2xl font-semibold mb-4  text-center">Generate invite link</h2>
        <div className="flex flex-col items-center">
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
            className={`mb-4 py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color  ${isUnlimited ? 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-700'}`}
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
            <label className="">Unlimited uses</label>
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="mr-2 py-2 px-4 bg-gray-500  font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => {
              setShowModal(false);
              setMaxUses(null);
              setIsUnlimited(false);
            }}
          >
            Cancel
          </button>
          <button
            className={`py-2 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${isConfirmDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary-color  hover:bg-secondary-color focus:ring-primary-color'}`}
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteLinkModal;
