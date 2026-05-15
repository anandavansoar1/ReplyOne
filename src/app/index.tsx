import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  Search, 
  Bell, 
  MessageCircle, 
  BarChart, 
  Settings, 
  MoreHorizontal,
  Camera,
  Globe,
  Layout,
  Send,
  Activity,
  Sun,
  Moon
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { cn } from '@/utils/cn';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { FloatingNavbar } from '@/components/ui/layout/FloatingNavbar';

const { width } = Dimensions.get('window');

const FILTERS = [
  { id: 'all', label: 'All', icon: Layout },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: '#25D366' },
  { id: 'instagram', label: 'Instagram', icon: Camera, color: '#E4405F' },
  { id: 'facebook', label: 'Facebook', icon: Globe, color: '#1877F2' },
];

const CONVERSATIONS = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    message: 'Hey, I was wondering about the shipping costs for the new collection.',
    time: '2m ago',
    unread: 3,
    platform: 'instagram',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: '2',
    name: 'Michael Chen',
    message: 'The package arrived today! Thank you so much for the quick response.',
    time: '15m ago',
    unread: 0,
    platform: 'whatsapp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
  },
  {
    id: '3',
    name: 'Jessica Alba',
    message: 'Can you help me with my subscription plan? I want to upgrade.',
    time: '1h ago',
    unread: 1,
    platform: 'facebook',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
  },
  {
    id: '4',
    name: 'David Wilson',
    message: 'I would like to order 5 more of the premium sets for my team.',
    time: '3h ago',
    unread: 0,
    platform: 'instagram',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
  {
    id: '5',
    name: 'Emily Davis',
    message: 'Is there a discount for bulk orders this month?',
    time: '5h ago',
    unread: 0,
    platform: 'whatsapp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
  },
  {
    id: '6',
    name: 'Robert Brown',
    message: 'When will the new collection be available in the UK?',
    time: 'Yesterday',
    unread: 0,
    platform: 'facebook',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
  },
];

const PlatformBadge = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'instagram': return <Camera size={10} color="#FFF" />;
    case 'facebook': return <Globe size={10} color="#FFF" />;
    case 'whatsapp': return <MessageCircle size={10} color="#FFF" />;
    default: return null;
  }
};

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'instagram': return 'bg-[#E4405F]';
    case 'facebook': return 'bg-[#1877F2]';
    case 'whatsapp': return 'bg-[#25D366]';
    default: return 'bg-accent';
  }
};

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Top Section */}
        <View className="px-6 pt-2 pb-4">
          <Animated.View entering={FadeInDown.delay(100)} className="flex-row items-center justify-between mb-6">
            <View>
              <View className="flex-row items-center gap-1">
                <Text className="text-text-muted text-sm font-medium">Workspace</Text>
                <View className="w-1 h-1 rounded-full bg-text-muted" />
                <Text className="text-accent text-sm font-bold">Pro</Text>
              </View>
              <Text className="text-text-primary text-2xl font-bold tracking-tight">Hi, Anand 👋</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={toggleColorScheme}
                className="w-12 h-12 rounded-2xl bg-card border border-border items-center justify-center shadow-sm"
              >
                {colorScheme === 'dark' ? (
                  <Sun size={22} color="#FBBF24" />
                ) : (
                  <Moon size={22} color="#64748B" />
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => router.push('/notifications')}
                className="w-12 h-12 rounded-2xl bg-card border border-border items-center justify-center relative shadow-sm"
              >
                <Bell size={22} color={colorScheme === 'dark' ? '#F8FAFC' : '#0F172A'} />
                <View className="absolute top-3 right-3 w-3 h-3 bg-accent border-2 border-card rounded-full" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Search Bar */}
          <Animated.View entering={FadeInDown.delay(200)} className="flex-row items-center bg-card border border-border rounded-2xl px-4 py-3.5 mb-6 shadow-sm">
            <Search size={20} color="#94A3B8" />
            <TextInput 
              placeholder="Search conversations..." 
              className="flex-1 ml-3 text-text-primary font-medium text-base"
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity className="bg-secondary p-1.5 rounded-lg">
              <MoreHorizontal size={18} color="#94A3B8" />
            </TouchableOpacity>
          </Animated.View>

          {/* Platform Filters */}
          <Animated.View entering={FadeInDown.delay(300)}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-grow-0">
              <View className="flex-row gap-3">
                {FILTERS.map((filter, index) => (
                  <TouchableOpacity
                    key={filter.id}
                    onPress={() => setActiveFilter(filter.id)}
                    className={cn(
                      "flex-row items-center px-5 py-3 rounded-2xl border",
                      activeFilter === filter.id 
                        ? "bg-accent border-accent shadow-lg shadow-accent/20" 
                        : "bg-card border-border"
                    )}
                  >
                    <filter.icon 
                      size={18} 
                      color={activeFilter === filter.id ? "#FFF" : (filter.color || "#94A3B8")} 
                    />
                    <Text className={cn(
                      "ml-2 font-bold text-sm",
                      activeFilter === filter.id ? "text-white" : "text-text-secondary"
                    )}>
                      {filter.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        </View>

        {/* Conversation List */}
        <ScrollView 
          className="flex-1 px-6" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140, paddingTop: 10 }}
        >
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center gap-2">
              <Text className="text-text-primary text-xl font-bold">Recent Inbox</Text>
              <View className="bg-accent/10 px-2 py-0.5 rounded-full flex-row items-center gap-1">
                <View className="w-1.5 h-1.5 rounded-full bg-accent" />
                <Text className="text-accent text-[10px] font-black uppercase">Live</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className="text-text-muted font-semibold text-xs uppercase tracking-wider">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-4">
            {CONVERSATIONS.map((chat, index) => (
              <Animated.View 
                key={chat.id} 
                entering={FadeInDown.delay(400 + (index * 100))}
              >
                <TouchableOpacity 
                  activeOpacity={0.7}
                  className="bg-card border border-border rounded-[28px] p-4 flex-row items-center gap-4 shadow-sm"
                >
                  {/* Profile Image with Platform Badge */}
                  <View className="relative">
                    <View className="w-16 h-16 rounded-[22px] bg-secondary overflow-hidden border-2 border-border/10">
                      <Image
                        source={{ uri: chat.avatar }}
                        className="w-full h-full"
                      />
                    </View>
                    <View className={cn(
                      "absolute -bottom-1 -right-1 w-6 h-6 rounded-full items-center justify-center border-2 border-card",
                      getPlatformColor(chat.platform)
                    )}>
                      <PlatformBadge platform={chat.platform} />
                    </View>
                  </View>

                  {/* Content */}
                  <View className="flex-1">
                    <View className="flex-row justify-between items-center mb-1.5">
                      <Text className="text-text-primary font-bold text-base tracking-tight">{chat.name}</Text>
                      <Text className="text-text-muted text-[10px] font-medium uppercase">{chat.time}</Text>
                    </View>
                    <Text 
                      className={cn(
                        "text-sm leading-5",
                        chat.unread > 0 ? "text-text-primary font-medium" : "text-text-secondary"
                      )}
                      numberOfLines={1}
                    >
                      {chat.message}
                    </Text>
                  </View>

                  {/* Unread & Action */}
                  {chat.unread > 0 ? (
                    <View className="bg-accent px-2.5 py-1 min-w-[28px] rounded-full items-center justify-center shadow-lg shadow-accent/30">
                      <Text className="text-white text-[10px] font-black">{chat.unread}</Text>
                    </View>
                  ) : (
                    <View className="w-8 h-8 rounded-full items-center justify-center">
                      <Send size={14} color="#94A3B8" />
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </ScrollView>

        {/* Floating Bottom Navigation */}
        <FloatingNavbar activeTab="home" />
      </SafeAreaView>
    </View>
  );
}


