// src/app/page.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Dashboard from "@/app/dashboard/page";
import Survey from "@/app/survey/page";

const HomePage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="home-page">
      <Image src="/img/logo.png" alt="Swipeer Logo" width={120} height={120} />
      <h1>Welcome to Swipeer</h1>
      <div className="forms-container">
        {showLogin ? <LoginForm /> : <SignupForm />}
        <p>
          {showLogin ? (
            <>
              Don&#39;t have an account?{' '}
              <button onClick={toggleForm} className="toggle-button">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={toggleForm} className="toggle-button">
                Log in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
