import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { cn } from '@/utils/cn';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass';
}

export const Card = ({ children, className, variant = 'default', ...props }: CardProps) => {
  return (
    <View
      className={cn(
        'rounded-card border border-border overflow-hidden',
        variant === 'default' ? 'bg-card' : 'bg-card/40 backdrop-blur-md',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <View className={cn('p-6 pb-2', className)}>{children}</View>
);

export const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <Text className={cn('text-xl font-bold text-text-primary tracking-tight', className)}>{children}</Text>
);

export const CardDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <Text className={cn('text-sm text-text-secondary mt-1', className)}>{children}</Text>
);

export const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <View className={cn('p-6 pt-2', className)}>{children}</View>
);

export const CardFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <View className={cn('p-6 pt-0 mt-auto', className)}>{children}</View>
);
