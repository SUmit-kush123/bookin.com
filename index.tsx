import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeProvider';
import { LanguageProvider } from './contexts/LanguageProvider';
import { HistoryProvider } from './contexts/HistoryProvider';
import { CurrencyProvider } from './contexts/CurrencyProvider';
import { ToastProvider } from './contexts/ToastProvider';
import { WishlistProvider } from './contexts/WishlistProvider';
import { BookingProvider } from './contexts/BookingContext';
import { VoiceAssistantProvider } from './contexts/VoiceAssistantProvider';
import { ListingsProvider } from './contexts/ListingsProvider';
import { RecentlyViewedProvider } from './contexts/RecentlyViewedProvider';
import { NotificationProvider } from './contexts/NotificationProvider';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <HistoryProvider>
            <CurrencyProvider>
              <ToastProvider>
                <WishlistProvider>
                  <ListingsProvider>
                    <RecentlyViewedProvider>
                      <BookingProvider>
                        <VoiceAssistantProvider>
                          <NotificationProvider>
                            <App />
                          </NotificationProvider>
                        </VoiceAssistantProvider>
                      </BookingProvider>
                    </RecentlyViewedProvider>
                  </ListingsProvider>
                </WishlistProvider>
              </ToastProvider>
            </CurrencyProvider>
          </HistoryProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);