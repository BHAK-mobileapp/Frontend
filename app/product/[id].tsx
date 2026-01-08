import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductItem {
  id: number;
  name: string;
  type: string;
  usage: string;
  distance: string;
  image: any;
  note?: string;
  price?: string;
  address?: string;
}

const products: ProductItem[] = [
  {
    id: 0,
    name: 'iPhone 17 Pro Max 1TB Likenew',
    type: 'Điện tử',
    usage: '99% ',
    distance: 'Cách bạn 1km',
    image: require('../../assets/images/iphone.png'),
    note: 'Sản phẩm trên cover',
    price: '27.000.000đ',
    address: 'Tân Bình'
  },
  {
    id: 1,
    name: 'Chảo Sunhouse',
    type: 'Gia dụng',
    usage: '99%',
    distance: 'Cách bạn 500m',
    image: require('../../assets/images/sunhouse.png'),
    note: 'Dọn nhà nên cần cho',
    price: '120.000đ',
    address: 'Quận 1, TP.HCM'
  },
  {
    id: 2,
    name: 'Xiaomi Mi Band 7 Pro',
    type: 'Điện tử',
    usage: '97%',
    distance: 'Cách bạn 1.2km',
    image: require('../../assets/images/miband.png'),
    note: 'Lên đời nên pass lại',
    price: '700.000đ',
    address: 'Quận 3, TP.HCM'
  },
  {
    id: 3,
    name: 'Đắc Nhân Tâm',
    type: 'Sách vở',
    usage: '99%',
    distance: 'Cách bạn 1.5km',
    image: require('../../assets/images/dacnhantam.png'),
    note: 'Đọc không hay nên pass',
    price: '50.000đ',
    address: 'Quận 5, TP.HCM'
  },
];

export default function ProductDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id as string | undefined;

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: true, title: 'Sản phẩm' }} />
        <Text style={styles.notFound}>Sản phẩm không tồn tại.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding:20}}>
      <Stack.Screen options={{ headerShown: true, title: product.name }} />

      <Image source={product.image} style={styles.image} resizeMode="contain" />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.address}>{product.address}</Text>

      <Text style={styles.sectionTitle}>Mô tả</Text>
      <Text style={styles.description}>{product.note || 'Không có mô tả.'}</Text>

      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => router.push('/chat')}
      >
        <Text style={styles.contactButtonText}>Liên hệ người bán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#92E3A9',
    fontWeight: '700',
    marginBottom: 6,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#92E3A9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  notFound: {
    padding: 20,
    fontSize: 16,
  }
});
