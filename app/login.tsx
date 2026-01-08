import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter email and password.");
      return;
    }

    try {
      const stored = await AsyncStorage.getItem('user');
      if (!stored) {
        Alert.alert('No account', 'Không tìm thấy tài khoản. Vui lòng đăng ký.');
        return;
      }
      const user = JSON.parse(stored);
      if (user.email === email && user.password === password) {
        router.push('/home');
      } else {
        Alert.alert('Invalid', 'Email hoặc mật khẩu không đúng.');
      }
    } catch (e) {
      console.error('Login error', e);
      Alert.alert('Error', 'Không thể xác thực.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>SIGN IN</Text>
        <View style={styles.headerLinks}>
          <TouchableOpacity>
            <Text style={styles.forgotText}>FORGOT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signUpText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#666"
      />
      
      <TouchableOpacity style={styles.signInButton} onPress={submit}>
        <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>OR SIGN IN WITH</Text>
      </View>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Image 
            source={require('../assets/images/facebook.png')} 
            style={styles.socialIcon} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image 
            source={require('../assets/images/google.png')} 
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
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
  orContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  orText: {
    color: '#666',
    fontSize: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  socialIcon: {
    width: 25,
    height: 25,
  },
});
