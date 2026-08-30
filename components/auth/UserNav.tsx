'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut, Sparkles, BookCheck, ShieldCheck, ChevronDown } from 'lucide-react';

export function UserNav() {
  const { user, isAuthenticated, isLoading, openAuthModal, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return <div className="h-9 w-20 animate-pulse rounded-lg bg-muted/50" />;
  }

  if (!isAuthenticated || !user) {
    return (
      <Button
        onClick={openAuthModal}
        size="sm"
        className="h-9 px-4 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all gap-1.5"
      >
        <User className="h-4 w-4" />
        <span>Увійти</span>
      </Button>
    );
  }

  return (
    <div className="relative flex items-center gap-2" ref={dropdownRef}>
      {/* Crystals Counter Badge */}
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-colors shadow-sm"
        title="Ваші кристали. Переглянути в кабінеті"
      >
        <span>💎</span>
        <span>{user.crystals}</span>
      </Link>

      {/* User Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full border border-border/70 bg-card hover:bg-muted/60 transition-all text-left focus:outline-none focus:ring-2 focus:ring-primary/40"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-7 h-7 rounded-full bg-primary/10 border border-border object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-xs sm:text-sm font-semibold text-foreground max-w-[100px] truncate hidden md:inline-block">
          {user.name}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-11 z-50 w-56 rounded-2xl border border-border bg-card p-2 shadow-xl animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-border/60 mb-1">
            <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-sm text-foreground/90 hover:bg-muted hover:text-foreground transition-colors"
            >
              <User className="w-4 h-4 text-primary" />
              <span>Особистий профіль</span>
            </Link>

            <Link
              href="/profile#progress"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm text-foreground/90 hover:bg-muted hover:text-foreground transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <BookCheck className="w-4 h-4 text-emerald-500" />
                <span>Пройдено уроків</span>
              </span>
              <span className="text-xs font-mono font-bold bg-muted px-2 py-0.5 rounded-full">
                {user.completedLessons.length}
              </span>
            </Link>
          </div>

          <div className="pt-1 mt-1 border-t border-border/60">
            <button
              onClick={() => {
                setDropdownOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Вийти з акаунту</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
