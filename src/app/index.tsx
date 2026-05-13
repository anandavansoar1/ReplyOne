import React from 'react';
import { Redirect, router } from 'expo-router';
import { cn } from '@/utils/cn';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ListFilter, Plus, Camera, Globe, MessageCircle, Moon, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Card, CardContent } from '@/components/ui/cards/Card';
import { Input } from '@/components/ui/inputs/Input';
import { FloatingNavbar } from '@/components/ui/layout/FloatingNavbar';

// Global flag for development: force onboarding exactly once per session
let hasSeenOnboardingThisSession = false;

const CONVERSATIONS = [
  {
    id: '1',
    name: 'Alex Thompson',
    message: 'Can you check the shipping status?',
    time: '2m ago',
    unread: 3,
    platform: 'instagram',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    message: 'The new update looks amazing! Thanks.',
    time: '15m ago',
    unread: 0,
    platform: 'whatsapp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: '3',
    name: 'Marketing Team',
    message: 'Design review is scheduled for 4 PM.',
    time: '1h ago',
    unread: 1,
    platform: 'facebook',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Team',
  },
  {
    id: '4',
    name: 'David Miller',
    message: 'When is the next release?',
    time: '3h ago',
    unread: 0,
    platform: 'instagram',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'instagram': return <Camera size={14} color="#E4405F" />;
    case 'facebook': return <Globe size={14} color="#1877F2" />;
    case 'whatsapp': return <MessageCircle size={14} color="#25D366" />;
    default: return null;
  }
};

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  React.useEffect(() => {
    if (!hasSeenOnboardingThisSession) {
      hasSeenOnboardingThisSession = true;
      router.replace('/login');
    }
  }, []);

  if (!hasSeenOnboardingThisSession) {
    return <View className="flex-1 bg-background" />; // Empty view while redirecting
  }

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="px-6 py-4 flex-row items-center justify-between">
          <View>
            <Text className="text-text-muted text-xs uppercase tracking-widest font-semibold">Workspace</Text>
            <Text className="text-text-primary text-2xl font-bold tracking-tight">Unified Inbox</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={toggleColorScheme}
              className="w-10 h-10 rounded-full border border-border items-center justify-center bg-card"
            >
              {colorScheme === 'dark' ? (
                <Sun size={20} color="#FBBF24" />
              ) : (
                <Moon size={20} color="#64748B" />
              )}
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full border border-border items-center justify-center bg-card">
              <Plus size={24} color={colorScheme === 'dark' ? '#F8FAFC' : '#0F172A'} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Search & Filter */}
          <View className="flex-row gap-3 mb-8">
            <Input
              placeholder="Search messages..."
              containerClassName="flex-1"
              className="bg-card/50"
              placeholderTextColor="#6B7280"
            />
            <TouchableOpacity className="w-[54px] h-[54px] bg-card border border-border rounded-input items-center justify-center">
              <ListFilter size={20} color="#475569" />
            </TouchableOpacity>
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-4 mb-8">
            <Card className="flex-1 bg-accent/10 border-accent/20">
              <CardContent className="p-4 items-center">
                <Text className="text-accent text-2xl font-bold">24</Text>
                <Text className="text-accent/60 text-[10px] uppercase font-bold mt-1">Pending</Text>
              </CardContent>
            </Card>
            <Card className="flex-1 bg-accent-success/10 border-accent-success/20">
              <CardContent className="p-4 items-center">
                <Text className="text-accent-success text-2xl font-bold">142</Text>
                <Text className="text-accent-success/60 text-[10px] uppercase font-bold mt-1">Resolved</Text>
              </CardContent>
            </Card>
          </View>

          {/* Inbox List */}
          <Text className="text-text-secondary text-sm font-semibold mb-4 px-1">Recent Conversations</Text>

          <View className="gap-3">
            {CONVERSATIONS.map((chat) => (
              <TouchableOpacity key={chat.id} activeOpacity={0.8}>
                <Card className="bg-card/60">
                  <CardContent className="p-4 flex-row items-center gap-4">
                    {/* Avatar with Platform Indicator */}
                    <View>
                      <Image
                        source={{ uri: chat.avatar }}
                        className="w-14 h-14 rounded-2xl bg-secondary"
                      />
                      <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-background rounded-full items-center justify-center border-2 border-card">
                        <PlatformIcon platform={chat.platform} />
                      </View>
                    </View>

                    {/* Info */}
                    <View className="flex-1 gap-1">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-text-primary font-bold text-base tracking-tight">{chat.name}</Text>
                        <Text className="text-text-muted text-[10px]">{chat.time}</Text>
                      </View>
                      <Text
                        className={cn(
                          "text-sm",
                          chat.unread > 0 ? "text-text-primary font-medium" : "text-text-secondary"
                        )}
                        numberOfLines={1}
                      >
                        {chat.message}
                      </Text>
                    </View>

                    {/* Unread Badge */}
                    {chat.unread > 0 && (
                      <View className="bg-accent w-6 h-6 rounded-full items-center justify-center shadow-lg shadow-accent/40">
                        <Text className="text-white text-[10px] font-bold">{chat.unread}</Text>
                      </View>
                    )}
                  </CardContent>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <FloatingNavbar activeTab="inbox" />
    </View>
  );
}
