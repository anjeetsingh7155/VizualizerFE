import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}

/** Subtle fade + rise used for screen content. */
export function FadeIn({ children, delay = 0, style }: FadeInProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 450,
      delay,
      useNativeDriver: true,
    }).start();
  }, [progress, delay]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });

  return <Animated.View style={[style, { opacity: progress, transform: [{ translateY }] }]}>{children}</Animated.View>;
}
