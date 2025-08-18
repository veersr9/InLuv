import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

// CHANGE IS HERE: Added { navigation } to receive the navigation prop
const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  const isPhoneValid = phone.length === 10 && /^\d{10}$/.test(phone);

  const handleContinue = () => {
    if (isPhoneValid) {
      // This will now work correctly
      navigation.navigate('OtpScreen', { phone: phone });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Text style={styles.logo}>In Luv 🧡</Text>

            <Image
              source={require('../assets/icons8-app-480.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your 10 digit mobile number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />

            <TouchableOpacity
              style={[styles.button, !isPhoneValid && styles.disabled]}
              disabled={!isPhoneValid}
              onPress={handleContinue}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.outlineButton}>
              <Text style={styles.outlineText}>Continue with Form ID</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.outlineButton}>
              <Text style={styles.outlineText}>Continue with Email ID</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing you are accepting our{' '}
              <Text style={styles.link}>Privacy Policy</Text> and{' '}
              <Text style={styles.link}>Terms & Conditions</Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ... Your styles remain the same
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef2f7',
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 160,
    marginBottom: 20,
    borderRadius: 12,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  orText: {
    marginHorizontal: 8,
    color: '#666',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#aaa',
  },
  outlineButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  outlineText: {
    color: '#007bff',
    fontWeight: '600',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
    marginTop: 20,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});


export default LoginScreen;