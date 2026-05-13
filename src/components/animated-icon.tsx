import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import Animated, { 
  Easing, 
  FadeOut, 
  FadeInUp, 
  FadeIn, 
  withRepeat, 
  withSequence, 
  withTiming, 
  useSharedValue, 
  useAnimatedStyle 
} from 'react-native-reanimated';
import { MessageSquare } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// Easing for ultra-smooth Apple/Linear-style animations
const premiumEasing = Easing.bezier(0.25, 0.1, 0.25, 1);

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);

  // Animation values
  const glowOpacity = useSharedValue(0.15);
  const logoScale = useSharedValue(0.9);
  const logoOpacity = useSharedValue(0);

  useEffect(() => {
    // Elegant, slow breathing glow
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.25, { duration: 2000, easing: premiumEasing }),
        withTiming(0.15, { duration: 2000, easing: premiumEasing })
      ),
      -1,
      true
    );

    // Smooth logo entrance
    logoScale.value = withTiming(1, { duration: 1000, easing: premiumEasing });
    logoOpacity.value = withTiming(1, { duration: 1000, easing: premiumEasing });

    // Hide splash after a luxurious pause
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: 1 + (glowOpacity.value * 0.15) }],
  }));

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  if (!visible) return null;

  return (
    <Animated.View
      exiting={FadeOut.duration(1000).easing(premiumEasing)}
      style={styles.splashContainer}
    >
      <View style={styles.centerContent}>
        {/* Soft, wide glow */}
        <Animated.View style={[styles.glowBackground, animatedGlowStyle]} />
        
        {/* Sleek Logo Container */}
        <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
          <View style={styles.iconWrapper}>
            <MessageSquare size={34} color="#2563EB" strokeWidth={1.5} />
          </View>
        </Animated.View>
        
        {/* Title */}
        <Animated.Text 
          entering={FadeInUp.delay(400).duration(800).easing(premiumEasing)}
          style={styles.appName}
        >
          ReplyOne
        </Animated.Text>
        
        {/* Micro-typography Subtitle */}
        <Animated.Text 
          entering={FadeInUp.delay(600).duration(800).easing(premiumEasing)}
          style={styles.subtitle}
        >
          ALL YOUR CONVERSATIONS. ONE PLACE.
        </Animated.Text>
      </View>

      <Animated.View 
        entering={FadeIn.delay(1200).duration(1000)}
        style={styles.bottomContainer}
      >
        <ActivityIndicator size="small" color="#94A3B8" />
      </Animated.View>
    </Animated.View>
  );
}

export function AnimatedIcon() {
  const glowOpacity = useSharedValue(0.2);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 2000, easing: premiumEasing }),
        withTiming(0.2, { duration: 2000, easing: premiumEasing })
      ),
      -1,
      true
    );
  }, []);

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: 1 + (glowOpacity.value * 0.1) }],
  }));

  return (
    <View style={styles.inlineIconContainer}>
      <Animated.View style={[styles.inlineGlow, animatedGlowStyle]} />
      <View style={styles.inlineLogo}>
        <MessageSquare size={24} color="#2563EB" strokeWidth={1.5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F8FAFC', // Slate-50 off-white
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowBackground: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#2563EB',
    opacity: 0.15,
    filter: 'blur(50px)', 
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF', 
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  iconWrapper: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  appName: {
    fontSize: 26,
    fontWeight: '600',
    color: '#0F172A',
    letterSpacing: 0.3,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 10,
    color: '#64748B', // Slate-500
    letterSpacing: 3,
    fontWeight: '700',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  inlineIconContainer: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineGlow: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    opacity: 0.2,
    filter: 'blur(20px)',
  },
  inlineLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
