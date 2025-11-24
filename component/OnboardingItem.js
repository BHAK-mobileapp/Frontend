// component/OnboardingItems.js  (hoặc tên file bạn đang dùng)
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingItems({ item }) {
  return (
    <View style={styles.container}>
      {/* Hình ảnh */}
      <Image source={item.image} style={styles.image} resizeMode="contain" />

      {/* Title + Subtitle căn giữa tuyệt đối */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width, 
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: width * 0.8,
    height: height * 0.8, 
  },
  textContainer: {
    position: 'absolute',
    top: height * 0.4, 
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#35CA60',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});
