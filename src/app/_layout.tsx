import 'react-native-gesture-handler';
import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { useColorScheme as useTailwindColor } from 'nativewind';
import { Stack } from 'expo-router';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
export default function RootLayout() {
  const { colorScheme } = useTailwindColor();
  const systemColorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className={colorScheme === 'dark' ? 'dark' : ''} style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </ThemeProvider>
  );
}
