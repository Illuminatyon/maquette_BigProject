import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import './Badge.css';

interface BadgeProps {
  children: ReactNode;
  variant?: 'discount' | 'new' | 'info' | 'success';
  className?: string;
}

export function Badge({ children, variant = 'info', className }: BadgeProps) {
  return (
    <span className={cn('badge', `badge--${variant}`, className)}>
      {children}
    </span>
  );
}
