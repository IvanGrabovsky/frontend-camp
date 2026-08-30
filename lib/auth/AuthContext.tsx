'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, AuthContextType, AuthResponse } from './types';
import { supabase, isSupabaseConfigured } from '@/lib/db/supabase';

const AUTH_STORAGE_KEY = 'frontend_camp_user_session';
const USERS_STORAGE_KEY = 'frontend_camp_registered_users';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Fetch full user profile from Supabase Database
  const fetchSupabaseProfile = useCallback(async (userId: string, email: string): Promise<User | null> => {
    if (!supabase) return null;
    try {
      // 1. Get profile row
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileErr && profileErr.code !== 'PGRST116') {
        console.warn('Supabase profile fetch error:', profileErr);
      }

      // 2. Get completed lessons from lesson_progress table
      const { data: progressRows, error: progressErr } = await supabase
        .from('lesson_progress')
        .select('course_slug, lesson_slug')
        .eq('user_id', userId);

      const completedLessons = progressRows
        ? progressRows.map((r: { course_slug: string; lesson_slug: string }) => `${r.course_slug}/${r.lesson_slug}`)
        : [];

      if (profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email || email,
          avatar: profile.avatar,
          crystals: profile.crystals ?? 100,
          completedLessons,
          createdAt: profile.created_at,
        };
      }

      // If profile row doesn't exist yet, insert it
      const defaultName = email.split('@')[0];
      const newProfile: User = {
        id: userId,
        name: defaultName.charAt(0).toUpperCase() + defaultName.slice(1),
        email: email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        crystals: 100,
        completedLessons: [],
        createdAt: new Date().toISOString(),
      };

      await supabase.from('profiles').upsert({
        id: userId,
        email: email,
        name: newProfile.name,
        avatar: newProfile.avatar,
        crystals: newProfile.crystals,
      });

      return newProfile;
    } catch (err) {
      console.error('Error in fetchSupabaseProfile:', err);
      return null;
    }
  }, []);

  // Initialize session
  useEffect(() => {
    async function initAuth() {
      try {
        if (isSupabaseConfigured && supabase) {
          // Check Supabase session
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const dbUser = await fetchSupabaseProfile(session.user.id, session.user.email || '');
            if (dbUser) {
              setUser(dbUser);
              setIsLoading(false);
              return;
            }
          }
        }

        // Fallback to localStorage session
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        }
      } catch (e) {
        console.error('Failed to load user session', e);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();

    // Listen to Supabase auth state changes if configured
    if (isSupabaseConfigured && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const dbUser = await fetchSupabaseProfile(session.user.id, session.user.email || '');
          if (dbUser) setUser(dbUser);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [fetchSupabaseProfile]);

  // Save session helper
  const saveSession = useCallback((updatedUser: User | null) => {
    setUser(updatedUser);
    try {
      if (updatedUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
        const allUsersJson = localStorage.getItem(USERS_STORAGE_KEY);
        const allUsers: Record<string, User> = allUsersJson ? JSON.parse(allUsersJson) : {};
        allUsers[updatedUser.email.toLowerCase()] = updatedUser;
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(allUsers));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save session', e);
    }
  }, []);

  const login = useCallback(
    async (email: string, password?: string): Promise<AuthResponse> => {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail) {
        return { success: false, error: 'Введіть email адресу' };
      }
      if (!password) {
        return { success: false, error: 'Введіть пароль' };
      }

      try {
        // If Supabase is connected (Real Database Mode)
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password: password,
          });

          if (error) {
            const msg = error.message.toLowerCase();
            if (msg.includes('email not confirmed')) {
              return {
                success: false,
                error: 'Ваш email ще не підтверджено. Будь ласка, перейдіть за посиланням у надісланому листі.',
              };
            }
            if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
              return { success: false, error: 'Невірний email або пароль' };
            }
            return { success: false, error: error.message };
          }

          if (data.user) {
            const dbUser = await fetchSupabaseProfile(data.user.id, data.user.email || normalizedEmail);
            if (dbUser) {
              saveSession(dbUser);
              setIsAuthModalOpen(false);
              return { success: true };
            }
          }
          return { success: false, error: 'Не вдалося завантажити профіль користувача' };
        }

        // Local / Offline mode (No Supabase keys)
        const allUsersJson = localStorage.getItem(USERS_STORAGE_KEY);
        const allUsers: Record<string, User & { passwordHash?: string }> = allUsersJson ? JSON.parse(allUsersJson) : {};

        const existingUser = allUsers[normalizedEmail];

        if (!existingUser) {
          return {
            success: false,
            error: 'Користувача з такою поштою не знайдено. Будь ласка, зареєструйтесь.',
          };
        }

        // Check local password if stored
        if (existingUser.passwordHash && existingUser.passwordHash !== password) {
          return {
            success: false,
            error: 'Невірний пароль',
          };
        }

        saveSession(existingUser);
        setIsAuthModalOpen(false);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Помилка при вході' };
      }
    },
    [fetchSupabaseProfile, saveSession]
  );

  const register = useCallback(
    async (name: string, email: string, password?: string): Promise<AuthResponse> => {
      const trimmedName = name.trim();
      const normalizedEmail = email.trim().toLowerCase();

      if (!trimmedName) {
        return { success: false, error: "Введіть ваше ім'я" };
      }
      if (!normalizedEmail || !normalizedEmail.includes('@')) {
        return { success: false, error: 'Введіть коректний email' };
      }

      try {
        // If Supabase is connected
        if (isSupabaseConfigured && supabase && password) {
          const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;
          const { data, error } = await supabase.auth.signUp({
            email: normalizedEmail,
            password: password,
            options: {
              data: {
                name: trimmedName,
                avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${normalizedEmail}`,
              },
              emailRedirectTo: redirectTo,
            },
          });

          if (error) {
            const msg = error.message.toLowerCase();
            if (msg.includes('already registered') || msg.includes('already exists') || msg.includes('user already exists')) {
              return {
                success: false,
                userAlreadyExists: true,
                error: 'Акаунт із цією поштою вже зареєстровано. Будь ласка, увійдіть.',
              };
            }
            return { success: false, error: error.message };
          }

          // Check if Supabase returned user with empty identities (meaning user already exists)
          if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
            return {
              success: false,
              userAlreadyExists: true,
              error: 'Акаунт із цією поштою вже зареєстровано. Будь ласка, увійдіть.',
            };
          }

          // If Supabase requires email confirmation, session is null
          if (data.user && !data.session) {
            return { success: true, requiresEmailConfirmation: true };
          }

          if (data.user) {
            const dbUser = await fetchSupabaseProfile(data.user.id, data.user.email || normalizedEmail);
            if (dbUser) {
              saveSession(dbUser);
              setIsAuthModalOpen(false);
              return { success: true };
            }
          }
        }

        // Local / Offline mode
        const allUsersJson = localStorage.getItem(USERS_STORAGE_KEY);
        const allUsers: Record<string, User> = allUsersJson ? JSON.parse(allUsersJson) : {};

        if (allUsers[normalizedEmail]) {
          return {
            success: false,
            userAlreadyExists: true,
            error: 'Акаунт із цією поштою вже зареєстровано. Будь ласка, увійдіть.',
          };
        }

        const newUser: User = {
          id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          name: trimmedName,
          email: normalizedEmail,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${normalizedEmail}`,
          crystals: 100,
          completedLessons: [],
          createdAt: new Date().toISOString(),
        };

        allUsers[normalizedEmail] = { ...newUser, passwordHash: password };
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(allUsers));

        saveSession(newUser);
        setIsAuthModalOpen(false);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Помилка при реєстрації' };
      }
    },
    [fetchSupabaseProfile, saveSession]
  );

  const resendConfirmationEmail = useCallback(async (email: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return { success: true };
    }
    try {
      const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: redirectTo,
        },
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Помилка відправки листа' };
    }
  }, []);

  const logout = useCallback(async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    saveSession(null);
  }, [saveSession]);

  const toggleLessonCompleted = useCallback(
    async (courseSlug: string, lessonSlug: string, crystalsReward: number = 10) => {
      if (!user) {
        setIsAuthModalOpen(true);
        return;
      }

      const lessonKey = `${courseSlug}/${lessonSlug}`;
      const isCompleted = user.completedLessons.includes(lessonKey);

      let updatedLessons: string[];
      let updatedCrystals = user.crystals;

      if (isCompleted) {
        updatedLessons = user.completedLessons.filter((k) => k !== lessonKey);
        updatedCrystals = Math.max(0, updatedCrystals - crystalsReward);

        // Sync delete with Supabase DB if configured
        if (isSupabaseConfigured && supabase) {
          await supabase
            .from('lesson_progress')
            .delete()
            .match({ user_id: user.id, course_slug: courseSlug, lesson_slug: lessonSlug });

          await supabase
            .from('profiles')
            .update({ crystals: updatedCrystals })
            .eq('id', user.id);
        }
      } else {
        updatedLessons = [...user.completedLessons, lessonKey];
        updatedCrystals += crystalsReward;

        // Sync insert with Supabase DB if configured
        if (isSupabaseConfigured && supabase) {
          await supabase.from('lesson_progress').upsert({
            user_id: user.id,
            course_slug: courseSlug,
            lesson_slug: lessonSlug,
          });

          await supabase
            .from('profiles')
            .update({ crystals: updatedCrystals })
            .eq('id', user.id);
        }
      }

      const updatedUser: User = {
        ...user,
        completedLessons: updatedLessons,
        crystals: updatedCrystals,
      };

      saveSession(updatedUser);
    },
    [user, saveSession]
  );

  const isLessonCompleted = useCallback(
    (courseSlug: string, lessonSlug: string): boolean => {
      if (!user) return false;
      return user.completedLessons.includes(`${courseSlug}/${lessonSlug}`);
    },
    [user]
  );

  const addCrystals = useCallback(
    async (amount: number) => {
      if (!user) return;
      const updatedCrystals = user.crystals + amount;
      const updatedUser: User = {
        ...user,
        crystals: updatedCrystals,
      };

      if (isSupabaseConfigured && supabase) {
        await supabase
          .from('profiles')
          .update({ crystals: updatedCrystals })
          .eq('id', user.id);
      }

      saveSession(updatedUser);
    },
    [user, saveSession]
  );

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    resendConfirmationEmail,
    logout,
    toggleLessonCompleted,
    isLessonCompleted,
    addCrystals,
    openAuthModal,
    closeAuthModal,
    isAuthModalOpen,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

