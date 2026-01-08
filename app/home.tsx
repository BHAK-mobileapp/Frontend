import HeartIcon from '@/assets/svg/HeartIcon';
import HeartedIcon from '@/assets/svg/HeartedIcon';
import WalkIcon from '@/assets/svg/WalkIcon';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//hello
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
    image: require('../assets/images/iphone.png'),
    note: 'Like new, full box, pin còn 100',
    price: '27.000.000đ',
    address: 'Tân Bình'
  },
  {
    id: 1,
    name: 'Chảo Sunhouse',
    type: 'Gia dụng',
    usage: '99%',
    distance: 'Cách bạn 500m',
    image: require('../assets/images/sunhouse.png'),
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
    image: require('../assets/images/miband.png'),
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
    image: require('../assets/images/dacnhantam.png'),
    note: 'Đọc không hay nên pass',
    price: '50.000đ',
    address: 'Quận 5, TP.HCM'
  },
];

export default function Home() {
  const router = useRouter();
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [productList, setProductList] = useState<ProductItem[]>(products);
  const [priceSortOrder, setPriceSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [distanceSortOrder, setDistanceSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [activeFilter, setActiveFilter] = useState<'none' | 'distance' | 'price'>('none');

  const parsePrice = (p?: string) => {
    if (!p) return 0;
    const digits = String(p).replace(/\./g, '').replace(/[^0-9]/g, '');
    return Number(digits) || 0;
  };

  const parseDistance = (d?: string) => {
    if (!d) return Number.POSITIVE_INFINITY;
    // expect strings like 'Cách bạn 500m' or 'Cách bạn 1.2km'
    const m = String(d).match(/([0-9]+(?:[.,][0-9]+)?)\s*(km|m)/i);
    if (!m) return Number.POSITIVE_INFINITY;
    const num = parseFloat(m[1].replace(',', '.'));
    const unit = m[2].toLowerCase();
    return unit === 'km' ? Math.round(num * 1000) : Math.round(num);
  };

  const togglePriceSort = () => {
    const nextOrder = priceSortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...productList].sort((a, b) => {
      const pa = parsePrice(a.price);
      const pb = parsePrice(b.price);
      return nextOrder === 'asc' ? pa - pb : pb - pa;
    });
    setProductList(sorted);
    setPriceSortOrder(nextOrder);
    setDistanceSortOrder('none');
    setActiveFilter('price');
  };

  const toggleDistanceSort = () => {
    const nextOrder = distanceSortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...productList].sort((a, b) => {
      const da = parseDistance(a.distance);
      const db = parseDistance(b.distance);
      return nextOrder === 'asc' ? da - db : db - da;
    });
    setProductList(sorted);
    setDistanceSortOrder(nextOrder);
    setPriceSortOrder('none');
    setActiveFilter('distance');
  };

  const toggleLike = (id: number) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />

      <TouchableOpacity style={styles.topHeader} onPress={() => router.push('/home')}>
        <Image
          source={require('../assets/images/ecotrade-high-resolution-logo-transparent (2).png')}
          style={styles.logoImage}
        />
      </TouchableOpacity>

      {/* Main title */}
      <Text style={styles.mainTitle}>Mới nhất gần bạn</Text>
      <View style={styles.distanceIndicator}>
        <WalkIcon
          style={styles.walkIcon}
        />
        <Text style={styles.distanceText}>Cách bạn 1km</Text>
      </View>

      {/* Main Image with overlay */}
      <TouchableOpacity
        style={styles.mainImageWrapper}
        onPress={() => router.push('/product/0')}
        activeOpacity={0.9}
      >
        <Image
          source={require('../assets/images/iphone.png')}
          style={styles.mainImage}
          resizeMode="contain"
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.overlayTitle}>iPhone 17 Pro Max 1TB Likenew</Text>
          <Text style={styles.overlaySubtitle}>27.000.000đ - Tân Bình</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Sản phẩm mới nhất</Text>

      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'distance' ? styles.activeFilter : null]}
          onPress={toggleDistanceSort}
        >
          <Text style={styles.filterButtonText}>Khoảng cách{distanceSortOrder === 'asc' ? ' ↑' : distanceSortOrder === 'desc' ? ' ↓' : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'price' ? styles.activeFilter : null]}
          onPress={togglePriceSort}
        >
          <Text style={styles.filterButtonText}>
            Giá tiền{priceSortOrder === 'asc' ? ' ↑' : priceSortOrder === 'desc' ? ' ↓' : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <ScrollView style={styles.productList}>
        {productList.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => router.push(`/product/${product.id}`)}
          >
            <Image source={product.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDetails}>
                {product.type} • {product.usage} • {product.distance}
              </Text>
              <Text style={styles.productNote}>{product.note}</Text>
              {product.price ? <Text style={[styles.productNote, {fontWeight: '700'}]}>{product.price}</Text> : null}
              {product.address ? <Text style={styles.productDetails}>{product.address}</Text> : null}
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleLike(product.id)}
            >
              {liked[product.id] ? (
                <HeartedIcon style={styles.heartIcon} />
              ) : (
                <HeartIcon style={styles.heartIcon} />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Navigation handled by root layout */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'ios' ? 64 : 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  time: {
    fontSize: 16,
    fontWeight: '500',
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92E3A9',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  distanceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  walkIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
  },
  mainImage: {
    width: '100%',
    height: 170,
    alignSelf: 'center',
  },
  mainImageWrapper: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 12,
  },
  imageOverlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  overlayTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  overlaySubtitle: {
    color: '#fff',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#92E3A9',
  },
  filterButtonText: {
    color: '#000',
  },
  productList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productCard: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productNote: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    padding: 8,
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12,
    height: Platform.OS === 'ios' ? 78 : 85,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  activeNavIcon: {
    tintColor: '#92E3A9',
  },
  navText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Roboto',
  },
  activeNavText: {
    color: '#92E3A9',
  },
  topHeader: {
    backgroundColor: '#92E3A9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  logoImage: {
    width: 160,
    height: 36,
    resizeMode: 'contain',
  },
});