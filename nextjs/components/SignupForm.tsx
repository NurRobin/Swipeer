// src/components/SignupForm.tsx
'use client';
import React, { useState } from 'react';
import pb from '@/lib/pocketbase';
import { useRouter } from 'next/navigation';

const SignupForm: React.FC = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Confirm password and error message states
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      await pb.collection('users').create({
        email,
        emailVisibility: true,
        password,
        passwordConfirm: confirmPassword,
        display_name: fullName,
      });
      // Redirect to login page after successful signup
      router.push('/');
    } catch (error: any) {
      console.error('Signup failed:', error);
      setErrorMessage(error.message || 'Signup failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Signup</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div>
        <label htmlFor="signup-fullname">Full Name</label>
        <input
          type="text"
          id="signup-fullname"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="signup-email">Email</label>
        <input
          type="email"
          id="signup-email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="signup-password">Password</label>
        <input
          type="password"
          id="signup-password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="signup-confirm-password">Confirm Password</label>
        <input
          type="password"
          id="signup-confirm-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;