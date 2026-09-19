'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut, BookCheck, ShieldCheck, ChevronDown } from 'lucide-react';

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

  const completedCount = user.completedLessons?.length || 0;

  return (
    <div className="relative flex items-center gap-2" ref={dropdownRef}>
      {/* Completed Lessons Counter Badge */}
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors shadow-sm"
        title="Пройдено уроків. Переглянути кабінет"
      >
        <BookCheck className="w-3.5 h-3.5" />
        <span>{completedCount} уроків</span>
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
            className="w-7 h-7 rounded-full bg-primary/10 object-cover border border-primary/30"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs border border-primary/30">
            {user.name.charAt(0)}
          </div>
        )}
        <span className="text-xs sm:text-sm font-medium text-foreground max-w-[120px] truncate hidden md:inline">
          {user.name}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2.5 border-b border-border/50 mb-1">
            <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate font-mono">{user.email}</p>
          </div>

          <Link
            href="/profile"
            onClick={() => setDropdownOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-foreground hover:bg-muted/70 transition-colors"
          >
            <BookCheck className="w-4 h-4 text-primary" />
            <span>Особистий кабінет</span>
          </Link>

          <button
            onClick={() => {
              setDropdownOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-left mt-1"
          >
            <LogOut className="w-4 h-4" />
            <span>Вийти з акаунту</span>
          </button>
        </div>
      )}
    </div>
  );
}
