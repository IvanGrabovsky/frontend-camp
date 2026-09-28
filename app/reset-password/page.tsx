'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { HubLayout } from '@/components/HubLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { withBasePath } from '@/lib/paths';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { updatePassword, isAuthenticated, openAuthModal } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Check URL parameters / hash for Supabase error messages
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash.substring(1);
    const search = window.location.search.substring(1);
    const params = new URLSearchParams(hash || search);

    const errorParam = params.get('error');
    const errorDescription = params.get('error_description');

    if (errorParam || errorDescription) {
      if (errorDescription?.toLowerCase().includes('expired')) {
        setUrlError('Термін дії посилання для скидання паролю вичерпано. Будь ласка, надішліть новий запит.');
      } else {
        setUrlError(errorDescription || 'Виникла помилка авторизації за посиланням. Будь ласка, повторіть запит.');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError('Будь ласка, введіть новий пароль');
      return;
    }

    if (password.length < 6) {
      setError('Пароль має містити щонайменше 6 символів');
      return;
    }

    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    setLoading(true);

    try {
      const res = await updatePassword(password);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || 'Не вдалося оновити пароль. Спробуйте ще раз.');
      }
    } catch (err: any) {
      setError(err?.message || 'Несподівана помилка при оновленні паролю');
    } finally {
      setLoading(false);
    }
  };

  return (
    <HubLayout breadcrumb={[{ label: 'Головна', href: '/' }, { label: 'Скидання паролю' }]}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 px-4">
        <Card className="w-full max-w-md border-border/80 bg-card shadow-xl backdrop-blur-sm">
          {success ? (
            <CardContent className="p-8 text-center space-y-6 animate-in fade-in-0 zoom-in-95 duration-200">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="h-9 w-9 animate-in zoom-in-50 duration-300" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Пароль успішно змінено!
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ваш новий пароль встановлено. Тепер ви можете увійти до свого акаунта з новим паролем.
                </p>
              </div>

              <div className="pt-2 space-y-3">
                <Button
                  asChild
                  className="w-full font-semibold h-11 shadow-md shadow-primary/20 gap-2"
                >
                  <Link href={withBasePath('/')}>
                    <span>На головну до навчання</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>

                {!isAuthenticated && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openAuthModal('login')}
                    className="w-full font-semibold h-10"
                  >
                    Увійти в акаунт
                  </Button>
                )}
              </div>
            </CardContent>
          ) : (
            <>
              <CardHeader className="text-center pb-4 pt-8">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                  <KeyRound className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl font-bold">Встановлення нового паролю</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Введіть новий надійний пароль для вашого облікового запису
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 pt-0 space-y-4">
                {urlError && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-xs text-destructive flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold">Помилка посилання</p>
                      <p>{urlError}</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive flex items-start gap-2 animate-in fade-in-0">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-password" className="text-xs font-semibold">Новий пароль</Label>
                      <span className="text-[0.7rem] text-muted-foreground">мін. 6 символів</span>
                    </div>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (error) setError(null);
                        }}
                        className="pr-10"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-2.5 text-muted-foreground/60 hover:text-foreground transition-colors p-0.5 rounded focus:outline-none"
                        aria-label={showPassword ? 'Сховати пароль' : 'Показати пароль'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="confirm-new-password" className="text-xs font-semibold">Підтвердження нового паролю</Label>
                    <div className="relative">
                      <Input
                        id="confirm-new-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (error) setError(null);
                        }}
                        className="pr-10"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-2.5 text-muted-foreground/60 hover:text-foreground transition-colors p-0.5 rounded focus:outline-none"
                        aria-label={showConfirmPassword ? 'Сховати пароль' : 'Показати пароль'}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-semibold shadow-md shadow-primary/20 mt-4"
                    disabled={loading || Boolean(urlError)}
                  >
                    {loading ? 'Збереження...' : 'Зберегти новий пароль'}
                  </Button>
                </form>

                <div className="pt-2 text-center">
                  <Link
                    href={withBasePath('/')}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Повернутися на головну</span>
                  </Link>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </HubLayout>
  );
}
