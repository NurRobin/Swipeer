import React from 'react';

const LoginRegister: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Login or Register</h2>
      <p className="mb-4">Choose an option below:</p>
      <div className="flex space-x-4">
        <button className="w-full py-2 px-4 bg-primary-color text-white rounded-lg hover:bg-secondary-color transition-colors">Login</button>
        <button className="w-full py-2 px-4 bg-primary-color text-white rounded-lg hover:bg-secondary-color transition-colors">Register</button>
      </div>
    </div>
  );
};

export default LoginRegister;