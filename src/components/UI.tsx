import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg' }) {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
    secondary: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm',
    outline: 'border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md',
        className
      )}
      {...props}
    />
  );
}

export const Badge: React.FC<{ children: React.ReactNode, className?: string, variant?: 'default' | 'success' | 'warning' | 'info' }> = ({ children, className, variant = 'default' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    info: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}

export function ProgressBar({ progress, className }: { progress: number, className?: string }) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-slate-100', className)}>
      <div
        className="h-full bg-indigo-600 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
