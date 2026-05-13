import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, Sun, Moon } from 'lucide-react-native';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { cn } from '@/utils/cn';

interface PremiumHeaderProps {
  title: string;
  showBack?: boolean;
  showThemeToggle?: boolean;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  containerClassName?: string;
}

export const PremiumHeader = ({
  title,
  showBack = true,
  showThemeToggle = true,
  onBack,
  rightComponent,
  containerClassName,
}: PremiumHeaderProps) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View className={cn("px-6 py-4 flex-row items-center justify-between", containerClassName)}>
      <View className="flex-row items-center gap-4">
        {showBack && (
          <TouchableOpacity 
            onPress={handleBack}
            className="w-10 h-10 rounded-full bg-card border border-border items-center justify-center shadow-sm"
          >
            <ChevronLeft size={24} color={isDark ? '#F8FAFC' : '#0F172A'} />
          </TouchableOpacity>
        )}
        <Text className="text-text-primary text-xl font-bold tracking-tight">{title}</Text>
      </View>
      
      <View className="flex-row items-center gap-3">
        {showThemeToggle && (
          <TouchableOpacity
            onPress={toggleColorScheme}
            className="w-10 h-10 rounded-full bg-card border border-border items-center justify-center shadow-sm"
          >
            {isDark ? (
              <Sun size={20} color="#FBBF24" />
            ) : (
              <Moon size={20} color="#64748B" />
            )}
          </TouchableOpacity>
        )}
        {rightComponent && <View>{rightComponent}</View>}
        {!rightComponent && !showThemeToggle && <View className="w-10" />}
      </View>
    </View>
  );
};
