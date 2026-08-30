'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, CheckCircle2, UserPlus, LogIn, Mail, Lock, User as UserIcon, AlertCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, register, resendConfirmationEmail } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [requiresConfirmation, setRequiresConfirmation] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Name validation (Registration only)
    if (tab === 'register') {
      const trimmedName = name.trim();
      if (!trimmedName) {
        newErrors.name = "Введіть ваше ім'я";
      } else if (trimmedName.length < 2) {
        newErrors.name = "Ім'я має містити щонайменше 2 символи";
      }
    }

    // 2. Email validation
    const trimmedEmail = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!trimmedEmail) {
      newErrors.email = 'Введіть email адресу';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Введіть коректний email (наприклад: name@example.com)';
    }

    // 3. Password validation
    if (!password) {
      newErrors.password = 'Введіть пароль';
    } else if (tab === 'register' && password.length < 6) {
      newErrors.password = 'Пароль має містити мінімум 6 символів';
    }

    // 4. Confirm Password validation (Registration only)
    if (tab === 'register') {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Підтвердіть пароль';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Паролі не співпадають';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    setLoading(true);

    try {
      if (tab === 'register') {
        const res = await register(name, email, password);
        if (!res.success) {
          if (res.userAlreadyExists) {
            // Automatically redirect user to Login tab
            setTab('login');
            setPassword('');
            setConfirmPassword('');
            setErrors({
              general: 'Користувач із цією поштою вже зареєстрований. Будь ласка, введіть пароль для входу.',
            });
          } else {
            setErrors({ general: res.error || 'Помилка реєстрації. Перевірте введені дані.' });
          }
        } else if (res.requiresEmailConfirmation) {
          setRequiresConfirmation(true);
          setResendCooldown(60);
        }
      } else {
        const res = await login(email, password);
        if (!res.success) {
          setErrors({ general: res.error || 'Невірний email або пароль' });
        }
      }
    } catch (err: any) {
      setErrors({ general: err?.message || 'Несподівана помилка зʼєднання' });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email) return;
    setLoading(true);
    const res = await resendConfirmationEmail(email);
    setLoading(false);
    if (res.success) {
      setResendSuccess(true);
      setResendCooldown(60);
      setTimeout(() => setResendSuccess(false), 5000);
    } else {
      setErrors({ general: res.error || 'Не вдалося повторно надіслати лист' });
    }
  };

  const handleTabChange = (newTab: 'login' | 'register') => {
    setTab(newTab);
    setErrors({});
    setRequiresConfirmation(false);
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={closeAuthModal}>
      <DialogContent className="max-w-md border-border/80 bg-card p-6 sm:p-8">
        {/* Email Confirmation Screen */}
        {requiresConfirmation ? (
          <div className="text-center py-4 space-y-5 animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/15 text-primary border border-primary/30 shadow-lg shadow-primary/10">
              <Mail className="h-8 w-8 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Перевірте вашу пошту!
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed px-2">
                Ми надіслали лист із посиланням для активації акаунта на адресу:
              </p>
              <div className="inline-block px-3 py-1.5 rounded-lg bg-muted text-foreground font-mono text-sm font-semibold border border-border">
                {email}
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Перейдіть за посиланням у листі, щоб завершити реєстрацію, отримати <strong>+100 💎</strong> та відкрити доступ до всіх уроків.
            </p>

            {resendSuccess && (
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-600 dark:text-emerald-400">
                ✓ Лист повторно надіслано!
              </div>
            )}

            <div className="pt-2 space-y-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResend}
                disabled={resendCooldown > 0 || loading}
                className="w-full text-xs gap-1.5 h-9"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                {resendCooldown > 0
                  ? `Надіслати повторно через ${resendCooldown}с`
                  : 'Надіслати лист повторно'}
              </Button>

              <Button
                type="button"
                onClick={closeAuthModal}
                className="w-full font-semibold shadow-md shadow-primary/20 h-10"
              >
                Зрозуміло
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <DialogTitle className="text-center text-2xl font-bold">
                {tab === 'register' ? 'Приєднуйся до Frontend Camp' : 'З поверненням!'}
              </DialogTitle>
              <DialogDescription className="text-center text-sm text-muted-foreground">
                {tab === 'register'
                  ? 'Отримай повний доступ до всіх уроків та збирай кристали 💎'
                  : 'Увійди, щоб продовжити навчання з місця зупинки'}
              </DialogDescription>
            </DialogHeader>

            {/* Tab switch */}
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1 mb-6 text-sm font-medium">
              <button
                type="button"
                onClick={() => handleTabChange('register')}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 transition-all ${
                  tab === 'register'
                    ? 'bg-card text-foreground shadow-sm font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <UserPlus className="h-4 w-4" /> Реєстрація
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('login')}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 transition-all ${
                  tab === 'login'
                    ? 'bg-card text-foreground shadow-sm font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LogIn className="h-4 w-4" /> Вхід
              </button>
            </div>

            {/* General Error Banner */}
            {errors.general && (
              <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive flex items-start gap-2 animate-in fade-in-0 duration-150">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {tab === 'register' && (
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-semibold">Ваше імʼя</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      placeholder="Олексій"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
                      autoComplete="name"
                    />
                    <UserIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                  </div>
                  {errors.name && (
                    <p className="text-[0.75rem] text-destructive flex items-center gap-1 mt-1">
                      <span>•</span> {errors.name}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">Email адреса</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                    autoComplete="email"
                  />
                  <Mail className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                </div>
                {errors.email && (
                  <p className="text-[0.75rem] text-destructive flex items-center gap-1 mt-1">
                    <span>•</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold">Пароль</Label>
                  {tab === 'register' && (
                    <span className="text-[0.7rem] text-muted-foreground">мін. 6 символів</span>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      if (errors.confirmPassword && confirmPassword && e.target.value === confirmPassword) {
                        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                      }
                    }}
                    className={`pr-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    autoComplete={tab === 'register' ? 'new-password' : 'current-password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-muted-foreground/60 hover:text-foreground transition-colors p-0.5 rounded focus:outline-none"
                    aria-label={showPassword ? 'Сховати пароль' : 'Показати пароль'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[0.75rem] text-destructive flex items-center gap-1 mt-1">
                    <span>•</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password field (Register only) */}
              {tab === 'register' && (
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-semibold">Підтвердження паролю</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                      }}
                      className={`pr-10 ${errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-2.5 text-muted-foreground/60 hover:text-foreground transition-colors p-0.5 rounded focus:outline-none"
                      aria-label={showConfirmPassword ? 'Сховати пароль' : 'Показати пароль'}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[0.75rem] text-destructive flex items-center gap-1 mt-1">
                      <span>•</span> {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full h-11 text-base font-semibold shadow-md shadow-primary/20 mt-2" disabled={loading}>
                {loading
                  ? 'Обробка...'
                  : tab === 'register'
                  ? 'Зареєструватися (+100 💎)'
                  : 'Увійти'}
              </Button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-4 text-[0.75rem] text-muted-foreground border-t border-border/60 pt-4">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Безкоштовно
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Збереження прогресу
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Усі модулі
              </span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

