import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  mfaRequired: boolean;
  user: User | null;
  startLogin: (email: string) => Promise<User>; // Returns mock user to store temporarily
  verifyMfaAndLogin: (user: User, code: string) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'facebook') => void;
  logout: () => void;
  signup: (userData: Omit<User, 'id' | 'avatar'>) => User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [mfaRequired, setMfaRequired] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const startLogin = async (email: string): Promise<User> => {
    // In a real app, this would check password against an API
    console.log(`Starting mock login for ${email}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    setMfaRequired(true);
    // Return mock user data to be held by the login page for the MFA step
    const mockId = `user-` + email.replace(/[^a-zA-Z0-9]/g, '');
    return { id: mockId, name: email.split('@')[0], email: email, role: 'customer' as const, avatar: `https://picsum.photos/seed/${mockId}/200/200` };
  };
  
  const verifyMfaAndLogin = async (userData: User, code: string): Promise<boolean> => {
    // In a real app, this would verify the MFA code
    console.log(`Verifying mock MFA code ${code}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (code === '123456') { // Mock success code
      setIsAuthenticated(true);
      setUser(userData);
      setMfaRequired(false);
      localStorage.setItem('mockUserToken', JSON.stringify(userData));
      console.log("Mock MFA successful, user logged in:", userData.email);
      return true;
    }
    
    console.log("Mock MFA failed");
    return false; // MFA failed
  };
  
  const socialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Starting mock social login with ${provider}`);
    const socialUser: User = {
        id: `user-${provider}-${Date.now()}`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `${provider}-user@example.com`,
        role: 'customer',
        avatar: `https://picsum.photos/seed/${provider}-user/200/200`
    };
    setIsAuthenticated(true);
    setUser(socialUser);
    setMfaRequired(false);
    localStorage.setItem('mockUserToken', JSON.stringify(socialUser));
    console.log(`Mock ${provider} login successful.`);
  };


  const logout = () => {
    setIsAuthenticated(false);
    setMfaRequired(false);
    setUser(null);
    localStorage.removeItem('mockUserToken');
    console.log("Mock logout successful");
  };

  const signup = (userData: Omit<User, 'id' | 'avatar'>): User => {
    const userId = `user-${Date.now()}`;
    const newUser: User = { 
        ...userData, 
        id: userId,
        avatar: `https://picsum.photos/seed/${userId}/200/200`
    };
    
    setIsAuthenticated(true);
    setUser(newUser);
    setMfaRequired(false);
    localStorage.setItem('mockUserToken', JSON.stringify(newUser));
    console.log("Mock signup successful for:", newUser.email, "as", newUser.role);
    return newUser;
  };
  
  useEffect(() => {
    const storedToken = localStorage.getItem('mockUserToken');
    if (storedToken) {
      try {
        const storedUser = JSON.parse(storedToken) as User;
        if (storedUser && storedUser.id && storedUser.email && storedUser.role && storedUser.avatar) {
            setIsAuthenticated(true);
            setUser(storedUser);
            setMfaRequired(false);
        } else {
            localStorage.removeItem('mockUserToken');
        }
      } catch (e) {
        localStorage.removeItem('mockUserToken');
      }
    }
  }, []);


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, mfaRequired, startLogin, verifyMfaAndLogin, socialLogin, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};