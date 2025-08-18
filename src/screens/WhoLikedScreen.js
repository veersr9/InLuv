import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import profiles from './profiles';

const { width } = Dimensions.get('window');
const CARD_SIZE = width / 2 - 20;
const CARD_HEIGHT = CARD_SIZE * 1.4; // 40% taller

const WhoLikedScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Full card image */}
      <Image source={item.image} style={styles.image} blurRadius={8} />

      {/* Name overlay with blur */}
      <View style={styles.nameOverlay}>
       <BlurView intensity={50} tint="dark" style={styles.blurBackground}>
    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
  </BlurView>
      </View>
    </View>

//     <View style={styles.card}>
//   <Image source={item.image} style={styles.image} />

//   <View style={styles.nameOverlay}>
//     <BlurView intensity={30} tint="dark" style={styles.blurBackground} />
//     <Text style={styles.name}>{item.name}</Text>
//   </View>
// </View>

  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liked You</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default WhoLikedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#FF7158',
    color: '#fff',
  },
  list: {
    padding: 10,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    margin: 5,
    width: CARD_SIZE,
    height: CARD_HEIGHT, // taller card
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  nameOverlay: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 40,
  overflow: 'hidden',
},
blurBackground: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
  blurContainer: {
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
  },
  // styles:
name: {
  color: '#fff',        // white text
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 16,
  paddingVertical: 8,
},
nameContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0,0,0,0.4)', // dark overlay for contrast
  alignItems: 'center',
},
});
