import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

function normalizeSupabaseUrl(url: string): string {
  let cleaned = url.trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '');
  
  if (!cleaned) return '';

  // Case 1: User pasted dashboard URL e.g. https://supabase.com/dashboard/project/<project_ref>
  const dashboardMatch = cleaned.match(/supabase\.com\/dashboard\/project\/([a-zA-Z0-9_-]+)/i);
  if (dashboardMatch && dashboardMatch[1]) {
    return `https://${dashboardMatch[1]}.supabase.co`;
  }

  // Case 2: User pasted https://app.supabase.com/project/<project_ref>
  const appMatch = cleaned.match(/app\.supabase\.com\/project\/([a-zA-Z0-9_-]+)/i);
  if (appMatch && appMatch[1]) {
    return `https://${appMatch[1]}.supabase.co`;
  }

  // Case 3: Missing protocol
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = `https://${cleaned}`;
  }

  // Remove trailing /v1 or subpaths if inadvertently added
  cleaned = cleaned.replace(/\/v1\/?$/i, '').replace(/\/auth\/?$/i, '');

  return cleaned;
}

const supabaseUrl = normalizeSupabaseUrl(rawUrl);
const supabaseAnonKey = rawKey.trim().replace(/^["']|["']$/g, '');

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
