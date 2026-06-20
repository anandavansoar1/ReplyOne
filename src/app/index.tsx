import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/use-auth-store';
import {
  Search,
  Bell,
  MessageSquare,
  Settings,
  MoreHorizontal,
  Camera,
  Globe,
  Layout,
  Sun,
  Moon,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
  Plus,
  ArrowUpRight
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { cn } from '@/utils/cn';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FloatingNavbar } from '@/components/ui/layout/FloatingNavbar';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FILTERS = [
  { id: 'all', label: 'All', icon: Layout, color: '#6366F1' },
  { id: 'whatsapp', label: 'WhatsApp', isBrand: true, icon: 'whatsapp', color: '#25D366' },
  { id: 'instagram', label: 'Instagram', isBrand: true, icon: 'instagram', color: '#E4405F' },
  { id: 'facebook', label: 'Facebook', isBrand: true, icon: 'facebook-f', color: '#1877F2' },
];

const RECENT_ACTIVITY = [
  { id: '1', name: 'Sarah J.', action: 'New comment on Instagram', time: '2M AGO', platform: 'instagram' },
  { id: '2', name: 'Michael C.', action: 'Query about shipping', time: '15M AGO', platform: 'whatsapp' },
  { id: '3', name: 'System', action: 'Facebook account synced', time: '1H AGO', platform: 'facebook' },
];

// ACCOUNTS will be dynamically generated inside the component

const ACCOUNTS = [
  { id: '1', platform: 'Instagram', status: 'Offline', color: '#E4405F', icon: 'instagram', isBrand: true },
  { id: '2', platform: 'WhatsApp', status: 'Offline', color: '#25D366', icon: 'whatsapp', isBrand: true },
  { id: '3', platform: 'Facebook', status: 'Offline', color: '#1877F2', icon: 'facebook-f', isBrand: true },
];

const StatCard = ({ label, value, icon: Icon, color, trend }: any) => (
  <View className="bg-card border border-border rounded-[20px] p-4 flex-1 shadow-sm">
    <View className="flex-row items-center justify-between mb-2">
      <View className="p-2 rounded-xl bg-secondary items-center justify-center">
        <Icon size={16} color={color || "#2563EB"} />
      </View>
      {trend && (
        <View className="bg-accent-success/10 px-2 py-0.5 rounded-lg flex-row items-center">
          <ArrowUpRight size={10} color="#16A34A" />
          <Text className="text-accent-success text-[10px] font-bold ml-0.5">{trend}</Text>
        </View>
      )}
    </View>
    <Text className="text-text-muted text-[9px] font-bold uppercase tracking-widest mb-1">{label}</Text>
    <Text className="text-text-primary text-lg font-bold tracking-tight">{value}</Text>
  </View>
);

export default function DashboardScreen() {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeFilter, setActiveFilter] = useState('all');
  const { user } = useAuthStore();

  const dynamicAccounts = ACCOUNTS.filter(acc => {
    if (acc.platform === 'Instagram' && !user?.instagram?.connected) return false;
    if (acc.platform === 'Facebook' && !user?.facebook?.connected) return false;
    return true;
  }).map(acc => ({
    ...acc,
    status: 'Online'
  }));

  const activeChannelsCount = dynamicAccounts.length;
  // Calculate stats based ONLY on connected social accounts
  const connectedSocials = (user?.instagram?.connected ? 1 : 0) + (user?.facebook?.connected ? 1 : 0);
  const pendingResponses = connectedSocials === 0 ? 0 : 41 * connectedSocials;
  const repliesToday = connectedSocials === 0 ? 0 : 160 * connectedSocials;
  const activeConvos = connectedSocials === 0 ? 0 : 4 * connectedSocials;
  
  const responseRate = connectedSocials === 0 ? "0%" : "98.2%";
  const responseTrend = connectedSocials === 0 ? null : "+2.4%";
  
  const avgResponse = connectedSocials === 0 ? "0s" : "4m 12s";
  const avgTrend = connectedSocials === 0 ? null : "-12s";

  return (
    <View className="flex-1 bg-background">
      {/* Refined Background Gradient */}
      <View className="absolute top-0 left-0 right-0 h-[450px] opacity-10">
        <LinearGradient colors={['#2563EB', '#8B5CF6', 'transparent']} className="flex-1" />
      </View>

      <SafeAreaView className="flex-1" edges={['top']}>
        {/* TOP HEADER */}
        <View className="px-4 py-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="w-10 h-10 rounded-full border-2 border-accent/20 overflow-hidden">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' }} className="w-full h-full" />
            </TouchableOpacity>
            <View>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="text-text-primary text-sm font-bold">Main Workspace</Text>
                <MoreHorizontal size={14} color="#94A3B8" />
              </TouchableOpacity>
              <Text className="text-text-muted text-[9px] font-bold uppercase tracking-widest">Enterprise Plan</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={toggleColorScheme}
              className="w-10 h-10 rounded-xl bg-card border border-border items-center justify-center shadow-sm"
            >
              {colorScheme === 'dark' ? <Sun size={16} color="#FBBF24" /> : <Moon size={16} color="#64748B" />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/notifications')}
              className="w-10 h-10 rounded-xl bg-card border border-border items-center justify-center relative shadow-sm"
            >
              <Bell size={16} color="#64748B" />
              <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent border-2 border-card rounded-full shadow-sm" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 4 }}
        >
          {/* PREMIUM SEARCH SECTION */}
          {/* <Animated.View entering={FadeInDown.delay(100)} className="px-4 mb-4">
            <View className="bg-card border border-border rounded-[24px] px-5 py-3 flex-row items-center shadow-sm">
              <Search size={18} color="#64748B" />
              <TextInput
                placeholder="Search command..."
                placeholderTextColor="#94A3B8"
                className="flex-1 ml-3 text-text-primary font-medium text-sm"
              />
              <View className="bg-secondary px-2 py-1 rounded-lg border border-border">
                <Text className="text-text-muted text-[9px] font-bold tracking-tighter">CMD + K</Text>
              </View>
            </View>
          </Animated.View> */}

          {/* QUICK POST ENTRY */}
          <Animated.View entering={FadeInDown.delay(150)} className="px-4 mb-5">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/compose')}
              className="bg-card border border-border rounded-[24px] p-4 flex-row items-center justify-between shadow-sm"
            >
              <View className="flex-row items-center gap-3 flex-1">
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' }}
                  className="w-10 h-10 rounded-full border border-border"
                />
                <View>
                  <Text className="text-text-primary text-sm font-bold">Create Post</Text>
                  <Text className="text-text-muted text-xs">Share to all platforms...</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-1.5">
                {user?.instagram?.connected && (
                  <View className="w-8 h-8 rounded-full bg-secondary items-center justify-center">
                    <FontAwesome5 name="instagram" size={14} color="#E4405F" />
                  </View>
                )}
                {user?.facebook?.connected && (
                  <View className="w-8 h-8 rounded-full bg-secondary items-center justify-center">
                    <FontAwesome5 name="facebook-f" size={12} color="#1877F2" />
                  </View>
                )}
                <View className="w-8 h-8 rounded-full bg-secondary items-center justify-center">
                  <FontAwesome5 name="whatsapp" size={14} color="#25D366" />
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* REFINED PLATFORM FILTERS */}
          <Animated.View entering={FadeInDown.delay(200)} className="px-4 mb-5">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {FILTERS.filter(f => {
                  if (f.id === 'instagram' && !user?.instagram?.connected) return false;
                  if (f.id === 'facebook' && !user?.facebook?.connected) return false;
                  return true;
                }).map((filter) => (
                  <TouchableOpacity
                    key={filter.id}
                    onPress={() => setActiveFilter(filter.id)}
                    className={cn(
                      "px-4 py-2.5 rounded-full border flex-row items-center gap-2 transition-all shadow-sm",
                      activeFilter === filter.id
                        ? (isDark ? "bg-white border-white" : "bg-[#0F172A] border-[#0F172A]")
                        : "bg-card border-border"
                    )}
                  >
                    {filter.isBrand ? (
                      <FontAwesome5
                        name={filter.icon as any}
                        size={12}
                        color={activeFilter === filter.id
                          ? (isDark ? "#000" : "#FFF")
                          : (filter.color || "#94A3B8")
                        }
                      />
                    ) : (
                      <filter.icon
                        size={12}
                        color={activeFilter === filter.id
                          ? (isDark ? "#000" : "#FFF")
                          : (filter.color || "#94A3B8")
                        }
                      />
                    )}
                    <Text className={cn(
                      "text-xs font-bold",
                      activeFilter === filter.id
                        ? "text-white dark:text-black"
                        : "text-text-secondary"
                    )}>
                      {filter.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>

          {/* ENHANCED HERO CARD */}
          <Animated.View entering={FadeInDown.delay(300)} className="px-4 mb-5">
            <LinearGradient
              colors={colorScheme === 'dark' ? ['#0F172A', '#1E293B'] : ['#1E293B', '#0F172A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-[28px] p-5 shadow-xl overflow-hidden relative"
            >
              {/* Subtle top glow instead of curved gloss */}
              <View className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />

              <View className="flex-row justify-between items-start mb-6 relative z-10">
                <View>
                  <View className="flex-row items-center gap-1.5 mb-1.5">
                    <View className="bg-accent/20 p-1 rounded-md">
                      <Sparkles size={10} color="#60A5FA" />
                    </View>
                    <Text className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Command Center</Text>
                  </View>
                  <Text className="text-white text-4xl font-bold tracking-tight">{pendingResponses}</Text>
                  <Text className="text-white/50 text-[11px] mt-1 font-medium">Pending responses • {activeChannelsCount} Active Channels</Text>
                </View>
                <View className="bg-accent/20 px-3 py-1.5 rounded-full border border-accent/30 flex-row items-center gap-1.5 mt-1">
                  <View className={cn("w-1.5 h-1.5 rounded-full", connectedSocials > 0 ? "bg-accent animate-pulse" : "bg-white/30")} />
                  <Text className={cn("text-[9px] font-black uppercase tracking-widest", connectedSocials > 0 ? "text-accent" : "text-white/30")}>Live Feed</Text>
                </View>
              </View>

              <View className="flex-row gap-3 relative z-10">
                <View className="flex-1 bg-white/10 rounded-[20px] p-4 border border-white/5">
                  <Text className="text-white/60 text-[9px] font-black uppercase tracking-widest mb-1.5">REPLIES TODAY</Text>
                  <Text className="text-white text-2xl font-bold">{repliesToday}</Text>
                </View>
                <View className="flex-1 bg-white/10 rounded-[20px] p-4 border border-white/5">
                  <Text className="text-white/60 text-[9px] font-black uppercase tracking-widest mb-1.5">ACTIVE CONVOS</Text>
                  <Text className="text-white text-2xl font-bold">{activeConvos}</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          <View className="px-4 mb-5 flex-row gap-3">
            <StatCard label="Response Rate" value={responseRate} icon={CheckCircle2} color="#16A34A" trend={responseTrend} />
            <StatCard label="Avg. Response" value={avgResponse} icon={Clock} color="#2563EB" trend={avgTrend} />
          </View>

          <Animated.View entering={FadeInDown.delay(400)} className="px-4 mb-5">
            <View className="flex-row items-center justify-between mb-3 px-1">
              <Text className="text-text-primary text-lg font-bold tracking-tight">Recent Activity</Text>
              <TouchableOpacity>
                <Text className="text-accent text-[11px] font-bold tracking-wide">View All</Text>
              </TouchableOpacity>
            </View>
            <View className="gap-2.5">
              {RECENT_ACTIVITY.filter(activity => {
                if (activity.platform === 'instagram' && !user?.instagram?.connected) return false;
                if (activity.platform === 'facebook' && !user?.facebook?.connected) return false;
                return true;
              }).map((activity) => (
                <TouchableOpacity
                  key={activity.id}
                  onPress={() => router.push(`/chat/${activity.id}` as any)}
                  activeOpacity={0.7}
                  className="bg-card border border-border rounded-[20px] p-3 flex-row items-center gap-3"
                >
                  <View className="w-10 h-10 rounded-xl bg-secondary items-center justify-center border border-border/10 shadow-sm">
                    {activity.platform === 'instagram' ? <FontAwesome5 name="instagram" size={18} color="#E4405F" /> :
                      activity.platform === 'whatsapp' ? <FontAwesome5 name="whatsapp" size={18} color="#25D366" /> :
                        <FontAwesome5 name="facebook-f" size={18} color="#1877F2" />}
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-0.5">
                      <Text className="text-text-primary text-sm font-bold tracking-tight">{activity.name}</Text>
                      <View className="w-1 h-1 rounded-full bg-border" />
                      <Text className="text-text-muted text-[9px] font-bold tracking-widest">{activity.time}</Text>
                    </View>
                    <Text className="text-text-muted text-[11px] font-medium" numberOfLines={1}>{activity.action}</Text>
                  </View>
                  <View className="bg-secondary/50 p-1.5 rounded-lg">
                    <ChevronRight size={14} color="#64748B" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* CHANNEL STATUS */}
          <Animated.View entering={FadeInDown.delay(500)} className="mb-4">
            <Text className="text-text-primary text-lg font-bold mb-3 px-4 tracking-tight">Channel Health</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
            >
              {dynamicAccounts.map((account) => (
                <View key={account.id} className="bg-card border border-border rounded-[20px] p-2.5 pr-5 flex-row items-center shadow-sm">
                  <View className={cn("w-9 h-9 rounded-xl items-center justify-center mr-3", account.status === 'Online' ? "bg-accent-success/10" : "bg-secondary")}>
                    {account.isBrand ? (
                      <FontAwesome5 name={account.icon as any} size={16} color={account.color} />
                    ) : (
                      <account.icon size={16} color={account.color} />
                    )}
                  </View>
                  <View>
                    <Text
                      numberOfLines={1}
                      className="text-text-primary text-[12px] font-bold mb-0.5"
                    >
                      {account.platform}
                    </Text>
                    <View className="flex-row items-center">
                      <View className={cn("w-1.5 h-1.5 rounded-full mr-1.5", account.status === 'Online' ? "bg-accent-success" : "bg-text-muted")} />
                      <Text className="text-text-muted text-[9px] font-bold uppercase tracking-widest">{account.status}</Text>
                    </View>
                  </View>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => router.push('/accounts')}
                className="bg-secondary/50 border border-dashed border-border rounded-[20px] p-2.5 px-4 items-center justify-center flex-row gap-2"
              >
                <Plus size={16} color="#94A3B8" />
                <Text className="text-text-muted text-[11px] font-bold">Add</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </ScrollView>

        <FloatingNavbar activeTab="home" />
      </SafeAreaView>
    </View>
  );
}
