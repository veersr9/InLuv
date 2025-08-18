import React, { useState } from 'react';


// src/data/profiles.js
const profiles = [
  {
    id: '1',
    name: 'Mumbai',
    age: 25,
    location: 'Mumbai, India',
    bio: 'The city that never sleeps. Known for Bollywood, beaches, and bustling markets.',
    image: require('../assets/Nature1.png'),
    avatar: require('../assets/Nature1.png'), // for chat list
    lastMessage: 'Hey! How are you?',
    messages: [
      { id: '1', text: 'Hey there!', sent: false, time: '10:30 AM' },
      { id: '2', text: 'Hi! How are you?', sent: true, time: '10:32 AM' },
      { id: '3', text: 'Stuck for ideas?', sent: false, time: '10:33 AM' },
    ],
    lastActive: 'Today',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Delhi',
    age: 26,
    location: 'Delhi, India',
    bio: 'The heart of India, rich in history and home to countless monuments.',
    image: require('../assets/Nature2.png'),
    avatar: require('../assets/Nature2.png'),
    lastMessage: 'It’s been a while!',
    messages: [
      { id: '1', text: 'Hey there!', sent: false, time: '10:30 AM' },
      { id: '2', text: 'Hi! How are you?', sent: true, time: '10:32 AM' },
      { id: '3', text: 'Stuck for ideas?', sent: false, time: '10:33 AM' },
    ],
    lastActive: 'Today',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Pune',
    age: 24,
    location: 'Pune, India',
    bio: 'A cultural hub with a young, energetic vibe.',
    image: require('../assets/Nature3.png'),
    avatar: require('../assets/Nature3.png'),
    lastMessage: 'Where are you these days?',
    messages: [
      { id: '1', text: 'Hey there!', sent: false, time: '10:30 AM' },
      { id: '2', text: 'Hi! How are you?', sent: true, time: '10:32 AM' },
      { id: '3', text: 'Stuck for ideas?', sent: false, time: '10:33 AM' },
    ],
    lastActive: 'Yesterday',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Kerala',
    age: 24,
    location: 'Kerala, India',
    bio: 'Known as God’s Own Country. Backwaters, beaches, and spices galore.',
    image: require('../assets/Nature4.png'),
    avatar: require('../assets/Nature4.png'),
    lastMessage: 'See you soon!',
    messages: [
      { id: '1', text: 'Hey there!', sent: false, time: '10:30 AM' },
      { id: '2', text: 'Hi! How are you?', sent: true, time: '10:32 AM' },
      { id: '3', text: 'Stuck for ideas?', sent: false, time: '10:33 AM' },
    ],
    lastActive: '28 Jan',
    isOnline: false,
  },
  {
    id: '5',
    name: 'Chennai',
    age: 24,
    location: 'Chennai, India',
    bio: 'A blend of tradition and modernity, with a vibrant cultural scene.',
    image: require('../assets/Nature5.png'),
    avatar: require('../assets/Nature5.png'),
    lastMessage: 'Can we meet tomorrow?',
    messages: [
      { id: '1', text: 'Hey there!', sent: false, time: '10:30 AM' },
      { id: '2', text: 'Hi! How are you?', sent: true, time: '10:32 AM' },
      { id: '3', text: 'Stuck for ideas?', sent: false, time: '10:33 AM' },
    ],
    lastActive: '24 Jan',
    isOnline: true,
  }
];

export default profiles;
