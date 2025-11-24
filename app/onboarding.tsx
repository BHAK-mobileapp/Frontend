import React from 'react';
import { Stack, router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Onboarding from '../component/Onboarding';

const ONBOARDING_KEY = 'hasOnboarded';

export default function OnboardingScreen() {
  
  const handleOnboardingComplete = async () => {
   
    try {
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true'); 
    } catch (e) {
        console.error("Failed to save onboarding status:", e);
    }
  
    router.replace('/welcome');
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Onboarding onComplete={handleOnboardingComplete} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});