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
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Globe, Phone, Lock, UserPlus } from 'lucide-react-native';
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

export default function SignupScreen() {
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore(state => state.setAuth);

  const handleSignup = async () => {
    if (!name || !email || !countryCode || !phone || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Frontend Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (phone.replace(/\D/g, '').length < 7) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);
      const data = await apiFetch<{ user: any; token: string }>('/auth/signup', {
        method: 'POST',
        data: { name, email, countryCode, phone, password },
      });

      setAuth(data.user, data.token);
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message || 'Unable to create account');
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
            <View className="items-center mt-12 mb-6">
              <LinearGradient
                colors={['#3B82F6', '#1E40AF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="w-16 h-16 rounded-[20px] items-center justify-center shadow-xl shadow-blue-600/40"
              >
                <View className="w-8 h-8 border-[2.5px] border-white/90 rounded-lg items-center justify-center">
                  <View className="w-3 h-3 bg-white rounded-full" />
                </View>
              </LinearGradient>
              <Text className="text-text-primary text-2xl font-bold tracking-tighter mt-4">InboxKart</Text>
            </View>

            {/* Header Section */}
            <View className="mb-8">
              <Text className="text-text-primary text-3xl font-bold tracking-tight mb-2">Create Account</Text>
              <Text className="text-text-secondary text-base">Join us and streamline your inbox</Text>
            </View>

            {/* Form Section */}
            <View>
              <PremiumInput
                label="Full Name"
                icon={User}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <PremiumInput
                label="Email Address"
                icon={Mail}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View className="flex-row justify-between mb-5">
                <View className="w-1/3 pr-2">
                  <PremiumInput
                    label="Code"
                    icon={Globe}
                    value={countryCode}
                    onChangeText={setCountryCode}
                    keyboardType="phone-pad"
                    containerClassName="mb-0"
                  />
                </View>
                <View className="flex-1 pl-2">
                  <PremiumInput
                    label="Phone Number"
                    icon={Phone}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    containerClassName="mb-0"
                  />
                </View>
              </View>

              <PremiumInput
                label="Password"
                icon={Lock}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              {/* Signup Button */}
              <PremiumButton
                label="Create Account"
                icon={UserPlus}
                onPress={handleSignup}
                containerClassName="mt-6 mb-4"
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

              {/* Login Link */}
              <View className="flex-row justify-center items-center py-6">
                <Text className="text-text-secondary text-sm">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text className="text-blue-500 font-bold text-sm">Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
