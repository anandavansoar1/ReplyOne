import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/utils/api';
import { useAuthStore } from '@/store/use-auth-store';

export type PlatformType = 'instagram' | 'facebook' | 'whatsapp';

export interface Conversation {
  id: string;
  name: string;
  message: string;
  time: string;
  unread: number;
  platform: PlatformType;
  avatar: string;
  online: boolean;
  type: 'message' | 'comment';
  postThumbnail?: string; // Used if type is 'comment'
}

const MOCK_MESSAGES: Conversation[] = [
  {
    id: 'msg_1',
    name: 'Sarah Jenkins',
    message: 'Hey, I was wondering about the shipping costs for the new collection.',
    time: '2M AGO',
    unread: 3,
    platform: 'instagram',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    online: true,
    type: 'message',
  },
  {
    id: 'msg_2',
    name: 'Michael Chen',
    message: 'The package arrived today! Thank you so much for the quick response.',
    time: '15M AGO',
    unread: 0,
    platform: 'facebook',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    online: true,
    type: 'message',
  },
  {
    id: 'msg_3',
    name: 'Jessica Alba',
    message: 'Can you help me with my subscription plan? I want to upgrade.',
    time: '1H AGO',
    unread: 1,
    platform: 'facebook',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    online: false,
    type: 'message',
  },
];

const MOCK_COMMENTS: Conversation[] = [
  {
    id: 'comment_1',
    name: 'David Wilson',
    message: 'Love this new outfit! 😍 Is it available in large?',
    time: '5M AGO',
    unread: 1,
    platform: 'instagram',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    online: false,
    type: 'comment',
    postThumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop',
  },
  {
    id: 'comment_2',
    name: 'Emma Stone',
    message: 'Can you share the link to these shoes?',
    time: '1H AGO',
    unread: 0,
    platform: 'facebook',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    online: true,
    type: 'comment',
    postThumbnail: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop',
  },
];

export const useConversations = (type: 'message' | 'comment' = 'message') => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuthStore();

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate network delay for realistic demo
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get mock data based on tab type
      const baseData = type === 'message' ? MOCK_MESSAGES : MOCK_COMMENTS;
      
      // Filter the mock data based on the user's actual connected accounts!
      const isIgConnected = user?.instagram?.connected;
      const isFbConnected = user?.facebook?.connected;
      
      const filteredData = baseData.filter(item => {
        if (item.platform === 'instagram' && !isIgConnected) return false;
        if (item.platform === 'facebook' && !isFbConnected) return false;
        return true;
      });

      // FAKE IT FOR THE APP REVIEW DEMO
      setConversations(filteredData);
    } catch (err: any) {
      console.log('Error fetching conversations:', err.message);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  }, [type, token, user]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    loading,
    error,
    refetch: fetchConversations,
  };
};
