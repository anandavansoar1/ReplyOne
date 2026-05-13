import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity, useColorScheme } from 'react-native';
import { BlurView } from 'expo-blur';
import { LucideIcon, Eye, EyeOff } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import { cn } from '@/utils/cn';

interface PremiumInputProps extends TextInputProps {
  label: string;
  icon: LucideIcon;
  error?: string;
  containerClassName?: string;
}
export const PremiumInput = ({ 
  label, 
  icon: Icon, 
  value = '', 
  onChangeText, 
  secureTextEntry = false,
  error,
  containerClassName,
  ...props
}: PremiumInputProps) => {
  const isDark = useColorScheme() === 'dark';
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const focusAnim = useSharedValue(0);

  useEffect(() => {
    focusAnim.value = withSpring(isFocused || (value && value.length > 0) ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [isFocused, value]);

  const labelStyle = useAnimatedStyle(() => {
    const activeColor = '#3B82F6';
    const inactiveColor = isDark ? '#64748B' : '#94A3B8';
    return {
      transform: [
        { translateY: interpolate(focusAnim.value, [0, 1], [0, -14], Extrapolation.CLAMP) },
        { scale: interpolate(focusAnim.value, [0, 1], [1, 0.75], Extrapolation.CLAMP) },
      ],
      color: interpolate(focusAnim.value, [0, 1], [0.5, 1], Extrapolation.CLAMP) > 0.8 ? activeColor : inactiveColor,
    };
  });

  return (
    <View className={cn("w-full mb-5", containerClassName)}>
      <BlurView 
        intensity={isDark ? 20 : 40}
        tint={isDark ? "dark" : "light"}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 64,
          paddingHorizontal: 16,
          borderRadius: 16,
          borderWidth: 1,
          overflow: 'hidden',
          borderColor: isFocused ? 'rgba(59, 130, 246, 0.5)' : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
          backgroundColor: isDark ? 'transparent' : 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <View className="mr-3 mt-1">
          <Icon size={20} color={isFocused ? '#3B82F6' : (isDark ? '#64748B' : '#94A3B8')} strokeWidth={1.5} />
        </View>
        
        <View className="flex-1 h-full justify-center">
          <View className="relative h-full justify-center">
            <Animated.Text 
              style={[
                { position: 'absolute', left: 0, fontWeight: '600' },
                labelStyle
              ]}
            >
              {label}
            </Animated.Text>
            <TextInput
              value={value}
              onChangeText={onChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              secureTextEntry={secureTextEntry && !showPassword}
              className="text-text-primary text-base h-full pt-5"
              placeholderTextColor="transparent"
              selectionColor="#3B82F6"
              {...props}
            />
          </View>
        </View>

        {secureTextEntry && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            className="ml-2 p-2 mt-1"
          >
            {showPassword ? (
              <EyeOff size={18} color={isDark ? "#64748B" : "#94A3B8"} />
            ) : (
              <Eye size={18} color={isDark ? "#64748B" : "#94A3B8"} />
            )}
          </TouchableOpacity>
        )}
      </BlurView>
      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1 font-medium">{error}</Text>
      )}
    </View>
  );
};
