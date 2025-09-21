import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface NotificationContextType {
  permission: NotificationPermission;
  requestPermission: () => void;
  sendNotification: (title: string, options?: NotificationOptions) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check initial permission status
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(setPermission);
    }
  }, []);

  // Request permission as soon as the provider is mounted if it's default
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (permission === 'granted') {
      const notification = new Notification(title, options);
      // You can add onclick handlers etc. here if needed
      notification.onclick = () => {
        // Example: focus the window when notification is clicked
        window.focus();
      };
    } else if (permission === 'default') {
      // Re-request permission if the user clicks an action that should trigger a notification
      requestPermission();
    }
  }, [permission, requestPermission]);

  return (
    <NotificationContext.Provider value={{ permission, requestPermission, sendNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
