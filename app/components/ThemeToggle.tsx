"use client";

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // On mount, initialize from localStorage or system preference
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') {
        setIsDark(stored === 'dark');
        document.documentElement.classList.toggle('dark', stored === 'dark');
        return;
      }

      // No explicit stored preference — default to dark mode
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } catch (e) {
      // ignore access errors in some sandboxed environments
    }
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    try {
      window.localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (e) {}
    document.documentElement.classList.toggle('dark', next);
  }

  return (
    <button
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
