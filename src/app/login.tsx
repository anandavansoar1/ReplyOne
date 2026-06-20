import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Globe, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { PremiumInput } from '@/components/ui/inputs/PremiumInput';
import { PremiumButton } from '@/components/ui/buttons/PremiumButton';
import { useAuthStore } from '@/store/use-auth-store';
import { apiFetch } from '@/utils/api';

const { width, height } = Dimensions.get('window');

// --- Background Decorations ---
const BackgroundDecor = ({ isDark }: { isDark: boolean }) => {
  return (
    <View className="absolute inset-0 bg-background overflow-hidden">
      {/* Abstract Gradient Glows */}
      <View
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: 200,
          backgroundColor: '#1E3A8A',
          opacity: isDark ? 0.25 : 0.1,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: -50,
          left: -100,
          width: 350,
          height: 350,
          borderRadius: 175,
          backgroundColor: '#3730A3',
          opacity: isDark ? 0.2 : 0.08,
        }}
      />
      <BlurView
        intensity={isDark ? 100 : 40}
        tint={isDark ? "dark" : "light"}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Particles */}
      {[...Array(15)].map((_, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: Math.random() * height,
            left: Math.random() * width,
            width: 2,
            height: 2,
            borderRadius: 1,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)',
          }}
        />
      ))}
    </View>
  );
};

export default function LoginScreen() {
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore(state => state.setAuth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setIsLoading(true);
      const data = await apiFetch<{ user: any; token: string }>('/auth/login', {
        method: 'POST',
        data: { loginIdentifier: email, password },
      });

      setAuth(data.user, data.token);
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <BackgroundDecor isDark={isDark} />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            className="px-8"
          >
            {/* Logo Section */}
            <View className="items-center mt-12 mb-10">
              <Image
                source={require('../../assets/images/icon.png')}
                className="w-16 h-16 rounded-[20px]"
                resizeMode="cover"
              />
              <Text className="text-text-primary text-2xl font-bold tracking-tighter mt-4">InboxKart</Text>
            </View>

            {/* Welcome Heading */}
            <View className="mb-10">
              <Text className="text-text-primary text-3xl font-bold tracking-tight mb-2">Welcome Back</Text>
              <Text className="text-text-secondary text-base">Sign in to manage your unified inbox</Text>
            </View>

            {/* Form Section */}
            <View>
              <PremiumInput
                label="Email Address"
                icon={Mail}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <PremiumInput
                label="Password"
                icon={Lock}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity className="self-end mb-8">
                <Text className="text-blue-500 font-semibold text-sm">Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <PremiumButton
                label="Sign In"
                icon={ArrowRight}
                onPress={handleLogin}
                containerClassName="mb-4"
                loading={isLoading}
              />

              {/* Divider */}
              <View className="flex-row items-center my-8">
                <View className="flex-1 h-[1px] bg-border" />
                <Text className="text-text-muted px-4 text-xs font-bold uppercase tracking-widest">Or continue with</Text>
                <View className="flex-1 h-[1px] bg-border" />
              </View>

              {/* Google Login */}
              <PremiumButton
                label="Google Account"
                icon={Globe}
                iconPosition="left"
                variant="glass"
                onPress={() => console.log('Google pressed')}
                containerClassName="mb-10"
              />

              {/* Signup Link */}
              <View className="flex-row justify-center items-center py-10">
                <Text className="text-text-secondary text-sm">Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                  <Text className="text-blue-500 font-bold text-sm">Create One</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
