import 'react-native-gesture-handler';
import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { useColorScheme as useTailwindColor } from 'nativewind';
import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';

export default function RootLayout() {
  const { colorScheme } = useTailwindColor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className={colorScheme === 'dark' ? 'dark' : ''} style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </ThemeProvider>
  );
}
