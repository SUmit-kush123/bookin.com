import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME, IconUserPlus, IconUser, IconEnvelope, IconLockClosed, IconLogo } from '../constants';
import { User } from '../types';
import SocialLoginButtons from '../components/auth/SocialLoginButtons';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'host'>('customer'); // New state for role
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }
     if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError('Please enter a valid email address.');
        setIsLoading(false);
        return;
    }

    try {
      console.log(`Attempting mock signup for ${email} as a ${role}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: Omit<User, 'id' | 'avatar'> = { name, email, role };
      signup(userData);
      
      navigate('/');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const inputBaseClasses = "w-full p-3 pl-10 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-150 shadow-sm text-neutral-dark dark:text-neutral-d-dark bg-white dark:bg-neutral-d-light/50 placeholder-neutral-DEFAULT dark:placeholder-neutral-d-DEFAULT";
  const iconBaseClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-DEFAULT/70 dark:text-neutral-d-DEFAULT/70";


  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent/5 via-neutral-light dark:via-neutral-d-light to-primary/5 dark:to-primary/10">
      <div className="max-w-lg w-full space-y-8 p-8 sm:p-10 bg-white dark:bg-neutral-d-light/50 shadow-2xl rounded-xl border border-neutral-extralight/50 dark:border-neutral-d-extralight/50">
        <div>
           <Link to="/" className="flex justify-center items-center mb-6">
            <IconLogo className="h-10 w-auto text-primary dark:text-accent-light" />
            <span className="ml-2 text-3xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">Create Account</span>
          </Link>
          <h2 className="mt-2 text-center text-xl text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">
            Join {APP_NAME} today and start booking!
          </h2>
        </div>
        <div className="space-y-4">
            <SocialLoginButtons />
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-extralight dark:border-neutral-d-extralight" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-neutral-d-light/50 text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">Or create an account with email</span>
                </div>
            </div>
        </div>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-md border border-red-200">{error}</p>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
            <div>
              <label htmlFor="full-name" className="sr-only">Full Name</label>
              <div className="relative">
                <IconUser className={iconBaseClasses} />
                <input id="full-name" name="name" type="text"autoComplete="name" required className={inputBaseClasses} placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="relative">
                <IconEnvelope className={iconBaseClasses} />
                <input id="email-address" name="email" type="email" autoComplete="email" required className={inputBaseClasses} placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <IconLockClosed className={iconBaseClasses} />
                <input id="password" name="password" type="password" autoComplete="new-password" required className={inputBaseClasses} placeholder="Password (min. 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <div className="relative">
                <IconLockClosed className={iconBaseClasses} />
                <input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" required className={inputBaseClasses} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-2 text-center">Register as</label>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`px-6 py-2 rounded-lg border-2 transition-colors text-sm font-medium ${role === 'customer' ? 'bg-primary border-primary text-white dark:bg-accent dark:border-accent' : 'bg-white dark:bg-neutral-d-light border-neutral-extralight dark:border-neutral-d-extralight text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight'}`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('host')}
                className={`px-6 py-2 rounded-lg border-2 transition-colors text-sm font-medium ${role === 'host' ? 'bg-primary border-primary text-white dark:bg-accent dark:border-accent' : 'bg-white dark:bg-neutral-d-light border-neutral-extralight dark:border-neutral-d-extralight text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight'}`}
              >
                Host
              </button>
            </div>
          </div>


          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light disabled:opacity-70 transition-colors"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <IconUserPlus className="h-5 w-5 text-accent-light group-hover:text-sky-300" aria-hidden="true" />
                  </span>
                  Sign Up
                </>
              )}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-dark dark:text-accent-light dark:hover:text-accent">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;