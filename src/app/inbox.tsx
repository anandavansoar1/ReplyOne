import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';
import { Search, Filter } from 'lucide-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FloatingNavbar } from '@/components/ui/layout/FloatingNavbar';
import { useConversations } from '@/hooks/useConversations';

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
  const [activeTab, setActiveTab] = useState<'message' | 'comment'>('message');
  
  const { conversations, loading, error } = useConversations(activeTab);

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="px-6 py-6 flex-row items-center justify-between">
          <Text className="text-text-primary text-3xl font-bold tracking-tight">Inbox</Text>
          <TouchableOpacity className="w-11 h-11 rounded-2xl bg-card border border-border items-center justify-center">
            <Filter size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Tab Toggle */}
        <View className="px-6 mb-4">
          <View className="flex-row bg-card border border-border rounded-[16px] p-1 shadow-sm">
            <TouchableOpacity 
              onPress={() => setActiveTab('message')}
              className={cn(
                "flex-1 flex-row items-center justify-center py-2.5 rounded-[12px] gap-2",
                activeTab === 'message' ? "bg-accent" : "bg-transparent"
              )}
            >
              <FontAwesome5 name="comment" size={14} color={activeTab === 'message' ? "#FFF" : "#64748B"} solid={activeTab === 'message'} />
              <Text className={cn(
                "font-bold text-sm",
                activeTab === 'message' ? "text-white" : "text-text-muted"
              )}>Messages</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setActiveTab('comment')}
              className={cn(
                "flex-1 flex-row items-center justify-center py-2.5 rounded-[12px] gap-2",
                activeTab === 'comment' ? "bg-accent" : "bg-transparent"
              )}
            >
              <FontAwesome5 name="comments" size={14} color={activeTab === 'comment' ? "#FFF" : "#64748B"} solid={activeTab === 'comment'} />
              <Text className={cn(
                "font-bold text-sm",
                activeTab === 'comment' ? "text-white" : "text-text-muted"
              )}>Comments</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View className="px-6 mb-4">
          <View className="flex-row items-center bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
            <Search size={18} color="#94A3B8" />
            <TextInput 
              placeholder="Search messages..."
              placeholderTextColor="#94A3B8"
              className="flex-1 ml-3 text-text-primary font-medium text-sm"
            />
          </View>
        </View>

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0F172A" />
          </View>
        ) : (
          <ScrollView 
            className="flex-1 px-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100, gap: 12 }}
          >
            {conversations.length === 0 ? (
              <View className="items-center justify-center py-10">
                <Text className="text-text-muted text-sm">No {activeTab}s found.</Text>
              </View>
            ) : (
              conversations.map((item, index) => (
                <View 
                  key={item.id}
                >
                  <Link href={`/chat/${item.id}`} asChild>
                    <TouchableOpacity 
                      activeOpacity={0.8}
                      className="bg-card border border-border rounded-[28px] p-4 flex-row items-center gap-4 shadow-sm"
                    >
                      <View className="relative">
                      <Image source={{ uri: item.avatar }} className="w-14 h-14 rounded-full bg-secondary" />
                      {item.unread > 0 && (
                        <View className="absolute -top-1 -right-1 bg-accent w-5 h-5 rounded-full items-center justify-center border-2 border-card shadow-sm">
                          <Text className="text-white text-[10px] font-bold">{item.unread}</Text>
                        </View>
                      )}
                      <View className="absolute -bottom-1 -right-1 bg-card rounded-full p-0.5">
                        <View className={cn("w-4 h-4 rounded-full items-center justify-center", getPlatformColor(item.platform))}>
                          <PlatformIcon platform={item.platform} />
                        </View>
                      </View>
                    </View>
                    
                    <View className="flex-1">
                      <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-text-primary font-bold text-base">{item.name}</Text>
                        <Text className="text-text-muted text-[10px] font-bold">{item.time}</Text>
                      </View>
                      <View className="flex-row items-center">
                        {item.type === 'comment' && item.postThumbnail && (
                          <Image 
                            source={{ uri: item.postThumbnail }} 
                            className="w-6 h-6 rounded mr-2 bg-secondary"
                          />
                        )}
                        <Text 
                          className={cn(
                            "text-xs flex-1",
                            item.unread > 0 ? "text-text-primary font-medium" : "text-text-muted"
                          )} 
                          numberOfLines={1}
                        >
                          {item.message}
                        </Text>
                      </View>
                    </View>
                    </TouchableOpacity>
                  </Link>
                </View>
              ))
            )}
          </ScrollView>
        )}
        
        <FloatingNavbar activeTab="inbox" />
      </SafeAreaView>
    </View>
  );
}
