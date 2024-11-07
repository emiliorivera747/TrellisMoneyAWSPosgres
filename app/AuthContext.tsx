'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';


type AuthState = {
  authenticated: boolean;
  initializing: boolean;
}

// Define the shape of the context value
interface AuthContextType {
  user: User | null;
  authentication: AuthState;
}

// Create the AuthContext with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authentication, setAuthState] = useState<AuthState>({
    authenticated: false,
    initializing: true
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setAuthState({ authenticated: true, initializing: false });
      }
      else{
        setUser(null);
        setAuthState({ authenticated: false, initializing: false });
      }

    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authentication }}> {/* Pass loading */}
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook for accessing the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
