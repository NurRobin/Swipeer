import React from 'react';

interface LeaveGroupModalProps {
  handleLeaveGroup: () => Promise<void>;
  setShowLeaveModal: (value: boolean) => void;
}

const LeaveGroupModal: React.FC<LeaveGroupModalProps> = ({ handleLeaveGroup, setShowLeaveModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg auto-shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[var(--primary-color)]">Leave Group</h2>
        <p className="text-center mb-4 text-black">Are you sure you want to leave the group?</p>
        <div className="flex justify-center">
          <button
            className="mr-2 py-2 px-4 bg-gray-500 font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => setShowLeaveModal(false)}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[var(--primary-color)] hover:brightness-90 focus:ring-[var(--primary-color)]"
            onClick={handleLeaveGroup}
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveGroupModal;