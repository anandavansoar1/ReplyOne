import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function InboxScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'message' | 'comment'>('message');
  
  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <Text>Inbox</Text>
      <TouchableOpacity onPress={() => setActiveTab('message')}>
        <Text>Messages {activeTab === 'message' ? '(Active)' : ''}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('comment')}>
        <Text>Comments {activeTab === 'comment' ? '(Active)' : ''}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
