export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  crystals: number;
  completedLessons: string[]; // array of strings formatted as "${courseSlug}/${lessonSlug}"
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  requiresEmailConfirmation?: boolean;
  userAlreadyExists?: boolean;
}

export type AuthModalTab = 'login' | 'register' | 'forgot-password';

export interface AuthContextType extends AuthState {
  login: (email: string, password?: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password?: string) => Promise<AuthResponse>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  resendConfirmationEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  toggleLessonCompleted: (courseSlug: string, lessonSlug: string, crystalsReward?: number) => void;
  isLessonCompleted: (courseSlug: string, lessonSlug: string) => boolean;
  addCrystals: (amount: number) => void;
  openAuthModal: (tab?: AuthModalTab | React.MouseEvent | unknown) => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
  authModalTab: AuthModalTab;
  setAuthModalTab: (tab: AuthModalTab) => void;
}

