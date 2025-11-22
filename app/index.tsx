import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Image
            source={require("../assets/images/Welcome.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  pressable: { flex: 1 },
  image: { width: "100%", height: "100%" },
});