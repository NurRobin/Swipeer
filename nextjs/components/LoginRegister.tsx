import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import pb from '@/lib/pocketbase';
import { useTransition, animated } from '@react-spring/web';

const LoginRegister: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regEmail, setRegEmail] = useState('');
  const [regDisplayName, setRegDisplayName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const router = useRouter();

  const transitions = useTransition(activeTab, {
    key: activeTab,
    from: { opacity: 0, transform: 'translateY(10px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-10px)' },
    exitBeforeEnter: true,
    config: { duration: 200 },
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await login(loginEmail, loginPassword);
      router.push('/dashboard');
    } catch (error: any) {
      setErrorMessage('Invalid email or password.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    try {
      await pb.collection('users').create({
        email: regEmail,
        emailVisibility: true,
        password: regPassword,
        passwordConfirm: regConfirmPassword,
        display_name: regDisplayName,
      });
      router.push('/');
    } catch (error: any) {
      setErrorMessage('Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tab Header */}
        <div className="flex justify-around bg-gray-100">
          <button
            onClick={() => {
              setActiveTab('login');
              setErrorMessage('');
            }}
            className={`w-1/2 py-4 text-center font-semibold transition-colors ${
              activeTab === 'login'
                ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                : 'text-gray-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setErrorMessage('');
            }}
            className={`w-1/2 py-4 text-center font-semibold transition-colors ${
              activeTab === 'register'
                ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                : 'text-gray-500'
            }`}
          >
            Register
          </button>
        </div>
        {/* Form Container */}
        <div className="p-8">
          {transitions((style, item) =>
            item === 'login' ? (
              <animated.div style={style}>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                  Welcome Back!
                </h2>
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="login-email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="login-password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[var(--primary-color)]  rounded-md hover:brightness-90 transition-colors"
                  >
                    Login
                  </button>
                </form>
              </animated.div>
            ) : (
              <animated.div style={style}>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                  Get Started!
                </h2>
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="register-email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="register-display-name" className="block text-sm font-medium text-gray-700">
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="register-display-name"
                      value={regDisplayName}
                      onChange={(e) => setRegDisplayName(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="register-password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="register-confirm-password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                    />
                  </div>
                  {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[var(--primary-color)]  rounded-md hover:brightness-90 transition-colors"
                  >
                    Register
                  </button>
                </form>
              </animated.div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
