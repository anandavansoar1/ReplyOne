import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  Search, 
  Layout,
  MoreHorizontal,
  ChevronRight,
  Filter
} from 'lucide-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { cn } from '@/utils/cn';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FloatingNavbar } from '@/components/ui/layout/FloatingNavbar';

const CONVERSATIONS = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    message: 'Hey, I was wondering about the shipping costs for the new collection.',
    time: '2M AGO',
    unread: 3,
    platform: 'instagram',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    online: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    message: 'The package arrived today! Thank you so much for the quick response.',
    time: '15M AGO',
    unread: 0,
    platform: 'whatsapp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    online: true,
  },
  {
    id: '3',
    name: 'Jessica Alba',
    message: 'Can you help me with my subscription plan? I want to upgrade.',
    time: '1H AGO',
    unread: 1,
    platform: 'facebook',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    online: false,
  },
  {
    id: '4',
    name: 'David Wilson',
    message: 'I would like to order 5 more of the premium sets for my team.',
    time: '3H AGO',
    unread: 0,
    platform: 'instagram',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    online: true,
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'instagram': return <FontAwesome5 name="instagram" size={12} color="#FFF" />;
    case 'facebook': return <FontAwesome5 name="facebook-f" size={12} color="#FFF" />;
    case 'whatsapp': return <FontAwesome5 name="whatsapp" size={12} color="#FFF" />;
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

export default function InboxScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="px-6 py-6 flex-row items-center justify-between">
          <Text className="text-text-primary text-3xl font-bold tracking-tight">Messages</Text>
          <TouchableOpacity className="w-11 h-11 rounded-2xl bg-card border border-border items-center justify-center">
            <Filter size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="px-6 mb-6">
          <View className="bg-card border border-border rounded-[24px] px-5 py-3.5 flex-row items-center shadow-sm">
            <Search size={18} color="#94A3B8" />
            <TextInput 
              placeholder="Search conversations..."
              placeholderTextColor="#94A3B8"
              className="flex-1 ml-3 text-text-primary text-base"
            />
          </View>
        </View>

        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 160 }}
        >
          <View className="px-6 gap-3">
            {CONVERSATIONS.map((item, index) => (
              <Animated.View 
                key={item.id}
                entering={FadeInDown.delay(index * 100)}
              >
                <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={() => router.push(`/chat/${item.id}` as any)}
                  className="bg-card border border-border rounded-[28px] p-4 flex-row items-center gap-4 shadow-sm"
                >
                  <View className="relative">
                    <View className="w-14 h-14 rounded-[20px] bg-secondary overflow-hidden">
                      <Image source={{ uri: item.avatar }} className="w-full h-full" />
                    </View>
                    <View className={cn(
                      "absolute -bottom-1 -right-1 w-6 h-6 rounded-full items-center justify-center border-2 border-card",
                      getPlatformColor(item.platform)
                    )}>
                      <PlatformIcon platform={item.platform} />
                    </View>
                    {item.online && (
                      <View className="absolute top-0 right-0 w-3 h-3 bg-accent-success rounded-full border-2 border-card" />
                    )}
                  </View>

                  <View className="flex-1">
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className="text-text-primary font-bold text-base">{item.name}</Text>
                      <Text className="text-text-muted text-[10px] font-bold">{item.time}</Text>
                    </View>
                    <Text 
                      numberOfLines={1}
                      className={cn(
                        "text-sm",
                        item.unread > 0 ? "text-text-primary font-semibold" : "text-text-secondary"
                      )}
                    >
                      {item.message}
                    </Text>
                  </View>

                  {item.unread > 0 && (
                    <View className="bg-accent px-2 py-1 min-w-[22px] rounded-full items-center justify-center">
                      <Text className="text-white text-[10px] font-black">{item.unread}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </ScrollView>

        <FloatingNavbar activeTab="inbox" />
      </SafeAreaView>
    </View>
  );
}
