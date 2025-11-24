// app/welcome.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Welcome() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSkipWaiting = () => {
    router.replace('/login');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={handleSkipWaiting}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <Image
        source={require('../assets/images/Welcome.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: height,
  },
});