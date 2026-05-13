import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/utils/cn';

interface ChatBubbleProps {
  message: string;
  isOutgoing?: boolean;
  timestamp?: string;
  className?: string;
}

export const ChatBubble = ({
  message,
  isOutgoing = false,
  timestamp,
  className,
}: ChatBubbleProps) => {
  return (
    <View
      className={cn(
        'max-w-[85%] px-5 py-3.5 mb-2',
        isOutgoing 
          ? 'bg-accent self-end rounded-chat rounded-br-none' 
          : 'bg-card self-start rounded-chat rounded-bl-none',
        className
      )}
    >
      <Text
        className={cn(
          'text-base leading-snug',
          isOutgoing ? 'text-white font-medium' : 'text-text-primary'
        )}
      >
        {message}
      </Text>
      {timestamp && (
        <Text
          className={cn(
            'text-[10px] mt-1 uppercase tracking-widest opacity-60',
            isOutgoing ? 'text-white text-right' : 'text-text-muted'
          )}
        >
          {timestamp}
        </Text>
      )}
    </View>
  );
};
