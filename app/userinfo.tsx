import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function UserInfo() {
  const params = useLocalSearchParams();
  const name = (params.name as string) || '';
  const email = (params.email as string) || '';
  const phone = (params.phone as string) || '';
  const address = (params.address as string) || '';

  return (
    <SafeAreaView style={styles.container}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: { padding: 20, margin: 16, borderRadius: 12, backgroundColor: '#fff', elevation: 2 },
  label: { color: '#666', fontSize: 13, marginTop: 12 },
  value: { fontSize: 16, fontWeight: '600', marginTop: 6 },
});
