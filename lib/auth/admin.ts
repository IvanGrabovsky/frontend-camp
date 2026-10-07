import type { User } from './types';

// List of authorized admin emails
const DEFAULT_ADMIN_EMAILS = [
  'ivan.grabovsky.ua@gmail.com',
];

export function getAdminEmails(): string[] {
  const envAdmins = process.env.NEXT_PUBLIC_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase())
    : [];

  return Array.from(new Set([...DEFAULT_ADMIN_EMAILS, ...envAdmins]));
}

/**
 * Check if the current user has teacher/admin privileges.
 */
export function isUserAdmin(user: User | null): boolean {
  if (!user || !user.email) return false;
  const adminEmails = getAdminEmails();
  return adminEmails.includes(user.email.trim().toLowerCase());
}

/**
 * Admin Passkey check (for teacher direct access verification)
 */
export const ADMIN_PASSKEY = 'camp2026';

export function verifyAdminPasskey(key: string): boolean {
  return key.trim() === ADMIN_PASSKEY;
}
