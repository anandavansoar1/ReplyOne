import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { cn } from '@/utils/cn';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  className?: string;
}

export const Input = ({
  label,
  error,
  containerClassName,
  className,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View className={cn('gap-2 w-full', containerClassName)}>
      {label && (
        <Text className="text-sm font-medium text-text-secondary ml-1">
          {label}
        </Text>
      )}
      <View
        className={cn(
          'flex-row items-center bg-secondary border border-border rounded-input px-4 h-[54px]',
          isFocused ? 'border-accent ring-2 ring-accent/20' : '',
          error ? 'border-accent-error' : '',
          className
        )}
      >
        <TextInput
          className="flex-1 text-base text-text-primary h-full"
          placeholderTextColor="#6B7280"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor="#5B8CFF"
          {...props}
        />
      </View>
      {error && (
        <Text className="text-xs text-accent-error ml-1 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
};
