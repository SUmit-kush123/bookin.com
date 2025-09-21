import React, { useState, useEffect } from 'react';
import { APP_NAME, IconX, IconCheck } from '../../constants';

const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('bookin_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('bookin_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDismiss = () => {
     localStorage.setItem('bookin_cookie_consent', 'dismissed');
     setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-neutral-d-light text-white shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-left text-neutral-d-dark">
          {APP_NAME} uses local storage (similar to cookies) to enhance your experience, remember preferences like theme, and for demo features. By continuing to use the site, you agree to our (mock) Privacy Policy.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleAccept}
            className="flex items-center justify-center px-4 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <IconCheck className="w-4 h-4 mr-1.5" />
            Accept
          </button>
           <button
            onClick={handleDismiss}
            className="p-2 text-neutral-d-DEFAULT hover:bg-white/10 rounded-full transition-colors"
            aria-label="Dismiss cookie banner"
           >
            <IconX className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;