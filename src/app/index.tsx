import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
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

const { width } = Dimensions.get('window');

const FILTERS = [
  { id: 'all', label: 'All', icon: Layout, color: '#6366F1' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: '#25D366' },
  { id: 'instagram', label: 'Instagram', icon: Camera, color: '#E4405F' },
  { id: 'facebook', label: 'Facebook', icon: Globe, color: '#1877F2' },
];

const RECENT_ACTIVITY = [
  { id: '1', name: 'Sarah J.', action: 'New comment on Instagram', time: '2M AGO', platform: 'instagram' },
  { id: '2', name: 'Michael C.', action: 'Query about shipping', time: '15M AGO', platform: 'whatsapp' },
  { id: '3', name: 'System', action: 'Facebook account synced', time: '1H AGO', platform: 'facebook' },
];

const ACCOUNTS = [
  { id: '1', platform: 'Instagram', status: 'Online', color: '#E4405F', icon: Camera },
  { id: '2', platform: 'WhatsApp', status: 'Online', color: '#25D366', icon: MessageSquare },
  { id: '3', platform: 'Facebook', status: 'Offline', color: '#1877F2', icon: Globe },
];

const StatCard = ({ label, value, icon: Icon, color, trend }: any) => (
  <View className="bg-card border border-border rounded-[24px] p-5 flex-1 shadow-sm">
    <View className="flex-row items-center justify-between mb-3">
      <View className="p-2 rounded-xl bg-secondary items-center justify-center">
        <Icon size={18} color={color || "#2563EB"} />
      </View>
      {trend && (
        <View className="bg-accent-success/10 px-2 py-0.5 rounded-lg flex-row items-center">
          <ArrowUpRight size={10} color="#16A34A" />
          <Text className="text-accent-success text-[10px] font-bold ml-0.5">{trend}</Text>
        </View>
      )}
    </View>
    <Text className="text-text-muted text-[10px] font-bold uppercase tracking-widest mb-1">{label}</Text>
    <Text className="text-text-primary text-xl font-bold tracking-tight">{value}</Text>
  </View>
);

export default function DashboardScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <View className="flex-1 bg-background">
      {/* Refined Background Gradient */}
      <View className="absolute top-0 left-0 right-0 h-[450px] opacity-10">
        <LinearGradient colors={['#2563EB', '#8B5CF6', 'transparent']} className="flex-1" />
      </View>

      <SafeAreaView className="flex-1" edges={['top']}>
        {/* TOP HEADER */}
        <View className="px-6 py-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="w-12 h-12 rounded-full border-2 border-accent/20 overflow-hidden">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' }} className="w-full h-full" />
            </TouchableOpacity>
            <View>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="text-text-primary text-base font-bold">Main Workspace</Text>
                <MoreHorizontal size={14} color="#94A3B8" />
              </TouchableOpacity>
              <Text className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Enterprise Plan</Text>
            </View>
          </View>
          
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={toggleColorScheme}
              className="w-11 h-11 rounded-2xl bg-card border border-border items-center justify-center shadow-sm"
            >
              {colorScheme === 'dark' ? <Sun size={18} color="#FBBF24" /> : <Moon size={18} color="#64748B" />}
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/notifications')}
              className="w-11 h-11 rounded-2xl bg-card border border-border items-center justify-center relative shadow-sm"
            >
              <Bell size={18} color="#64748B" />
              <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent border-2 border-card rounded-full shadow-sm" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 180, paddingTop: 10 }}
        >
          {/* PREMIUM SEARCH SECTION */}
          <Animated.View entering={FadeInDown.delay(100)} className="px-6 mb-8">
            <View className="bg-card border border-border rounded-[28px] px-6 py-4.5 flex-row items-center shadow-xl shadow-black/[0.03]">
              <Search size={20} color="#64748B" />
              <TextInput 
                placeholder="Search command..." 
                placeholderTextColor="#94A3B8"
                className="flex-1 ml-3 text-text-primary font-medium text-base"
              />
              <View className="bg-secondary px-2.5 py-1.5 rounded-xl border border-border">
                <Text className="text-text-muted text-[10px] font-bold tracking-tighter">CMD + K</Text>
              </View>
            </View>
          </Animated.View>

          {/* REFINED PLATFORM FILTERS */}
          <Animated.View entering={FadeInDown.delay(200)} className="px-6 mb-8">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {FILTERS.map((filter) => (
                  <TouchableOpacity
                    key={filter.id}
                    onPress={() => setActiveFilter(filter.id)}
                    className={cn(
                      "px-6 py-3 rounded-full border flex-row items-center gap-2.5 transition-all shadow-sm",
                      activeFilter === filter.id 
                        ? (isDark ? "bg-white border-white" : "bg-[#0F172A] border-[#0F172A]")
                        : "bg-card border-border"
                    )}
                  >
                    <filter.icon 
                      size={14} 
                      color={activeFilter === filter.id 
                        ? (isDark ? "#000" : "#FFF") 
                        : (filter.color || "#94A3B8")
                      } 
                    />
                    <Text className={cn(
                      "text-sm font-bold", 
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
          <Animated.View entering={FadeInDown.delay(300)} className="px-6 mb-8">
            <LinearGradient
              colors={colorScheme === 'dark' ? ['#0F172A', '#1E293B'] : ['#1E293B', '#0F172A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-[36px] p-8 border border-white/10 shadow-2xl overflow-hidden relative"
            >
              {/* Subtle Gloss Overlay */}
              <View className="absolute top-0 left-0 right-0 h-1/2 bg-white/5" style={{ borderBottomLeftRadius: 100, borderBottomRightRadius: 100 }} />
              
              <View className="flex-row justify-between items-start mb-8 relative z-10">
                <View>
                  <View className="flex-row items-center gap-2 mb-2">
                    <View className="bg-accent/20 p-1.5 rounded-lg">
                      <Sparkles size={12} color="#60A5FA" />
                    </View>
                    <Text className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Command Center</Text>
                  </View>
                  <Text className="text-white text-5xl font-bold tracking-tighter">124</Text>
                  <Text className="text-white/40 text-[11px] mt-2 font-medium">Pending responses • 3 Active Channels</Text>
                </View>
                <View className="bg-accent/20 px-4 py-2 rounded-full border border-accent/30 flex-row items-center gap-2">
                  <View className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <Text className="text-accent text-[10px] font-black uppercase tracking-widest">Live Feed</Text>
                </View>
              </View>
              
              <View className="flex-row gap-4 relative z-10">
                <View className="flex-1 bg-white/5 rounded-3xl p-5 border border-white/10 backdrop-blur-md">
                  <Text className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">REPLIES TODAY</Text>
                  <Text className="text-white text-2xl font-bold">482</Text>
                </View>
                <View className="flex-1 bg-white/5 rounded-3xl p-5 border border-white/10 backdrop-blur-md">
                  <Text className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">ACTIVE CONVOS</Text>
                  <Text className="text-white text-2xl font-bold">12</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          <View className="px-6 mb-8 flex-row gap-4">
            <StatCard label="Response Rate" value="98.2%" icon={CheckCircle2} color="#16A34A" trend="+2.4%" />
            <StatCard label="Avg. Response" value="4m 12s" icon={Clock} color="#2563EB" trend="-12s" />
          </View>

          <Animated.View entering={FadeInDown.delay(400)} className="px-6 mb-8">
            <View className="flex-row items-center justify-between mb-5 px-2">
              <Text className="text-text-primary text-xl font-bold tracking-tight">Recent Activity</Text>
              <TouchableOpacity>
                <Text className="text-accent text-xs font-bold tracking-wide">View All</Text>
              </TouchableOpacity>
            </View>
            <View className="gap-3">
              {RECENT_ACTIVITY.map((activity) => (
                <TouchableOpacity 
                  key={activity.id}
                  onPress={() => router.push(`/chat/${activity.id}` as any)}
                  activeOpacity={0.7}
                  className="bg-card border border-border rounded-[24px] p-4 flex-row items-center gap-4"
                >
                  <View className="w-12 h-12 rounded-2xl bg-secondary items-center justify-center border border-border/10 shadow-sm">
                    {activity.platform === 'instagram' ? <Camera size={20} color="#E4405F" /> : 
                     activity.platform === 'whatsapp' ? <MessageSquare size={20} color="#25D366" /> : 
                     <Globe size={20} color="#1877F2" />}
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-0.5">
                      <Text className="text-text-primary text-base font-bold tracking-tight">{activity.name}</Text>
                      <View className="w-1 h-1 rounded-full bg-border" />
                      <Text className="text-text-muted text-[10px] font-bold tracking-widest">{activity.time}</Text>
                    </View>
                    <Text className="text-text-muted text-xs font-medium" numberOfLines={1}>{activity.action}</Text>
                  </View>
                  <View className="bg-secondary/50 p-2 rounded-xl">
                    <ChevronRight size={14} color="#64748B" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* CHANNEL STATUS */}
          <Animated.View entering={FadeInDown.delay(500)} className="mb-4">
             <Text className="text-text-primary text-xl font-bold mb-5 px-6 tracking-tight">Channel Health</Text>
             <ScrollView 
               horizontal 
               showsHorizontalScrollIndicator={false} 
               contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
             >
                {ACCOUNTS.map((account) => (
                  <View key={account.id} className="bg-card border border-border rounded-[28px] p-5 items-center w-[120px] shadow-sm">
                    <View className={cn("w-12 h-12 rounded-2xl items-center justify-center mb-3 shadow-sm", account.status === 'Online' ? "bg-accent-success/10" : "bg-secondary")}>
                      <account.icon size={22} color={account.color} />
                    </View>
                    <Text 
                      numberOfLines={2}
                      className="text-text-primary text-[11px] font-bold mb-1 text-center h-[32px]"
                    >
                      {account.platform}
                    </Text>
                    <View className="flex-row items-center">
                      <View className={cn("w-1.5 h-1.5 rounded-full mr-1.5", account.status === 'Online' ? "bg-accent-success" : "bg-text-muted")} />
                      <Text className="text-text-muted text-[9px] font-bold uppercase tracking-widest">{account.status}</Text>
                    </View>
                  </View>
                ))}
                <TouchableOpacity 
                  onPress={() => router.push('/accounts')}
                  className="bg-secondary/50 border border-dashed border-border rounded-[28px] p-5 items-center justify-center w-[100px]"
                >
                  <Plus size={24} color="#94A3B8" />
                </TouchableOpacity>
             </ScrollView>
          </Animated.View>
        </ScrollView>

        <FloatingNavbar activeTab="home" />
      </SafeAreaView>
    </View>
  );
}
