import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");

  const submit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }
    if (dob && !/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      Alert.alert("Invalid date", "Date of birth must be YYYY-MM-DD.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match.");
      return;
    }
    // Save user locally (simulate account creation)
    const user = { name, email, password, phone, address, dob };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      router.push('/userinfo');
    } catch (e) {
      console.error('Failed to save user', e);
      Alert.alert('Error', 'Không lưu được thông tin người dùng.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerText}>SIGN UP</Text>
        <View style={styles.headerLinks}>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.forgotText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="FULL NAME"
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="EMAIL"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="PHONE NUMBER"
        keyboardType="phone-pad"
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput
        value={dob}
        onChangeText={setDob}
        placeholder="DATE OF BIRTH (YYYY-MM-DD)"
        style={styles.input}
        placeholderTextColor="#666"
        autoCapitalize="none"
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="ADDRESS"
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="PASSWORD"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="CONFIRM PASSWORD"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.signInButton} onPress={submit}>
        <Text style={styles.signInButtonText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
  },
  headerLinks: {
    flexDirection: 'row',
    gap: 15,
  },
  forgotText: {
    color: '#666',
    fontSize: 16,
  },
  signUpText: {
    color: '#666',
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  signInButton: {
    backgroundColor: '#98D8AA',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
