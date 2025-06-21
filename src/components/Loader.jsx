import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, Animated, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Loader = ({ variant = 'default', size = 'large', color = '#FFFFFF' }) => {
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Common fade-in animation for all variants
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Variant-specific animations
    if (variant === 'default' || variant === 'pulse') {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else if (variant === 'rotate') {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    } else if (variant === 'bounce') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 10,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (variant === 'wave') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (variant === 'spin') {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ).start();
    }

    // Cleanup animations
    return () => {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      rotateAnim.setValue(0);
      bounceAnim.setValue(0);
    };
  }, [fadeAnim, scaleAnim, rotateAnim, bounceAnim, variant]);

  // Build transform array dynamically to avoid empty objects
  const transform = [];
  if (variant === 'default' || variant === 'pulse' || variant === 'wave') {
    transform.push({ scale: scaleAnim });
  }
  if (variant === 'rotate' || variant === 'spin') {
    transform.push({
      rotate: rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    });
  }
  if (variant === 'bounce') {
    transform.push({ translateY: bounceAnim });
  }

  const animatedStyles = {
    opacity: fadeAnim,
    transform,
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8290EA', '#3F4CA0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <Animated.View style={[styles.loaderContainer, animatedStyles]}>
          <ActivityIndicator size={size} color={color} />
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Transparent to allow parent background (white in SplashScreen)
  },
  gradientContainer: {
    padding: 20,
    borderRadius: 50, // Circular gradient background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;