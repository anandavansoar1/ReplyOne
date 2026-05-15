import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MessageCircle, 
  AtSign, 
  AlertCircle, 
  Camera, 
  Globe, 
  Send, 
  User,
  Mail,
  Bell,
  ChevronRight
} from 'lucide-react-native';
import { PremiumHeader } from '@/components/ui/layout/PremiumHeader';
import { Card } from '@/components/ui/cards/Card';
import { cn } from '@/utils/cn';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';
import { FloatingNavbar } from '@/components/ui/layout/FloatingNavbar';
import { LinearGradient } from 'expo-linear-gradient';

type NotificationType = 'comment' | 'message' | 'mention' | 'alert';
type PlatformType = 'instagram' | 'facebook' | 'twitter' | 'linkedin';

interface Notification {
  id: string;
  type: NotificationType;
  platform: PlatformType;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isUnread: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'mention',
    platform: 'instagram',
    user: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    content: 'mentioned you in a comment: "This looks exactly like what we discussed! @alex"',
    timestamp: '2M AGO',
    isUnread: true,
  },
  {
    id: '2',
    type: 'message',
    platform: 'twitter',
    user: {
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    content: 'sent you a direct message',
    timestamp: '15M AGO',
    isUnread: true,
  },
  {
    id: '3',
    type: 'alert',
    platform: 'facebook',
    user: {
      name: 'System',
      avatar: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100&h=100&fit=crop',
    },
    content: 'Failed to deliver message to "Marketing Group". Tap to retry.',
    timestamp: '1H AGO',
    isUnread: false,
  },
  {
    id: '4',
    type: 'comment',
    platform: 'linkedin',
    user: {
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    },
    content: 'commented on your post: "Great insights on the new API structure."',
    timestamp: '3H AGO',
    isUnread: false,
  },
  {
    id: '5',
    type: 'mention',
    platform: 'twitter',
    user: {
      name: 'Marcus Thorne',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    },
    content: 'mentioned you: "Can we get a review on this PR?"',
    timestamp: '5H AGO',
    isUnread: false,
  },
];

const FilterTab = ({ 
  label, 
  active, 
  onPress 
}: { 
  label: string; 
  active: boolean; 
  onPress: () => void;
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity 
      onPress={onPress}
      className={cn(
        "px-6 py-2.5 rounded-full mr-3 border transition-all",
        active 
          ? (isDark ? "bg-white border-white" : "bg-[#0F172A] border-[#0F172A]") 
          : "bg-card border-border"
      )}
    >
      <Text className={cn(
        "text-sm font-bold",
        active 
          ? (isDark ? "text-black" : "text-white") 
          : "text-text-secondary"
      )}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const NotificationCard = ({ notification, index }: { notification: Notification, index: number }) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getTypeIcon = () => {
    switch (notification.type) {
      case 'comment': return <MessageCircle size={14} color="#64748B" />;
      case 'message': return <Mail size={14} color="#64748B" />;
      case 'mention': return <AtSign size={14} color="#64748B" />;
      case 'alert': return <AlertCircle size={14} color="#EF4444" />;
    }
  };

  const getPlatformIcon = () => {
    const size = 12;
    const color = "white";
    switch (notification.platform) {
      case 'instagram': return <Camera size={size} color={color} />;
      case 'facebook': return <Globe size={size} color={color} />;
      case 'twitter': return <Send size={size} color={color} />;
      case 'linkedin': return <User size={size} color={color} />;
    }
  };

  const getPlatformColor = () => {
    switch (notification.platform) {
      case 'instagram': return 'bg-[#E4405F]';
      case 'facebook': return 'bg-[#1877F2]';
      case 'twitter': return 'bg-[#1DA1F2]';
      case 'linkedin': return 'bg-[#0A66C2]';
    }
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(500)}
      className="mb-3 px-6"
    >
      <TouchableOpacity 
        activeOpacity={0.8}
        className={cn(
          "bg-card border border-border rounded-[28px] p-5 flex-row items-center gap-4",
          notification.isUnread && "bg-secondary/40 border-accent/20"
        )}
      >
        {/* Avatar & Platform Icon */}
        <View className="relative">
          <View className="w-14 h-14 rounded-2xl bg-secondary overflow-hidden border border-border/10">
            <Image 
              source={{ uri: notification.user.avatar }} 
              className="w-full h-full"
            />
          </View>
          <View className={cn(
            "absolute -bottom-1 -right-1 w-6 h-6 rounded-full items-center justify-center border-2 border-card",
            getPlatformColor()
          )}>
            {getPlatformIcon()}
          </View>
        </View>

        {/* Content */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-text-primary font-bold text-base tracking-tight">{notification.user.name}</Text>
              {notification.isUnread && (
                <View className="w-2 h-2 rounded-full bg-accent" />
              )}
            </View>
            <Text className="text-text-muted text-[10px] font-bold uppercase tracking-widest">
              {notification.timestamp}
            </Text>
          </View>
          
          <Text 
            className={cn(
              "text-[13px] leading-5",
              notification.isUnread ? "text-text-primary font-bold" : "text-text-secondary font-medium"
            )}
            numberOfLines={2}
          >
            {notification.content}
          </Text>
        </View>

        <View className="opacity-30 ml-2">
          <ChevronRight size={16} color="#64748B" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};


export default function NotificationsScreen() {
  const [filter, setFilter] = useState<'All' | 'Unread' | 'Mentions' | 'Alerts'>('All');
  
  const filteredNotifications = useMemo(() => {
    switch (filter) {
      case 'Unread': return MOCK_NOTIFICATIONS.filter(n => n.isUnread);
      case 'Mentions': return MOCK_NOTIFICATIONS.filter(n => n.type === 'mention');
      case 'Alerts': return MOCK_NOTIFICATIONS.filter(n => n.type === 'alert');
      default: return MOCK_NOTIFICATIONS;
    }
  }, [filter]);

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-6 py-6 flex-row items-center justify-between">
          <Text className="text-text-primary text-3xl font-bold tracking-tight">Notifications</Text>
          <TouchableOpacity 
            className="px-4 py-2 bg-accent/10 rounded-2xl border border-accent/20"
            onPress={() => {}}
          >
            <Text className="text-accent text-xs font-bold uppercase tracking-widest">Mark All</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View className="mb-4">
          <FlatList
            data={['All', 'Unread', 'Mentions', 'Alerts']}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            renderItem={({ item }) => (
              <FilterTab 
                label={item} 
                active={filter === item} 
                onPress={() => setFilter(item as any)} 
              />
            )}
          />
        </View>

        {/* Notifications List */}
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <NotificationCard notification={item} index={index} />
          )}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20 px-10">
              <View className="w-20 h-20 rounded-full bg-secondary items-center justify-center mb-4">
                <Bell size={32} color="#94A3B8" />
              </View>
              <Text className="text-text-primary text-lg font-bold">No notifications yet</Text>
              <Text className="text-text-secondary text-center mt-2">
                We'll let you know when something important happens across your accounts.
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 160 }}
        />
      </SafeAreaView>
      
      <FloatingNavbar activeTab="notify" />
    </View>
  );
}
