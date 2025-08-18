import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { backIcon } from '../assets/back.png';

const ChatWindow = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { profile = {
    name: 'Chennai',
    avatar: { uri: 'https://randomuser.me/api/portraits/women/44.jpg' },
    status: 'Online'
  }, messages: initialMessages = [
    { id: '1', text: 'Hey there!', sent: false, time: '10:30 AM' },
    { id: '2', text: 'Hi! How are you?', sent: true, time: '10:32 AM' },
    { id: '3', text: 'Stuck for ideas?', sent: false, time: '10:33 AM' },
  ] } = route.params || {};

  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: Math.random().toString(),
      text: newMessage,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <View style={chatWindowStyles.fullContainer}>
      {/* Status Bar with matching color */}
      <StatusBar 
        backgroundColor="#FF5864" 
        barStyle="light-content" 
      />
      
      {/* Safe area for header only */}
      <SafeAreaView edges={['top']} style={chatWindowStyles.headerSafeArea}>
        {/* Header with matching color */}
        <View style={chatWindowStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image 
              source={backIcon} 
              style={chatWindowStyles.backIcon} 
            />
          </TouchableOpacity>
          
          <View style={chatWindowStyles.profileInfo}>
            <Image 
              source={profile.avatar} 
              style={chatWindowStyles.profileImage}
            />
            <View>
              <Text style={chatWindowStyles.name}>{profile.name}</Text>
              <Text style={chatWindowStyles.status}>{profile.status}</Text>
            </View>
          </View>
          
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Main content with separate safe area */}
      <SafeAreaView style={chatWindowStyles.container} edges={['left', 'right', 'bottom']}>
        {/* Chat messages area */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={chatWindowStyles.messagesContainer}
          renderItem={({ item }) => (
            <View style={[
              chatWindowStyles.messageBubble, 
              item.sent ? chatWindowStyles.sentMessage : chatWindowStyles.receivedMessage
            ]}>
              <Text style={item.sent ? chatWindowStyles.sentMessageText : chatWindowStyles.messageText}>
                {item.text}
              </Text>
              <Text style={chatWindowStyles.timeText}>{item.time}</Text>
            </View>
          )}
        />

        {/* Input area */}
        <View style={chatWindowStyles.inputContainer}>
          <TouchableOpacity style={chatWindowStyles.plusButton}>
            <Ionicons name="add" size={24} color="#FF5864" />
          </TouchableOpacity>
          
          <TextInput
            style={chatWindowStyles.input}
            placeholder="Message"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          
          <TouchableOpacity 
            style={[chatWindowStyles.sendButton, !newMessage.trim() && chatWindowStyles.disabledSendButton]} 
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};


const chatWindowStyles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#FF5864',
  },
  headerSafeArea: {
    backgroundColor: '#FF5864',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 10,
    backgroundColor: '#FF5864',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  status: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  messagesContainer: {
    padding: 15,
    paddingBottom: 80,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF5864',
    borderTopRightRadius: 0,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  sentMessageText: {
    fontSize: 16,
    color: 'white',
  },
  timeText: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.5)',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  plusButton: {
    padding: 5,
  },
  sendButton: {
    backgroundColor: '#FF5864',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    opacity: 0.5,
  },
});


export default ChatWindow;