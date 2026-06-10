import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Camera, 
  Globe, 
  MessageCircle, 
  Plus, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  LogOut
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/use-auth-store';
import { useColorScheme } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { cn } from '@/utils/cn';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { apiFetch, BASE_URL } from '@/utils/api';
import { PremiumHeader } from '@/components/ui/layout/PremiumHeader';
import { FloatingNavbar } from '@/components/ui/layout/FloatingNavbar';

WebBrowser.maybeCompleteAuthSession();


const { width } = Dimensions.get('window');

const ACCOUNTS = [
  {
    id: '1',
    platform: 'Instagram',
    username: '@sarah.boutique',
    status: 'connected',
    lastSync: '2 minutes ago',
    icon: Camera,
    color: '#E4405F',
    glow: ['rgba(228, 64, 95, 0.15)', 'transparent'],
  },
  {
    id: '2',
    platform: 'Facebook',
    username: 'Sarah Chen Fashion',
    status: 'connected',
    lastSync: '1 hour ago',
    icon: Globe,
    color: '#1877F2',
    glow: ['rgba(24, 119, 242, 0.15)', 'transparent'],
  },
  {
    id: '3',
    platform: 'WhatsApp Business',
    username: '+1 (555) 012-3456',
    status: 'disconnected',
    lastSync: 'Never',
    icon: MessageCircle,
    color: '#25D366',
    glow: ['rgba(37, 211, 102, 0.15)', 'transparent'],
  },
];

export default function AccountsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { user, token, setAuth, logout } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUserProfile = async () => {
    try {
      setIsRefreshing(true);
      const data = await apiFetch<{ success: boolean; user: any }>('/auth/me', { token });
      if (data.success && data.user) {
        setAuth(data.user, token!);
      }
    } catch (error) {
      console.error('Failed to refresh profile', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const handleConnect = async (platform: string, isConnected: boolean) => {
    if (platform === 'Instagram') {
      if (isConnected) {
        Alert.alert(
          "Configure Instagram",
          "Would you like to disconnect your Instagram account?",
          [
            { text: "Cancel", style: "cancel" },
            { 
              text: "Disconnect", 
              style: "destructive", 
              onPress: async () => {
                try {
                  await apiFetch('/auth/instagram/disconnect', { method: 'POST', token });
                  await fetchUserProfile();
                } catch (err) {
                  Alert.alert("Error", "Could not disconnect Instagram");
                }
              }
            }
          ]
        );
        return;
      }

      const redirectUrl = Linking.createURL('/accounts');
      const initUrl = `/auth/instagram/login?userId=${user?.id}&frontendUrl=${encodeURIComponent(redirectUrl)}`;

      try {
        const response = await apiFetch<{ success: boolean; url: string }>(initUrl);
        if (response.success && response.url) {
          const result = await WebBrowser.openAuthSessionAsync(response.url, redirectUrl);
          if (result.type === 'success' && result.url) {
            if (result.url.includes('instagram=connected')) {
              await fetchUserProfile();
              Alert.alert("Success", "Instagram connected successfully!");
            } else if (result.url.includes('instagram=error')) {
              // Extract the reason parameter from the URL if it exists
              let reason = "Unknown error";
              try {
                const match = result.url.match(/reason=([^&]+)/);
                if (match && match[1]) {
                  reason = decodeURIComponent(match[1]);
                }
              } catch (e) {}
              
              Alert.alert("Connection Failed", `Unable to complete Instagram connection. Reason: ${reason}`);
            }
          }
        }
      } catch (err) {
        console.error("Browser Auth Error:", err);
      }
    } else {
      Alert.alert("Coming Soon", `${platform} connection will be available soon.`);
    }
  };

  const dynamicAccounts = ACCOUNTS.map(acc => {
    if (acc.platform === 'Instagram') {
      const isConnected = user?.instagram?.connected;
      return {
        ...acc,
        status: isConnected ? 'connected' : 'disconnected',
        username: isConnected ? 'Connected Account' : 'Not Connected',
        lastSync: isConnected ? 'Just now' : 'Never',
      };
    }
    return acc;
  });

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        <PremiumHeader title="Social Accounts" />

        <ScrollView 
          className="flex-1 px-6" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 220, paddingTop: 20 }}
        >
          <View className="mb-8">
            <Text className="text-text-muted text-sm font-medium mb-1 uppercase tracking-widest">Channel Management</Text>
            <Text className="text-text-primary text-3xl font-bold tracking-tight">Connected Platforms</Text>
          </View>

          <View className="gap-6">
            {dynamicAccounts.map((account, index) => (
              <Animated.View 
                key={account.id}
                entering={FadeInDown.delay(index * 150)}
                className="relative"
              >
                {/* Glow Effect */}
                <LinearGradient
                  colors={account.glow as any}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: -20,
                    bottom: -20,
                    borderRadius: 40,
                    opacity: isDark ? 0.6 : 0.3,
                  }}
                />
                
                <BlurView
                  intensity={isDark ? 20 : 40}
                  tint={isDark ? 'dark' : 'light'}
                  className="rounded-[32px] border border-border overflow-hidden bg-card/50 p-6 shadow-xl shadow-black/5"
                >
                  <View className="flex-row items-center justify-between mb-6">
                    <View className="flex-row items-center gap-4">
                      <View 
                        style={{ backgroundColor: account.color }}
                        className="w-14 h-14 rounded-2xl items-center justify-center shadow-lg shadow-black/10"
                      >
                        <account.icon size={28} color="#FFF" />
                      </View>
                      <View>
                        <Text className="text-text-primary text-xl font-bold">{account.platform}</Text>
                        <Text className="text-text-muted text-sm font-medium">{account.username}</Text>
                      </View>
                    </View>
                    <View className={cn(
                      "px-3 py-1 rounded-full flex-row items-center gap-1.5",
                      account.status === 'connected' ? "bg-accent-success/10" : "bg-secondary"
                    )}>
                      {account.status === 'connected' ? (
                        <CheckCircle size={12} color="#16A34A" />
                      ) : (
                        <AlertCircle size={12} color="#94A3B8" />
                      )}
                      <Text className={cn(
                        "text-[10px] font-bold uppercase tracking-wider",
                        account.status === 'connected' ? "text-accent-success" : "text-text-muted"
                      )}>
                        {account.status}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between mt-auto">
                    <View className="flex-row items-center gap-2">
                      <RefreshCw size={12} color={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"} />
                      <Text className="text-text-muted text-xs font-medium">
                        Last sync: {account.lastSync}
                      </Text>
                    </View>
                    <TouchableOpacity 
                      onPress={() => handleConnect(account.platform, account.status === 'connected')}
                      className={cn(
                        "px-6 py-2.5 rounded-xl border items-center justify-center shadow-sm",
                        account.status === 'connected' 
                          ? "border-border bg-card" 
                          : (isDark ? "bg-white border-white" : "bg-[#0F172A] border-[#0F172A]")
                      )}
                    >
                      <Text className={cn(
                        "text-sm font-bold",
                        account.status === 'connected' 
                          ? "text-text-primary" 
                          : (isDark ? "text-black" : "text-white")
                      )}>
                        {account.status === 'connected' ? 'Configure' : 'Connect'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </Animated.View>
            ))}

            {/* Redesigned Connect New Account Card */}
            <Animated.View 
              entering={FadeInDown.delay(ACCOUNTS.length * 150)}
              className="mt-2"
            >
              <TouchableOpacity 
                activeOpacity={0.8}
                className="rounded-[32px] border-2 border-dashed border-border p-8 items-center justify-center bg-secondary/10 gap-3"
              >
                <View className="w-12 h-12 rounded-full bg-accent items-center justify-center shadow-lg shadow-accent/20">
                  <Plus size={24} color="#FFF" />
                </View>
                <View className="items-center">
                  <Text className="text-text-primary text-lg font-bold">Connect New Account</Text>
                  <Text className="text-text-muted text-xs">Add Instagram, WhatsApp or Facebook</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Minimal Logout Link */}
            <TouchableOpacity 
              onPress={() => {
                logout();
                router.replace('/login');
              }}
              activeOpacity={0.7}
              className="mt-8 mb-12 flex-row items-center justify-center gap-2"
            >
              <LogOut size={16} color="#EF4444" />
              <Text className="text-red-500 text-sm font-bold uppercase tracking-widest">Logout Session</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      
      <FloatingNavbar activeTab="settings" />
    </View>
  );
}
