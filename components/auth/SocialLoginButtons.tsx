import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { IconGoogle, IconFacebook } from '../../constants';

const SocialLoginButtons: React.FC = () => {
    const { socialLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || '/';

    const handleSocialLogin = (provider: 'google' | 'facebook') => {
        try {
            socialLogin(provider);
            navigate(from, { replace: true });
        } catch (error) {
            console.error(`Mock ${provider} login failed`, error);
        }
    };
    
    return (
        <div className="space-y-3">
            <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md shadow-sm bg-white dark:bg-neutral-d-light/50 text-sm font-medium text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight transition-colors"
            >
                <IconGoogle className="w-5 h-5 mr-3" />
                Continue with Google
            </button>
             <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm bg-[#1877F2] text-sm font-medium text-white hover:bg-[#166fe5] transition-colors"
            >
                <IconFacebook className="w-5 h-5 mr-3" />
                Continue with Facebook
            </button>
        </div>
    );
};

export default SocialLoginButtons;