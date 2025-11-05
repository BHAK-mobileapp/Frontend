import { Pressable, ImageBackground, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardScreen() {
  const router = useRouter();

  const handlePress = async () => {
    await AsyncStorage.setItem("hasSeenOnboard", "true");
    router.replace("/(tabs)");
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <ImageBackground
        source={require("../assets/images/Welcome.png")}
        style={styles.image}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { flex: 1, width: "100%", height: "100%" },
});
