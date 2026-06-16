import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreVertical, Send, Paperclip, Smile, Bell } from 'lucide-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ChatBubble } from '@/components/ui/chat/ChatBubble';
import { Input } from '@/components/ui/inputs/Input';

export default function ChatScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="px-4 py-3 flex-row items-center border-b border-border bg-background/80 backdrop-blur-lg">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <ChevronLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          
          <View className="flex-row items-center flex-1 ml-2">
            <Image 
              source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }} 
              className="w-10 h-10 rounded-full bg-secondary"
            />
            <View className="ml-3">
              <Text className="text-text-primary font-bold text-base tracking-tight">Alex Thompson</Text>
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-accent-success mr-1.5" />
                <Text className="text-text-muted text-xs">Online • </Text>
                <View className="flex-row items-center ml-0.5">
                  <FontAwesome5 name="instagram" size={10} color="#E4405F" />
                  <Text className="text-text-muted text-xs ml-1">Instagram</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="flex-row items-center gap-1">
            <TouchableOpacity 
              onPress={() => router.push('/notifications')}
              className="p-2"
            >
              <Bell size={20} color="#475569" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <MoreVertical size={20} color="#475569" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView 
          className="flex-1 px-4 py-6" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Text className="text-center text-text-muted text-[10px] uppercase tracking-widest font-bold mb-8">Today, 10:42 AM</Text>
          
          <ChatBubble 
            message="Hey! I was wondering if you could help me with my order status? It hasn't updated in 2 days." 
            timestamp="10:42 AM"
          />
          <ChatBubble 
            message="I've already tried checking the website but it says 'processing'." 
            timestamp="10:43 AM"
          />
          
          <ChatBubble 
            message="Hi Alex! I'll check that for you right away. Could you please provide your order number?" 
            isOutgoing 
            timestamp="10:45 AM"
          />
          
          <ChatBubble 
            message="Sure! It's #RO-94827" 
            timestamp="10:46 AM"
          />

          <View className="h-4" />
        </ScrollView>

        {/* Footer / Input Area */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View className="px-4 py-4 border-t border-border bg-background pb-8">
            <View className="flex-row items-end gap-3">
              <TouchableOpacity className="w-12 h-12 rounded-full bg-secondary items-center justify-center border border-border">
                <Paperclip size={20} color="#475569" />
              </TouchableOpacity>
              
              <View className="flex-1">
                <Input 
                  placeholder="Type a message..."
                  className="bg-secondary border-border h-12 rounded-[24px] px-6"
                  multiline
                  placeholderTextColor="#6B7280"
                />
              </View>

              <TouchableOpacity className="w-12 h-12 rounded-full bg-accent items-center justify-center shadow-lg shadow-accent/40">
                <Send size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
