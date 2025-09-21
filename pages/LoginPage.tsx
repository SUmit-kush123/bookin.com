import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME, IconLogin, IconEnvelope, IconLockClosed, IconLogo, IconShieldCheck } from '../constants';
import { useTranslation } from '../contexts/LanguageProvider';
import { User } from '../types';
import SocialLoginButtons from '../components/auth/SocialLoginButtons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mfaStep, setMfaStep] = useState(false);
  const [tempUser, setTempUser] = useState<User | null>(null);

  const { startLogin, verifyMfaAndLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation();
  const mfaInputRef = useRef<HTMLInputElement>(null);

  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    if(mfaStep && mfaInputRef.current) {
        mfaInputRef.current.focus();
    }
  }, [mfaStep]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Both email and password are required.');
      setIsLoading(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError('Please enter a valid email address.');
        setIsLoading(false);
        return;
    }
    
    try {
      const user = await startLogin(email);
      setTempUser(user);
      setMfaStep(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleMfaSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      if (!tempUser) {
        setError("Session error. Please try logging in again.");
        setMfaStep(false);
        return;
      }
      if (mfaCode.length !== 6) {
        setError("Please enter the 6-digit code.");
        return;
      }

      setIsLoading(true);
      try {
        const success = await verifyMfaAndLogin(tempUser, mfaCode);
        if (success) {
            navigate(from, { replace: true });
        } else {
            setError('Invalid authentication code. Please try again.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'MFA verification failed. Please try again.');
      } finally {
          setIsLoading(false);
      }
  }

  const inputBaseClasses = "w-full p-3 pl-10 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-150 shadow-sm text-neutral-dark dark:text-neutral-d-dark bg-white dark:bg-neutral-d-light/50 placeholder-neutral-DEFAULT dark:placeholder-neutral-d-DEFAULT";
  const iconBaseClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-DEFAULT/70 dark:text-neutral-d-DEFAULT/70";

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-light dark:bg-neutral-d-light">
      <div className="max-w-md w-full space-y-8 p-8 sm:p-10 bg-white dark:bg-neutral-d-light/50 shadow-2xl rounded-xl border border-neutral-extralight/50 dark:border-neutral-d-extralight/50">
        {!mfaStep ? (
            <>
            <div>
              <Link to="/" className="flex justify-center items-center mb-6">
                <IconLogo className="h-10 w-auto text-primary dark:text-accent-light" />
                <span className="ml-2 text-3xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">{APP_NAME} {t('login_title')}</span>
              </Link>
              <h2 className="mt-2 text-center text-xl text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">
                {t('login_welcome')}
              </h2>
            </div>
            <div className="space-y-4">
              <SocialLoginButtons />
              <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-extralight dark:border-neutral-d-extralight" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-neutral-d-light/50 text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">Or continue with email</span>
                  </div>
              </div>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
              {error && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-md border border-red-200">{error}</p>}
              
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <div className="relative">
                    <IconEnvelope className={iconBaseClasses} />
                    <input id="email-address" name="email" type="email" autoComplete="email" required className={inputBaseClasses} placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="pt-4">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <div className="relative">
                    <IconLockClosed className={iconBaseClasses} />
                    <input id="password" name="password" type="password" autoComplete="current-password" required className={inputBaseClasses} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-accent border-neutral-extralight dark:border-neutral-d-extralight rounded bg-secondary dark:bg-neutral-d-extralight" />
                  <label htmlFor="remember-me" className="ml-2 block text-neutral-dark dark:text-neutral-d-dark"> Remember me </label>
                </div>
                <a href="#" className="font-medium text-primary hover:text-primary-dark dark:text-accent-light dark:hover:text-accent"> Forgot your password? </a>
              </div>

              <div>
                <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light disabled:opacity-70 transition-colors">
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary hover:text-primary-dark dark:text-accent-light dark:hover:text-accent">
                Sign up here
              </Link>
            </p>
            </>
        ) : (
            <>
            <div>
                <div className="flex justify-center items-center mb-6">
                    <IconShieldCheck className="h-10 w-auto text-primary dark:text-accent-light" />
                    <span className="ml-2 text-3xl font-extrabold text-neutral-dark dark:text-neutral-d-dark">2-Factor Auth</span>
                </div>
                <h2 className="mt-2 text-center text-base text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">
                    A 6-digit code has been sent to {tempUser?.email}. (For demo, use <strong>123456</strong>).
                </h2>
            </div>
             <form className="mt-8 space-y-6" onSubmit={handleMfaSubmit}>
                {error && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-md border border-red-200">{error}</p>}
                 <div>
                    <label htmlFor="mfa-code" className="sr-only">Authentication Code</label>
                    <input
                        ref={mfaInputRef}
                        id="mfa-code"
                        name="mfaCode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        required
                        className="w-full text-center text-2xl tracking-[.5em] p-3 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-150 shadow-sm"
                        placeholder="______"
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        maxLength={6}
                    />
                </div>
                <div>
                    <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light disabled:opacity-70 transition-colors">
                        {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                    </button>
                </div>
            </form>
            <button onClick={() => setMfaStep(false)} className="text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT hover:underline w-full mt-4">Back to login</button>
            </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;