import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboard, setHasSeenOnboard] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboard = async () => {
      await AsyncStorage.removeItem("hasSeenOnboard");

      const value = await AsyncStorage.getItem("hasSeenOnboard");
      console.log("hasSeenOnboard:", value);
      setHasSeenOnboard(value === "true");
      setIsLoading(false);
    };
    checkOnboard();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00AA88" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {hasSeenOnboard ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="onboard" />
        )}
      </Stack>
    </ThemeProvider>
  );
}
