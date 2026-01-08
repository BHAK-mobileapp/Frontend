import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function UserInfo() {
  const params = useLocalSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem('user');
        if (stored) {
          const user = JSON.parse(stored);
          setName(user.name || '');
          setEmail(user.email || '');
          setPhone(user.phone || '');
          setAddress(user.address || '');
          setDob(user.dob || '');
          return;
        }
      } catch (e) {
        console.error('Failed to load user', e);
      }

      // fallback to params if no stored user
      setName((params.name as string) || '');
      setEmail((params.email as string) || '');
      setPhone((params.phone as string) || '');
      setAddress((params.address as string) || '');
      setDob((params.dob as string) || '');
    };
    load();
  }, [params]);
  const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 44;
  const HEADER_HEIGHT = STATUS_BAR_HEIGHT;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: HEADER_HEIGHT }]}>      
      <Stack.Screen options={{ headerShown: true, title: 'Thông tin người dùng' }} />

      <View style={styles.card}>
        <Text style={styles.label}>Họ và tên</Text>
        <Text style={styles.value}>{name || '—'}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email || '—'}</Text>

        <Text style={styles.label}>Số điện thoại</Text>
        <Text style={styles.value}>{phone || '—'}</Text>

        <Text style={styles.label}>Địa chỉ</Text>
        <Text style={styles.value}>{address || '—'}</Text>

        <Text style={styles.label}>Ngày sinh</Text>
        <Text style={styles.value}>{dob || '—'}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  card: { padding: 20, margin: 16, borderRadius: 12, backgroundColor: '#fff', elevation: 2 },
  label: { color: '#666', fontSize: 13, marginTop: 12 },
  value: { fontSize: 16, fontWeight: '600', marginTop: 6 },
});
