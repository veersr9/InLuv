import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const ChatWindow = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef();

  // Get current user and profile data
  const currentUser = auth().currentUser;
  const { profile } = route.params || {
    profile: {
      id: '1',
      name: 'Mumbai',
      avatar: require('../assets/Nature1.png'),
      isOnline: true,
      messages: []
    }
  };

  // if (!currentUser) {
  //   Alert.alert("Authentication Error", "Please sign in to continue");
  //   navigation.goBack();
  //   return null;
  // }

  // Generate chat ID
  const chatId = `chat_${currentUser.uid}_${profile.id}`;
  console.log("Active Chat ID:", chatId);

  const [messages, setMessages] = useState(profile.messages || []);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize chat and sync with Firebase
  useEffect(() => {
    if (!chatId) return;

    const chatRef = database().ref(`/chats/${chatId}`);
    
    // Initialize chat structure
    chatRef.transaction((currentData) => {
      if (currentData === null) {
        return {
          participants: {
            [currentUser.uid]: true,
            [profile.id]: true
          },
          createdAt: database.ServerValue.TIMESTAMP,
          messages: {}
        };
      }
      return currentData;
    });

    // Listen for new messages
    const messagesRef = database().ref(`/chats/${chatId}/messages`).orderByChild('timestamp');
    const messageListener = messagesRef.on('value', snapshot => {
      const firebaseMessages = [];
      snapshot.forEach(childSnapshot => {
        firebaseMessages.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      // Merge with initial messages and remove duplicates
      const mergedMessages = [...(profile.messages || []), ...firebaseMessages]
        .filter((msg, index, self) => 
          index === self.findIndex(m => 
            m.id === msg.id || 
            (m.timestamp === msg.timestamp && m.text === msg.text)
          )
        )
        .sort((a, b) => b.timestamp - a.timestamp);

      setMessages(mergedMessages);
    });

    // Typing indicator listener
    const typingRef = database().ref(`/chats/${chatId}/typing/${profile.id}`);
    const typingListener = typingRef.on('value', snapshot => {
      setIsTyping(snapshot.val() === true);
    });

    return () => {
      messagesRef.off('value', messageListener);
      typingRef.off('value', typingListener);
      database().ref(`/chats/${chatId}/typing/${currentUser.uid}`).set(false);
    };
  }, [chatId, currentUser.uid, profile.id, profile.messages]);

  // Send message handler
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      text: newMessage,
      senderId: currentUser.uid,
      senderName: currentUser.displayName || 'You',
      timestamp: Date.now(),
      read: false,
      isReadMe: true,       // sender has read his own message
      isReadOther: false,   // receiver will update this when opened
      isFileSend: false,  
    };

    // Optimistic UI update
    setMessages(prev => [{
      id: `temp_${Date.now()}`,
      ...messageData
    }, ...prev]);

    try {
      // Send to Firebase
      await database().ref(`/chats/${chatId}/messages`).push(messageData);
      setNewMessage('');
      
      // Update last message timestamp
      await database().ref(`/chats/${chatId}`).update({
        lastMessage: messageData.timestamp
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Rollback on error
      setMessages(prev => prev.filter(m => !m.id.startsWith('temp_')));
      Alert.alert("Error", "Failed to send message");
    }
  };

  // Format time display
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render each message
  const renderMessage = ({ item }) => {
    const isCurrentUser = item.senderId === currentUser.uid;
    return (
      <View style={[
        styles.messageBubble, 
        isCurrentUser ? styles.sentMessage : styles.receivedMessage
      ]}>
        {!isCurrentUser && (
          <Image source={profile.avatar} style={styles.messageAvatar} />
        )}
        <View style={styles.messageContent}>
          {!isCurrentUser && (
            <Text style={styles.senderName}>{profile.name}</Text>
          )}
          <Text style={isCurrentUser ? styles.sentMessageText : styles.messageText}>
            {item.text}
          </Text>
          <Text style={styles.timeText}>
            {item.time || formatTime(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.fullContainer}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <StatusBar backgroundColor="#FF5864" barStyle="light-content" />
      
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.profileInfo}>
            <Image source={profile.avatar} style={styles.profileImage} />
            <View>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.status}>
                {isTyping ? 'Typing...' : (profile.isOnline ? 'Online' : 'Offline')}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Chat Messages */}
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF5864" />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesContainer}
            inverted
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No messages yet. Say hello!</Text>
              </View>
            }
          />
        )}

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            onSubmitEditing={handleSendMessage}
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, !newMessage.trim() && styles.disabledSendButton]} 
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
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
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  status: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
  messagesContainer: {
    padding: 15,
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
    backgroundColor: '#E8E8E8',
    padding: 12,
    borderRadius: 18,
    borderTopLeftRadius: 0,
  },
  sentMessageText: {
    fontSize: 16,
    color: 'white',
    backgroundColor: '#FF5864',
    padding: 12,
    borderRadius: 18,
    borderTopRightRadius: 0,
  },
  messageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeText: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.5)',
    marginRight: 4,
  },
  readIcon: {
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
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
    fontSize: 16,
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