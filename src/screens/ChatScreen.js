import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import profiles from './profiles';


const ChatScreen = () => {
  const [search, setSearch] = useState('');
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Sort alphabetically on load
    const sorted = [...profiles].sort((a, b) => a.name.localeCompare(b.name));
    setChats(sorted);
  }, []);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

   const handleChatPress = (chat) => {
    navigation.navigate('ChatWindow', { 
      profile: chat,
      messages: chat.messages || [] 
    });
  };

  const renderItem = ({ item }) => (
    // <View style={styles.chatItem}>
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => handleChatPress(item)}
    >
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <Text style={styles.time}>{item.lastActive}</Text>
      </TouchableOpacity>
    // </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Conversations</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredChats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
  },
  searchBar: {
    backgroundColor: '#f1f1f1',
    marginHorizontal: 15,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 15,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
  },
});
