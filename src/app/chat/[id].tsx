import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreVertical, Send, Paperclip, Bell } from 'lucide-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChatBubble } from '@/components/ui/chat/ChatBubble';
import { Input } from '@/components/ui/inputs/Input';
import { useMessages } from '@/hooks/useMessages';

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  
  const { messages, loading, sending, sendMessage } = useMessages(id || '');

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

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
              source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + id }} 
              className="w-10 h-10 rounded-full bg-secondary"
            />
            <View className="ml-3">
              <Text className="text-text-primary font-bold text-base tracking-tight">Customer {id}</Text>
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-accent-success mr-1.5" />
                <Text className="text-text-muted text-xs">Online • </Text>
                <View className="flex-row items-center ml-0.5">
                  <FontAwesome5 name={id?.includes('comment') ? "instagram" : "facebook"} size={10} color="#E4405F" />
                  <Text className="text-text-muted text-xs ml-1">{id?.includes('comment') ? "Instagram" : "Facebook"}</Text>
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
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0F172A" />
          </View>
        ) : (
          <ScrollView 
            ref={scrollViewRef}
            className="flex-1 px-4 py-6" 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            <Text className="text-center text-text-muted text-[10px] uppercase tracking-widest font-bold mb-8">Today</Text>
            
            {messages.length === 0 ? (
              <View className="items-center mt-10">
                <Text className="text-text-muted">No messages yet. Start the conversation!</Text>
              </View>
            ) : (
              messages.map((msg, index) => (
                <ChatBubble 
                  key={msg.id || index}
                  message={msg.message}
                  isOutgoing={msg.isOutgoing}
                  timestamp={msg.timestamp}
                />
              ))
            )}

            {sending && (
              <View className="flex-row justify-end mt-2">
                <ActivityIndicator size="small" color="#E4405F" />
              </View>
            )}

            <View className="h-4" />
          </ScrollView>
        )}

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
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Type a message..."
                  className="bg-secondary border-border h-12 rounded-[24px] px-6"
                  multiline
                  placeholderTextColor="#6B7280"
                />
              </View>

              <TouchableOpacity 
                onPress={handleSend}
                disabled={!inputText.trim() || sending}
                className="w-12 h-12 rounded-full bg-accent items-center justify-center shadow-lg shadow-accent/40"
                style={{ opacity: !inputText.trim() || sending ? 0.5 : 1 }}
              >
                <Send size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
