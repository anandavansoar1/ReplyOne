import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { cn } from '@/utils/cn';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

export const Button = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  labelClassName,
}: ButtonProps) => {
  const variants = {
    // Premium Gradient-like blue
    primary: 'bg-accent active:opacity-90 shadow-lg shadow-accent/20',
    // Glassmorphism dark card
    secondary: 'bg-card/80 border border-border active:bg-card/100',
    outline: 'bg-transparent border border-border active:bg-white/5',
    ghost: 'bg-transparent active:bg-white/5',
    danger: 'bg-accent-error active:opacity-90',
  };

  const sizes = {
    sm: 'h-10 px-4 rounded-xl',
    md: 'h-[52px] px-6 rounded-button',
    lg: 'h-16 px-8 rounded-3xl',
  };

  const labelVariants = {
    primary: 'text-white font-semibold tracking-tight',
    secondary: 'text-text-primary font-semibold tracking-tight',
    outline: 'text-text-primary font-semibold tracking-tight',
    ghost: 'text-text-secondary font-medium tracking-tight',
    danger: 'text-white font-semibold tracking-tight',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      className={cn(
        'flex-row items-center justify-center',
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-50',
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text className={cn('text-base', labelVariants[variant], labelClassName)}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
