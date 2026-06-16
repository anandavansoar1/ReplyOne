import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { 
  Layout, 
  MessageSquare, 
  Bell, 
  Settings,
  Plus
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

interface TabItem {
  id: string;
  icon: any;
  label: string;
  path: string;
}

export const FloatingNavbar = ({ activeTab = 'home' }: { activeTab?: string }) => {
  const router = useRouter();
  const tabs: TabItem[] = [
    { id: 'home', icon: Layout, label: 'Home', path: '/' },
    { id: 'inbox', icon: MessageSquare, label: 'Inbox', path: '/inbox' },
    { id: 'notify', icon: Bell, label: 'Alerts', path: '/notifications' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/accounts' },
  ];

  const renderTab = (tab: TabItem) => {
    const Icon = tab.icon;
    const isActive = activeTab === tab.id;
    
    return (
      <TouchableOpacity
        key={tab.id}
        activeOpacity={0.8}
        onPress={() => router.push(tab.path as any)}
        className="items-center justify-center flex-1 h-full"
      >
        <View className="relative items-center justify-center">
          {isActive && (
            <Animated.View 
              entering={FadeIn.duration(400)}
              className="absolute -inset-4 rounded-full overflow-hidden"
            >
              <LinearGradient
                colors={['rgba(37, 99, 235, 0.15)', 'transparent']}
                className="flex-1"
              />
            </Animated.View>
          )}
          
          <Icon 
            size={isActive ? 24 : 22} 
            color={isActive ? '#2563EB' : '#94A3B8'} 
            strokeWidth={isActive ? 2.5 : 1.8}
          />

          {isActive && (
            <View 
              className="absolute -bottom-3 w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]" 
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="absolute bottom-10 left-0 right-0 items-center px-6">
      <View
        className="h-[74px] w-full max-w-[440px] bg-card border border-border rounded-[32px] flex-row items-center justify-between px-2 shadow-2xl"
      >
        {tabs.slice(0, 2).map(renderTab)}
        
        {/* Central Compose Button */}
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => router.push('/compose')}
          className="relative -top-5"
        >
          <View className="w-[60px] h-[60px] rounded-full bg-accent items-center justify-center shadow-lg shadow-accent/40 border-[6px] border-background">
            <Plus size={24} color="#FFF" strokeWidth={3} />
          </View>
        </TouchableOpacity>

        {tabs.slice(2, 4).map(renderTab)}
      </View>
    </View>
  );
};
