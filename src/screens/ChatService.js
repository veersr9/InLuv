// src/services/chatService.js
import database from '@react-native-firebase/database';

export const sendMessage = async (chatId, message, senderId) => {
  const newMessageRef = database().ref(`/chats/${chatId}/messages`).push();
  await newMessageRef.set({
    text: message.text,
    senderId,
    timestamp: database.ServerValue.TIMESTAMP,
    sent: true
  });
  return newMessageRef.key;
};

export const getMessages = (chatId, callback) => {
  const messagesRef = database().ref(`/chats/${chatId}/messages`);
  messagesRef.orderByChild('timestamp').on('value', snapshot => {
    const messages = [];
    snapshot.forEach(childSnapshot => {
      messages.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    callback(messages);
  });
  return () => messagesRef.off('value');
};