import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/utils/api';
import { useAuthStore } from '@/store/use-auth-store';

export interface ChatMessage {
  id: string;
  message: string;
  isOutgoing: boolean;
  timestamp: string;
}

const MOCK_MESSAGES_HISTORY: Record<string, ChatMessage[]> = {
  'msg_1': [
    { id: '1', message: 'Hi, I saw your new post!', isOutgoing: false, timestamp: '10:00 AM' },
    { id: '2', message: 'Hello Sarah! How can we help you today?', isOutgoing: true, timestamp: '10:05 AM' },
    { id: '3', message: 'Hey, I was wondering about the shipping costs for the new collection.', isOutgoing: false, timestamp: '2M AGO' },
  ],
  'msg_2': [
    { id: '1', message: 'Hi there, I placed an order last week.', isOutgoing: false, timestamp: 'Yesterday' },
    { id: '2', message: 'Let me check on that for you. What is your order number?', isOutgoing: true, timestamp: 'Yesterday' },
    { id: '3', message: 'The package arrived today! Thank you so much for the quick response.', isOutgoing: false, timestamp: '15M AGO' },
  ],
  'msg_3': [
    { id: '1', message: 'Can you help me with my subscription plan? I want to upgrade.', isOutgoing: false, timestamp: '1H AGO' },
  ],
  'comment_1': [
    { id: '1', message: 'Love this new outfit! 😍 Is it available in large?', isOutgoing: false, timestamp: '5M AGO' },
  ],
  'comment_2': [
    { id: '1', message: 'Can you share the link to these shoes?', isOutgoing: false, timestamp: '1H AGO' },
  ]
};

export const useMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // COMMENTED OUT FOR DEMO TO PREVENT CONSOLE ERRORS
      // const response = await apiFetch<{ success: boolean; data: ChatMessage[] }>(`/messages/${conversationId}`, { token });
      // if (response.success && response.data) {
      //   setMessages(response.data);
      // } else {
      //   setMessages(MOCK_MESSAGES_HISTORY[conversationId] || []);
      // }

      setMessages(MOCK_MESSAGES_HISTORY[conversationId] || []);
    } catch (err: any) {
      console.log('Error fetching messages:', err.message);
      setMessages(MOCK_MESSAGES_HISTORY[conversationId] || []);
    } finally {
      setLoading(false);
    }
  }, [conversationId, token]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Optimistic UI update
    const newMessage: ChatMessage = {
      id: `temp_${Date.now()}`,
      message: text,
      isOutgoing: true,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, newMessage]);

    try {
      setSending(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // COMMENTED OUT FOR DEMO TO PREVENT CONSOLE ERRORS
      // await apiFetch(`/messages/${conversationId}/send`, { 
      //   method: 'POST', 
      //   data: { message: text },
      //   token 
      // });
      
    } catch (err: any) {
      console.log('Error sending message:', err.message);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    loading,
    sending,
    error,
    sendMessage,
    refetch: fetchMessages,
  };
};
