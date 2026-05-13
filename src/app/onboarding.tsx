import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Camera, Globe, MessageCircle, Bell, Zap, TrendingUp, Users } from 'lucide-react-native';
import { Button } from '@/components/ui/buttons/Button';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: 'step-1',
    title: 'Manage All Social Messages Together',
    subtitle: 'Stop switching between apps. Connect Instagram, Facebook, and WhatsApp in a single unified inbox.',
  },
  {
    id: 'step-2',
    title: 'Reply Faster',
    subtitle: 'Never miss a customer message again with instant real-time notifications and AI-assisted replies.',
  },
  {
    id: 'step-3',
    title: 'Grow Your Business',
    subtitle: 'Track engagement, analyze your response times, and scale your customer support effortlessly.',
  },
];

// --- Visual Components for each slide ---

const VisualStep1 = ({ scrollX }: { scrollX: Animated.SharedValue<number> }) => {
  const style1 = useAnimatedStyle(() => {
    const translateY = interpolate(scrollX.value, [0, width], [0, 50], Extrapolation.CLAMP);
    const translateX = interpolate(scrollX.value, [0, width], [0, 50], Extrapolation.CLAMP);
    return { transform: [{ translateY }, { translateX }] };
  });

  const style2 = useAnimatedStyle(() => {
    const scale = interpolate(scrollX.value, [0, width], [1, 0.8], Extrapolation.CLAMP);
    return { transform: [{ scale }] };
  });

  const style3 = useAnimatedStyle(() => {
    const translateY = interpolate(scrollX.value, [0, width], [0, -50], Extrapolation.CLAMP);
    const translateX = interpolate(scrollX.value, [0, width], [0, -50], Extrapolation.CLAMP);
    return { transform: [{ translateY }, { translateX }] };
  });

  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-64 h-64 items-center justify-center">
        {/* Instagram Card */}
        <Animated.View style={style1} className="absolute top-4 left-4 w-20 h-20 bg-card border border-border rounded-2xl items-center justify-center shadow-lg shadow-black/5 z-10">
          <View className="w-10 h-10 rounded-full bg-[#E4405F]/10 items-center justify-center">
            <Camera size={20} color="#E4405F" />
          </View>
        </Animated.View>
        
        {/* Main Central Inbox */}
        <Animated.View style={style2} className="absolute w-28 h-28 bg-card border border-accent/20 rounded-[32px] items-center justify-center shadow-2xl shadow-accent/20 z-20">
          <MessageCircle size={36} color="#2563EB" strokeWidth={1.5} />
        </Animated.View>

        {/* WhatsApp Card */}
        <Animated.View style={style3} className="absolute bottom-4 right-4 w-20 h-20 bg-card border border-border rounded-2xl items-center justify-center shadow-lg shadow-black/5 z-10">
          <View className="w-10 h-10 rounded-full bg-[#25D366]/10 items-center justify-center">
            <MessageCircle size={20} color="#25D366" />
          </View>
        </Animated.View>
        
        {/* Facebook Card */}
        <Animated.View className="absolute bottom-10 left-0 w-16 h-16 bg-card border border-border rounded-2xl items-center justify-center shadow-lg shadow-black/5 z-0">
          <View className="w-8 h-8 rounded-full bg-[#1877F2]/10 items-center justify-center">
            <Globe size={16} color="#1877F2" />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const VisualStep2 = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-72 h-72 bg-card border border-border rounded-[40px] p-4 shadow-xl shadow-black/5">
        {/* Header mock */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="w-24 h-4 rounded-full bg-secondary" />
          <View className="w-8 h-8 rounded-full bg-accent/10 items-center justify-center">
            <Bell size={14} color="#2563EB" />
          </View>
        </View>

        {/* Notification Cards */}
        <View className="space-y-3 gap-3">
          <View className="flex-row items-center p-3 bg-background border border-border rounded-2xl shadow-sm shadow-black/5">
            <View className="w-10 h-10 rounded-full bg-secondary mr-3" />
            <View className="flex-1">
              <View className="w-1/2 h-3 rounded-full bg-secondary mb-2" />
              <View className="w-3/4 h-2 rounded-full bg-secondary/50" />
            </View>
            <View className="w-2 h-2 rounded-full bg-accent" />
          </View>

          <View className="flex-row items-center p-3 bg-background border border-border rounded-2xl opacity-70">
            <View className="w-10 h-10 rounded-full bg-secondary mr-3" />
            <View className="flex-1">
              <View className="w-1/3 h-3 rounded-full bg-secondary mb-2" />
              <View className="w-2/3 h-2 rounded-full bg-secondary/50" />
            </View>
          </View>

          <View className="absolute top-1/2 left-1/2 -ml-6 -mt-6 w-12 h-12 bg-accent rounded-full items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] border-2 border-background z-10">
            <Zap size={20} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </View>
  );
};

const VisualStep3 = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-72 h-72 bg-card border border-border rounded-[40px] p-5 justify-between shadow-xl shadow-black/5">
        <View className="flex-row justify-between items-end h-32 mb-6">
          <View className="w-8 h-12 bg-accent/10 rounded-t-lg" />
          <View className="w-8 h-20 bg-accent/20 rounded-t-lg" />
          <View className="w-8 h-16 bg-accent/15 rounded-t-lg" />
          <View className="w-8 h-28 bg-accent rounded-t-lg shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <View className="absolute -top-8 left-1/2 -ml-3">
              <TrendingUp size={24} color="#2563EB" />
            </View>
          </View>
          <View className="w-8 h-24 bg-accent/40 rounded-t-lg" />
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1 bg-background border border-border rounded-2xl p-3 items-center">
            <Users size={18} color="#64748B" />
            <Text className="text-text-primary font-bold mt-2">+2.4k</Text>
          </View>
          <View className="flex-1 bg-background border border-border rounded-2xl p-3 items-center">
            <MessageCircle size={18} color="#64748B" />
            <Text className="text-text-primary font-bold mt-2">18k</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// --- Main Screen ---

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollX = useSharedValue(0);
  const scrollRef = useRef<Animated.ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      // index is calculated in momentumEnd for safety
    },
  });

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/');
    }
  };

  const handleMomentumScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1">
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          bounces={false}
          className="flex-1"
        >
          {SLIDES.map((slide, index) => {
            return (
              <View key={slide.id} style={{ width }} className="flex-1">
                {/* Visual Section */}
                <View className="flex-[0.55] px-6">
                  {index === 0 && <VisualStep1 scrollX={scrollX} />}
                  {index === 1 && <VisualStep2 />}
                  {index === 2 && <VisualStep3 />}
                </View>

                {/* Text Section */}
                <View className="flex-[0.45] px-8 pt-8">
                  <Text className="text-text-primary text-4xl font-bold tracking-tight mb-4 leading-[42px]">
                    {slide.title}
                  </Text>
                  <Text className="text-text-secondary text-base leading-6">
                    {slide.subtitle}
                  </Text>
                </View>
              </View>
            );
          })}
        </Animated.ScrollView>

        {/* Footer */}
        <View className="px-8 pb-8 pt-4">
          {/* Pagination Dots */}
          <View className="flex-row items-center justify-center mb-8 space-x-2 gap-2">
            {SLIDES.map((_, index) => {
              const dotStyle = useAnimatedStyle(() => {
                const isActive = Math.round(scrollX.value / width) === index;
                const widthAnim = interpolate(
                  scrollX.value,
                  [(index - 1) * width, index * width, (index + 1) * width],
                  [8, 24, 8],
                  Extrapolation.CLAMP
                );
                const opacityAnim = interpolate(
                  scrollX.value,
                  [(index - 1) * width, index * width, (index + 1) * width],
                  [0.3, 1, 0.3],
                  Extrapolation.CLAMP
                );
                return {
                  width: widthAnim,
                  opacity: opacityAnim,
                  backgroundColor: '#2563EB', // accent color
                };
              });

              return (
                <Animated.View
                  key={index}
                  style={dotStyle}
                  className="h-2 rounded-full"
                />
              );
            })}
          </View>

          {/* CTA Button */}
          <Button 
            label={currentIndex === SLIDES.length - 1 ? "Get Started" : "Continue"} 
            onPress={handleNext} 
            className="w-full"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
