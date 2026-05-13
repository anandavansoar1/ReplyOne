import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Home, MessageSquare, Bell, Settings, User } from 'lucide-react-native';
import { cn } from '@/utils/cn';

export const FloatingNavbar = ({ activeTab = 'inbox' }: { activeTab?: string }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'inbox', icon: MessageSquare, label: 'Inbox' },
    { id: 'notify', icon: Bell, label: 'Alerts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <View className="absolute bottom-8 left-6 right-6 h-20 bg-card/95 border border-border rounded-[32px] flex-row items-center justify-around px-2 shadow-2xl backdrop-blur-xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            className="items-center justify-center w-14 h-14"
          >
            {isActive && (
              <View className="absolute inset-0 bg-accent/10 rounded-2xl blur-md" />
            )}
            <Icon 
              size={24} 
              color={isActive ? '#2563EB' : '#94A3B8'} 
              strokeWidth={isActive ? 2.5 : 2}
            />
            {isActive && (
              <View className="absolute -bottom-1 w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_10px_#2563EB]" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
