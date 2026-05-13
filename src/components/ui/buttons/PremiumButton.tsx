import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { LucideIcon } from 'lucide-react-native';
import { cn } from '@/utils/cn';

interface PremiumButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'gradient' | 'glass';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
}

export const PremiumButton = ({
  label,
  onPress,
  variant = 'gradient',
  icon: Icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  className,
  containerClassName,
}: PremiumButtonProps) => {
  const isDark = useColorScheme() === 'dark';
  const content = (
    <View className={cn("flex-row items-center justify-center h-full px-6", className)}>
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <View className="mr-2">
              <Icon size={20} color={variant === 'gradient' ? "white" : (isDark ? "white" : "#0F172A")} />
            </View>
          )}
          <Text className={cn("text-lg font-bold", variant === 'gradient' ? "text-white" : "text-text-primary")}>
            {label}
          </Text>
          {Icon && iconPosition === 'right' && (
            <View className="ml-2">
              <Icon size={20} color={variant === 'gradient' ? "white" : (isDark ? "white" : "#0F172A")} />
            </View>
          )}
        </>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      className={cn("h-[52px] w-full overflow-hidden rounded-[18px]", containerClassName, (disabled || loading) && "opacity-50")}
    >
      {variant === 'gradient' ? (
        <LinearGradient
          colors={['#3B82F6', '#1D4ED8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex-1"
        >
          {content}
        </LinearGradient>
      ) : (
        <BlurView 
          intensity={isDark ? 30 : 50} 
          tint={isDark ? "dark" : "light"} 
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
          }}
        >
          {content}
        </BlurView>
      )}
    </TouchableOpacity>
  );
};
