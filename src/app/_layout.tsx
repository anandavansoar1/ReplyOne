import 'react-native-gesture-handler';
import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useColorScheme as useTailwindColor } from 'nativewind';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/use-auth-store';

export default function RootLayout() {
  const { colorScheme } = useTailwindColor();
  const [mounted, setMounted] = useState(false);
  const segments = useSegments();
  const router = useRouter();
  
  const { isLoggedIn, hasCompletedOnboarding } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'signup';
    const inOnboarding = segments[0] === 'onboarding';

    if (!hasCompletedOnboarding && !inOnboarding) {
      // Redirect to onboarding if not completed
      router.replace('/onboarding');
    } else if (hasCompletedOnboarding && !isLoggedIn && !inAuthGroup) {
      // Redirect to login if not logged in
      router.replace('/login');
    } else if (isLoggedIn && (inAuthGroup || inOnboarding)) {
      // Redirect to home if logged in but on login/onboarding page
      router.replace('/');
    }
  }, [hasCompletedOnboarding, isLoggedIn, segments, mounted]);

  if (!mounted) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className={colorScheme === 'dark' ? 'dark' : ''} style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="accounts" options={{ presentation: 'modal' }} />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="compose" options={{ presentation: 'modal' }} />
          <Stack.Screen name="inbox" />
          <Stack.Screen name="chat/[id]" />
        </Stack>
      </View>
    </ThemeProvider>
  );
}
