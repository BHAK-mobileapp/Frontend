import { Stack } from 'expo-router';
import * as Sentry from '@sentry/react-native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//hello
interface ProductItem {
  id: number;
  name: string;
  type: string;
  usage: string;
  distance: string;
  image: any;
  note?: string;
}

const products: ProductItem[] = [
  {
    id: 1,
    name: 'Chảo Sunhouse',
    type: 'Gia dụng',
    usage: '99%',
    distance: 'Cách bạn 500m',
    image: require('../assets/images/sunhouse.png'),
    note: 'Đơn nhà nên cần cho'
  },
  {
    id: 2,
    name: 'Xiaomi Mi Band 7 Pro',
    type: 'Điện tử',
    usage: '97%',
    distance: 'Cách bạn 1.2km',
    image: require('../assets/images/miband.png'),
    note: 'Lên đời nên pass lại'
  },
  {
    id: 3,
    name: 'Đắc Nhân Tâm',
    type: 'Sách vở',
    usage: '99%',
    distance: 'Cách bạn 1.5km',
    image: require('../assets/images/dacnhantam.png'),
    note: 'Đọc không hay nên pass'
  },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      

      {/* Main title */}
      <Text style={styles.mainTitle}>Mới nhất gần bạn</Text>
      <View style={styles.distanceIndicator}>
        <Image 
          source={require('../assets/images/walk.png')}
          style={styles.walkIcon}
        />
        <Text style={styles.distanceText}>Cách bạn 1km</Text>
      </View>

      {/* Main Image */}
      <Image
        source={require('../assets/images/gundam.png')}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <Text style={styles.sectionTitle}>Sản phẩm mới nhất</Text>

      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.filterButtonText}>Khoảng cách</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Giá tiền</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <ScrollView style={styles.productList}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image source={product.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDetails}>
                {product.type} • {product.usage} • {product.distance}
              </Text>
              <Text style={styles.productNote}>{product.note}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Image 
                source={require('../assets/images/heart.png')}
                style={styles.heartIcon}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../assets/images/home (1).png')} style={[styles.navIcon, styles.activeNavIcon]} />
          <Text style={[styles.navText, styles.activeNavText]}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={styles.navItem}
  onPress={() => {
    console.log("=== TEST SENTRY: Crash tại nút Lên kệ ===");

    // Gửi message lên Sentry
    Sentry.captureMessage(
      "Test Sentry từ nút Lên kệ – Home screen"
    );

    // Gửi exception
    Sentry.captureException(
      new Error(
        "SENTRY ERROR: Crash test – nút Lên kệ (home.tsx)"
      )
    );

    // Crash thật để test
    throw new Error(
      "CRASHED: Test crash từ nút Lên kệ – Home screen"
    );
  }}
>
  <Image source={require('../assets/images/plus.png')} style={styles.navIcon} />
  <Text style={styles.navText}>Lên kệ</Text>
</TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../assets/images/chat (1).png')} style={styles.navIcon} />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../assets/images/user.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Tài khoản</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
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
    color: '#98D8AA',
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
    height: 200,
    marginBottom: 20,
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
    backgroundColor: '#98D8AA',
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
    padding: 15,
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
    tintColor: '#98D8AA',
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  activeNavText: {
    color: '#98D8AA',
  },
});