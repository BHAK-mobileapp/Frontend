import React, {useState, useRef} from "react";
import {View, Text, StyleSheet, FlatList, Animated, TouchableOpacity} from "react-native";
import slides from './slides'
import OnboardingItems from './OnboardingItem'


const Onboarding = ({ onComplete }) => { 
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentSlideIndex(viewableItems[0].index);
    }
  });
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50});
  
  return(
    <View style={styles.container}>
      <View style={{flex: 3}}>
      <FlatList 
        data={slides} 
        renderItem={({item}) => <OnboardingItems item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(s) => s.id}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged.current}
        viewabilityConfig={viewConfig.current}
        ref={slidesRef}
       />
    </View>

    {/* Footer: dots + buttons */}
    <View style={styles.footer}>
      <View style={styles.dotsContainer}>
          {slides.map((s, index) => (
            <View key={s.id} style={[styles.dot, currentSlideIndex === index && styles.activeDot]} />
          ))}
      </View>

      <View style={styles.buttonsRow}>
        {/* Sửa logic nút SKIP */}
        <TouchableOpacity onPress={onComplete} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => {
            if (currentSlideIndex < slides.length - 1) {
              slidesRef.current?.scrollToIndex({ index: currentSlideIndex + 1 });
            } else {
              onComplete(); 
            }
          }}
          style={styles.nextButton}
        >

         <Text style={styles.nextText}>{currentSlideIndex === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#98D8AA',
    width: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipText: {
    color: '#666',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#98D8AA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default Onboarding;