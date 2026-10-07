import { supabase, isSupabaseConfigured } from '@/lib/db/supabase';
import type { User } from '@/lib/auth/types';

export interface StudentQuestStatus {
  questSlug: string;
  passedTests: number;
  totalTests: number;
  isCompleted: boolean;
  code: string;
  updatedAt: string;
  codeAnalysisScore?: number;
  antiCheatPassed?: boolean;
}

export interface StudentReport {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  crystals: number;
  createdAt: string;
  quests: Record<string, StudentQuestStatus>;
  totalCompletedQuests: number;
}

const LOCAL_QUEST_PROGRESS_KEY = 'frontend_camp_quests_progress';
const LOCAL_SUBMISSIONS_LOG_KEY = 'frontend_camp_all_student_submissions';

/**
 * Save progress of a student for a specific quest
 */
export async function saveQuestProgress(
  user: User,
  questSlug: string,
  code: string,
  passedTests: number,
  totalTests: number,
  isCompleted: boolean,
  codeAnalysisScore?: number,
  antiCheatPassed?: boolean
): Promise<void> {
  const timestamp = new Date().toISOString();

  const progressRecord: StudentQuestStatus = {
    questSlug,
    passedTests,
    totalTests,
    isCompleted,
    code,
    updatedAt: timestamp,
    codeAnalysisScore,
    antiCheatPassed,
  };

  // 1. Save to localStorage for this specific user
  if (typeof window !== 'undefined') {
    try {
      const userProgressKey = `${LOCAL_QUEST_PROGRESS_KEY}_${user.id}`;
      const existing = localStorage.getItem(userProgressKey);
      const userQuests: Record<string, StudentQuestStatus> = existing ? JSON.parse(existing) : {};
      userQuests[questSlug] = progressRecord;
      localStorage.setItem(userProgressKey, JSON.stringify(userQuests));

      // Also record into the shared submission log (for teacher overview in offline/demo mode)
      const allSubmissionsRaw = localStorage.getItem(LOCAL_SUBMISSIONS_LOG_KEY);
      const allReports: Record<string, StudentReport> = allSubmissionsRaw ? JSON.parse(allSubmissionsRaw) : {};

      if (!allReports[user.id]) {
        allReports[user.id] = {
          userId: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          crystals: user.crystals,
          createdAt: user.createdAt,
          quests: {},
          totalCompletedQuests: 0,
        };
      }

      allReports[user.id].name = user.name;
      allReports[user.id].email = user.email;
      allReports[user.id].crystals = user.crystals;
      allReports[user.id].quests[questSlug] = progressRecord;
      allReports[user.id].totalCompletedQuests = Object.values(allReports[user.id].quests).filter(q => q.isCompleted).length;

      localStorage.setItem(LOCAL_SUBMISSIONS_LOG_KEY, JSON.stringify(allReports));
    } catch (e) {
      console.warn('Failed to save quest progress to localStorage:', e);
    }
  }

  // 2. Sync with Supabase if online
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('quest_progress').upsert({
        user_id: user.id,
        quest_slug: questSlug,
        passed_tests: passedTests,
        total_tests: totalTests,
        is_completed: isCompleted,
        code: code,
        updated_at: timestamp,
      }, { onConflict: 'user_id, quest_slug' });
    } catch (err) {
      // In case quest_progress table isn't created in Supabase yet, gracefully catch
      console.warn('Supabase quest_progress save skipped/failed:', err);
    }
  }
}

/**
 * Get current progress for a specific quest for a user
 */
export function getSavedQuestProgress(userId: string, questSlug: string): StudentQuestStatus | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${LOCAL_QUEST_PROGRESS_KEY}_${userId}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed[questSlug] || null;
  } catch {
    return null;
  }
}

/**
 * Fetch all students reports for the teacher admin dashboard
 */
export async function getAllStudentReports(): Promise<StudentReport[]> {
  const reportsMap: Record<string, StudentReport> = {};

  // 1. Try fetching from Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!pErr && profiles) {
        // Also fetch quest_progress if exists
        const { data: progressRows } = await supabase
          .from('quest_progress')
          .select('*');

        profiles.forEach((p: any) => {
          reportsMap[p.id] = {
            userId: p.id,
            name: p.name || p.email.split('@')[0],
            email: p.email,
            avatar: p.avatar,
            crystals: p.crystals || 100,
            createdAt: p.created_at || new Date().toISOString(),
            quests: {},
            totalCompletedQuests: 0,
          };
        });

        if (progressRows) {
          progressRows.forEach((row: any) => {
            if (reportsMap[row.user_id]) {
              reportsMap[row.user_id].quests[row.quest_slug] = {
                questSlug: row.quest_slug,
                passedTests: row.passed_tests,
                totalTests: row.total_tests,
                isCompleted: row.is_completed,
                code: row.code || '',
                updatedAt: row.updated_at,
              };
            }
          });
        }
      }
    } catch (err) {
      console.warn('Supabase reports fetch error, falling back to local storage:', err);
    }
  }

  // 2. Merge with LocalStorage data (for offline students and registered demo users)
  if (typeof window !== 'undefined') {
    try {
      const allSubmissionsRaw = localStorage.getItem(LOCAL_SUBMISSIONS_LOG_KEY);
      if (allSubmissionsRaw) {
        const localReports: Record<string, StudentReport> = JSON.parse(allSubmissionsRaw);
        Object.entries(localReports).forEach(([uid, rep]) => {
          if (!reportsMap[uid]) {
            reportsMap[uid] = rep;
          } else {
            // merge quests
            reportsMap[uid].quests = { ...reportsMap[uid].quests, ...rep.quests };
          }
        });
      }

      // Also check registered users in local storage
      const registeredUsersRaw = localStorage.getItem('frontend_camp_registered_users');
      if (registeredUsersRaw) {
        const users: Record<string, User> = JSON.parse(registeredUsersRaw);
        Object.values(users).forEach((u) => {
          if (!reportsMap[u.id]) {
            reportsMap[u.id] = {
              userId: u.id,
              name: u.name,
              email: u.email,
              avatar: u.avatar,
              crystals: u.crystals,
              createdAt: u.createdAt,
              quests: {},
              totalCompletedQuests: 0,
            };
          }
        });
      }
    } catch (e) {
      console.warn('Error merging local student reports:', e);
    }
  }

  // Recalculate total completed
  const result = Object.values(reportsMap).map((r) => {
    const totalDone = Object.values(r.quests).filter((q) => q.isCompleted).length;
    return {
      ...r,
      totalCompletedQuests: totalDone,
    };
  });

  // Sort: most active / most completed first
  return result.sort((a, b) => b.totalCompletedQuests - a.totalCompletedQuests);
}
