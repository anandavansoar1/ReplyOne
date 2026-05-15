import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
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
  Bell
} from 'lucide-react-native';
import { PremiumHeader } from '@/components/ui/layout/PremiumHeader';
import { Card } from '@/components/ui/cards/Card';
import { cn } from '@/utils/cn';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';
import { FloatingNavbar } from '@/components/ui/layout/FloatingNavbar';

type NotificationType = 'comment' | 'message' | 'mention' | 'alert';
type Platform = 'instagram' | 'facebook' | 'twitter' | 'linkedin';

interface Notification {
  id: string;
  type: NotificationType;
  platform: Platform;
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
    timestamp: '2m ago',
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
    timestamp: '15m ago',
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
    timestamp: '1h ago',
    isUnread: false,
  },
  {
    id: '4',
    type: 'comment',
    platform: 'linkedin',
    user: {
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    content: 'commented on your post: "Great insights on the new API structure."',
    timestamp: '3h ago',
    isUnread: false,
  },
  {
    id: '5',
    type: 'mention',
    platform: 'twitter',
    user: {
      name: 'Marcus Thorne',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    content: 'mentioned you: "Can we get a review on this PR?"',
    timestamp: '5h ago',
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
}) => (
  <TouchableOpacity 
    onPress={onPress}
    className={cn(
      "px-5 py-2 rounded-full mr-2 border",
      active 
        ? "bg-accent border-accent" 
        : "bg-secondary border-border"
    )}
  >
    <Text className={cn(
      "text-sm font-medium",
      active ? "text-white" : "text-text-secondary"
    )}>
      {label}
    </Text>
  </TouchableOpacity>
);

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
      case 'instagram': return 'bg-pink-600';
      case 'facebook': return 'bg-blue-600';
      case 'twitter': return 'bg-sky-500';
      case 'linkedin': return 'bg-blue-700';
    }
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(500)}
      className="mb-3 px-4"
    >
      <Card 
        className={cn(
          "flex-row p-4 items-start",
          notification.isUnread && "border-accent/30 bg-accent/5"
        )}
      >
        {/* Avatar & Platform Icon */}
        <View className="relative">
          <Image 
            source={{ uri: notification.user.avatar }} 
            className="w-12 h-12 rounded-full border border-border"
          />
          <View className={cn(
            "absolute -bottom-1 -right-1 w-5 h-5 rounded-full items-center justify-center border-2 border-card",
            getPlatformColor()
          )}>
            {getPlatformIcon()}
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 ml-4">
          <View className="flex-row items-center justify-between mb-1">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-text-primary font-bold">{notification.user.name}</Text>
              <View className="opacity-60">{getTypeIcon()}</View>
            </View>
            <Text className="text-text-muted text-[10px] font-medium uppercase tracking-wider">
              {notification.timestamp}
            </Text>
          </View>
          
          <Text 
            className={cn(
              "text-sm leading-5",
              notification.isUnread ? "text-text-primary font-medium" : "text-text-secondary"
            )}
            numberOfLines={2}
          >
            {notification.content}
          </Text>

          {notification.isUnread && (
            <View className="absolute -left-1 top-2 w-1.5 h-1.5 rounded-full bg-accent" />
          )}
        </View>
      </Card>
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
        <PremiumHeader 
          title="Notifications" 
          showBack={true}
          showThemeToggle={true}
          rightComponent={
            <TouchableOpacity 
              className="flex-row items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full border border-accent/20"
              onPress={() => {}}
            >
              <Text className="text-accent text-[10px] font-bold uppercase tracking-wider">Mark all</Text>
            </TouchableOpacity>
          }
        />

        {/* Filter Tabs */}
        <View>
          <FlatList
            data={['All', 'Unread', 'Mentions', 'Alerts']}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
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
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      </SafeAreaView>
      
      <FloatingNavbar activeTab="notify" />
    </View>
  );
}
