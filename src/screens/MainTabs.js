// MainTabs.js (or wherever you define your tab navigator)

import React from 'react';
import { Image, Platform, StyleSheet } from 'react-native'; // Import Image and StyleSheet
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// No longer need Ionicons if you're using custom images:
// import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your screen components
import HomeScreen from './HomeScreen';
import WhoLikedScreen from './WhoLikedScreen';
import ChatScreen from './ChatScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => { // Added 'focused' prop
          let imageSource;

          // IMPORTANT: Double-check these paths!
          // The path in `require()` is RELATIVE to the file where this code (MainTabs.js) is located.
          // For example, if MainTabs.js is in `src/navigation/MainTabs.js` and images are in `src/assets/`,
          // then the path should be `../../assets/home.png`.
          // Also, ensure file names (e.g., 'home.png', 'WhoLiked.png') match exactly, including case.

          // You might want to have separate images for focused/unfocused states for better UX.
          // For example:
          // if (route.name === 'Home') {
          //   imageSource = focused ? require('../assets/home-active.png') : require('../assets/home-inactive.png');
          // }

          if (route.name === 'Home') {
            imageSource = require('../assets/home.png'); // Path to your home icon image
          } else if (route.name === 'WhoLiked') {
            imageSource = require('../assets/WhoLiked.png'); // Path to your WhoLiked icon image
          } else if (route.name === 'Chat') {
            imageSource = require('../assets/Chat.png'); // Path to your Chat icon image
          } else if (route.name === 'Profile') {
            imageSource = require('../assets/Profile.png'); // Path to your Profile icon image
          }

          // Return the Image component with the determined source
          // Apply tintColor if your images are single-color icons (e.g., transparent PNGs or SVGs)
          // and you want them to change color with `tabBarActiveTintColor`/`tabBarInactiveTintColor`.
          // If your images are full-color, remove `tintColor: color`.
          return (
            <Image
              source={imageSource}
              style={[
                styles.tabIcon,
                { tintColor: color, width: size, height: size } // Apply color and size
              ]}
            />
          );
        },
        headerShown: false, // Hides the header for the screens
        tabBarActiveTintColor: '#ff3366', // Color for active tab icon/label
        tabBarInactiveTintColor: 'gray', // Color for inactive tab icon/label
        tabBarStyle: { // Added basic styling for the tab bar itself
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: Platform.OS === 'ios' ? 10 : 5, // Adjust padding for iOS notch
          height: Platform.OS === 'ios' ? 90 : 60, // Adjust height for iOS notch
        },
        tabBarLabelStyle: { // Added styling for the tab labels
          fontSize: 12,
          paddingBottom: Platform.OS === 'ios' ? 0 : 2, // Adjust padding for iOS notch
        },
      })}
    >
      {/* Define your tab screens */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="WhoLiked" component={WhoLikedScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Stylesheet for the custom image icon
const styles = StyleSheet.create({
  tabIcon: {
    resizeMode: 'contain', // Ensures the image fits within the bounds without cropping
  },
});

export default MainTabs;
