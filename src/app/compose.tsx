import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  X, 
  Image as ImageIcon, 
  Video, 
  Smile, 
  Hash, 
  MapPin, 
  CalendarClock,
  CheckCircle2,
  ChevronDown
} from 'lucide-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { cn } from '@/utils/cn';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: 'instagram', color: '#E4405F', account: '@sarah.boutique' },
  { id: 'facebook', name: 'Facebook', icon: 'facebook-f', color: '#1877F2', account: 'Sarah Chen Fashion' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', color: '#25D366', account: '+1 (555) 012-3456' },
];

export default function ComposeScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'facebook']);
  const [content, setContent] = useState('');

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="px-5 py-4 flex-row items-center justify-between border-b border-border bg-background/90 z-10">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-secondary"
          >
            <X size={20} color={isDark ? "#FFF" : "#0F172A"} />
          </TouchableOpacity>
          <Text className="text-text-primary text-lg font-bold tracking-tight">Create Post</Text>
          <TouchableOpacity 
            className="px-4 py-2 bg-accent rounded-full opacity-90"
          >
            <Text className="text-white text-sm font-bold">Drafts</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* Platforms Selection */}
            <View className="px-5 py-6">
              <Text className="text-text-muted text-xs font-bold uppercase tracking-widest mb-4">Post to</Text>
              <View className="gap-3">
                {PLATFORMS.map((platform, index) => {
                  const isSelected = selectedPlatforms.includes(platform.id);
                  return (
                    <View key={platform.id}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => togglePlatform(platform.id)}
                        className={cn(
                          "flex-row items-center justify-between p-4 rounded-2xl border",
                          isSelected 
                            ? "border-transparent bg-card shadow-sm" 
                            : "border-border bg-transparent"
                        )}
                      >
                        {isSelected && (
                          <LinearGradient
                            colors={[`${platform.color}15`, 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="absolute inset-0 rounded-2xl"
                          />
                        )}
                        <View className="flex-row items-center gap-4">
                          <View 
                            style={{ backgroundColor: platform.color }}
                            className="w-10 h-10 rounded-xl items-center justify-center shadow-sm"
                          >
                            <FontAwesome5 name={platform.icon as any} size={20} color="#FFF" />
                          </View>
                          <View>
                            <Text className={cn("text-base font-bold", isSelected ? "text-text-primary" : "text-text-secondary")}>
                              {platform.name}
                            </Text>
                            <Text className="text-text-muted text-xs">{platform.account}</Text>
                          </View>
                        </View>
                        
                        <View className={cn(
                          "w-6 h-6 rounded-full items-center justify-center border-2",
                          isSelected ? "bg-accent-success border-accent-success" : "border-border bg-secondary"
                        )}>
                          {isSelected && <CheckCircle2 size={14} color="#FFF" />}
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Compose Area */}
            <View className="px-5 flex-1">
              <View className="bg-card border border-border rounded-[28px] p-5 shadow-sm min-h-[250px]">
                <View className="flex-row items-center gap-3 mb-4 pb-4 border-b border-border/50">
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' }} 
                    className="w-8 h-8 rounded-full bg-secondary" 
                  />
                  <Text className="text-text-primary text-sm font-bold flex-1">Main Workspace</Text>
                  <TouchableOpacity className="flex-row items-center bg-secondary px-3 py-1.5 rounded-full gap-1">
                    <CalendarClock size={12} color="#64748B" />
                    <Text className="text-text-muted text-[10px] font-bold uppercase">Now</Text>
                    <ChevronDown size={12} color="#64748B" />
                  </TouchableOpacity>
                </View>

                <TextInput
                  placeholder="What do you want to share with your audience?"
                  placeholderTextColor="#94A3B8"
                  multiline
                  value={content}
                  onChangeText={setContent}
                  className="text-text-primary text-base font-medium flex-1 mb-4"
                  style={{ minHeight: 120, textAlignVertical: 'top' }}
                />

                <View className="flex-row items-center justify-between mt-auto pt-4">
                  <View className="flex-row gap-2">
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-secondary items-center justify-center border border-border/50">
                      <ImageIcon size={18} color="#64748B" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-secondary items-center justify-center border border-border/50">
                      <Video size={18} color="#64748B" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-secondary items-center justify-center border border-border/50">
                      <Smile size={18} color="#64748B" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-secondary items-center justify-center border border-border/50">
                      <Hash size={18} color="#64748B" />
                    </TouchableOpacity>
                  </View>
                  
                  <Text className={cn(
                    "text-xs font-bold",
                    content.length > 280 ? "text-red-500" : "text-text-muted"
                  )}>
                    {content.length}/280
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Footer Action */}
          <View className="px-5 py-4 bg-background border-t border-border">
            <TouchableOpacity 
              disabled={content.trim().length === 0 || selectedPlatforms.length === 0}
              className={cn(
                "py-4 rounded-2xl items-center justify-center shadow-lg",
                content.trim().length > 0 && selectedPlatforms.length > 0
                  ? "bg-accent shadow-accent/40" 
                  : "bg-secondary border border-border opacity-50"
              )}
            >
              <Text className={cn(
                "text-base font-bold",
                content.trim().length > 0 && selectedPlatforms.length > 0 ? "text-white" : "text-text-muted"
              )}>
                Publish Now
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
