import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const ONBOARDING_KEY = 'hasOnboarded';

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {

        const hasCompleted = await AsyncStorage.getItem(ONBOARDING_KEY);
        
        if (hasCompleted === 'true') {
    
          router.replace('/welcome');
        } else {
          router.replace('/onboarding');
        }
      } catch (e) {
        console.error("AsyncStorage error:", e);
        router.replace('/onboarding');
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />

        <ActivityIndicator size="large" color="#98D8AA" /> 
      </View>
    );
  }

  return null; 
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
});