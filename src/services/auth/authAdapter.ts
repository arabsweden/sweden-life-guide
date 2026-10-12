/**
 * Sweden Life Guide - Auth Adapter (Demo + Firebase Ready)
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import { User, AppLanguage } from '../../types';

const AUTH_STORAGE_KEY = 'sweden_guide_user';

export const GUEST_USER: User = {
  id: 'guest_' + Math.floor(Math.random() * 10000),
  email: '',
  displayName: 'زائر الدليل',
  preferredLanguage: 'ar',
  role: 'user',
  createdAt: new Date().toISOString()
};

export const DEMO_ADMIN_USER: User = {
  id: 'admin_shihab',
  email: 'admin@swedenguide.se',
  displayName: 'المهندس رائد شهاب (مدير النظام)',
  preferredLanguage: 'ar',
  role: 'admin',
  createdAt: '2026-01-01T00:00:00Z'
};

export function getCurrentUser(): User {
  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {}
  return GUEST_USER;
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function loginWithEmailDemo(email: string, role: User['role'] = 'user'): User {
  const user: User = {
    id: 'usr_' + Date.now(),
    email,
    displayName: email.split('@')[0],
    preferredLanguage: 'ar',
    role,
    createdAt: new Date().toISOString()
  };
  setCurrentUser(user);
  return user;
}

export function loginWithGoogleDemo(): User {
  const user: User = {
    id: 'goog_' + Date.now(),
    email: 'user.google@swedenguide.se',
    displayName: 'مستخدم جوجل',
    preferredLanguage: 'ar',
    role: 'user',
    createdAt: new Date().toISOString()
  };
  setCurrentUser(user);
  return user;
}

export function logoutUser(): User {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  return GUEST_USER;
}
