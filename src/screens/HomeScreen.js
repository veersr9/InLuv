// SwipeableCards.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import profiles from './profiles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 120;

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10,
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            position.setValue({ x: 0, y: 0 });
            setCurrentIndex((prev) => Math.min(prev + 1, profiles.length - 1));
          });
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            position.setValue({ x: 0, y: 0 });
            setCurrentIndex((prev) => Math.min(prev + 1, profiles.length - 1));
          });
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleManualSwipe = (direction) => {
    Animated.timing(position, {
      toValue: {
        x: direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100,
        y: 0,
      },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      setCurrentIndex((prev) => Math.min(prev + 1, profiles.length - 1));
    });
  };

  const renderProfiles = () => {
    return profiles
      .map((profile, index) => {
        if (index < currentIndex) return null;

        const isCurrent = index === currentIndex;
        const cardStyle = isCurrent
          ? [
            styles.card,
            {
              transform: [...position.getTranslateTransform(), { rotate }],
              zIndex: 1,
            },
          ]
          : [
            styles.card,
            {
              top: 5 * (index - currentIndex),
              scale: 1 - 0.04 * (index - currentIndex),
              zIndex: -index,
            },
          ];

        const content = (
          <View style={styles.cardInner}>
            <Image source={profile.image} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.overlay}>
              <Text style={styles.name}>
                {profile.name}, {profile.age}
              </Text>
              <Text style={styles.location}>{profile.location}</Text>
            </View>

          </View>
        );

        if (isCurrent) {
          return (
            <Animated.View key={profile.id} {...panResponder.panHandlers} style={cardStyle}>
              {content}
            </Animated.View>
          );
        } else {
          return <Animated.View key={profile.id} style={cardStyle}>{content}</Animated.View>;
        }
      })
      .reverse();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>In Luv</Text>
        <Image source={require('../assets/profieImage.jpeg')} style={styles.profileIcon} />
      </View>

      <View style={styles.cardContainer}>{renderProfiles()}</View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleManualSwipe('left')}>
          <Image source={require('../assets/dislike.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={() => console.log('Super Like')}>
          <Image source={require('../assets/star.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={() => handleManualSwipe('right')}>
          <Image source={require('../assets/hearts.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FA',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
    marginRigh: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 20,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  card: {
    width: '100%',
    height: '85%',
    position: 'absolute',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  cardInner: {
    flex: 1,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    position: 'absolute',

  },

  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },

  location: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 4,
  },
  cardDetails: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  location: {
    fontSize: 18,
    color: '#F0F0F0',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  actionBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
