import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, AuthUser, AuthProfile } from '../lib/api';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'applicant' | 'employer' | 'admin';
  location?: string;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, pass: string, expectedRole?: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (name: string, email: string, pass: string, role: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const applySession = useCallback((data: { user: AuthUser | null; profile: AuthProfile | null }) => {
    setUser(data.user);
    if (data.profile) {
      setProfile({
        id: data.profile.id,
        email: data.profile.email,
        full_name: data.profile.full_name,
        role: data.profile.role,
        location: data.profile.location ?? undefined,
        avatar: data.profile.avatar ?? undefined,
      });
    } else {
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    api
      .get<{ user: AuthUser | null; profile: AuthProfile | null }>('auth/me')
      .then(applySession)
      .catch(() => {
        setUser(null);
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, [applySession]);

  const signIn = async (email: string, pass: string, expectedRole?: string) => {
    const data = await api.post<{ user: AuthUser; profile: AuthProfile }>('auth/login', {
      email,
      password: pass,
    });

    if (expectedRole && data.user.role !== expectedRole) {
      await api.post('auth/logout');
      throw new Error(
        `Incorrect Portal: This account is registered as '${data.user.role}'. Please use the appropriate portal.`
      );
    }

    applySession(data);
  };

  const signOut = async () => {
    await api.post('auth/logout');
    setUser(null);
    setProfile(null);
  };

  const register = async (name: string, email: string, pass: string, role: string) => {
    const data = await api.post<{ user: AuthUser; profile: AuthProfile }>('auth/register', {
      name,
      email,
      password: pass,
      role,
    });
    applySession(data);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
