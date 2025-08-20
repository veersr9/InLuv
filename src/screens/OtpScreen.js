import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Pressable,
  Alert, // ✅ for error messages
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'; // ✅ Firebase import
import { authService } from '../services/api/authService'; // Direct service import

const OtpScreen = ({ route }) => {
  const { phoneNumber } = route.params;
  const navigation = useNavigation();

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);

  // // ✅ Timer setup and cleanup
  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     setTimer((prev) => (prev > 0 ? prev - 1 : 0));
  //   }, 1000);

  //   return () => clearInterval(interval); // Cleanup
  // }, []);
   // Timer for resend OTP
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) return prev - 1;
        setCanResend(true);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []); 

  // ✅ Input handler
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ✅ Back button
  const handleBack = () => {
    navigation.goBack();
  };

  // ✅ Verify action with Firebase
  // const handleVerify = async () => {
  //   const finalOtp = otp.join('');
  //   console.log('Verifying OTP:', finalOtp);

  //   if (finalOtp === '1234') {
  //     try {
  //       await auth().signInAnonymously(); // ✅ Firebase login
  //       navigation.navigate('MainTabs'); // ✅ Navigate on success
  //     } catch (error) {
  //       Alert.alert('Login Failed', error.message);
  //     }
  //   } else {
  //     Alert.alert('Invalid OTP', 'Please enter the correct 4-digit OTP.');
  //   }
  // };

  // Verify OTP
  // Verify OTP
const handleVerify = async () => {
  const finalOtp = otp.join('');
  
  if (finalOtp.length !== 4) {
    Alert.alert('Error', 'Please enter 4-digit OTP');
    return;
  }

  setIsLoading(true);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    console.log('Verifying OTP:', finalOtp, 'for phone:', phoneNumber);
    
    // Hardcoded OTP check - change "1234" to whatever OTP you want to test with
    if (finalOtp === '1234') {
      console.log('✅ OTP verification successful!');
      Alert.alert('Success', 'Login successful!');
      
      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } else {
      console.log('❌ Invalid OTP entered');
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      
      // Clear OTP on error
      setOtp(['', '', '', '']);
      if (inputs.current[0]) {
        inputs.current[0].focus();
      }
    }
    
  } catch (error) {
    console.log('OTP Verification Error:', error);
    Alert.alert('Error', 'Something went wrong. Please try again.');
    
    // Clear OTP on error
    setOtp(['', '', '', '']);
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  } finally {
    setIsLoading(false);
  }
};

  const isOtpComplete = otp.every((d) => d !== '');

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backArrow}>{'\u2190'}</Text>
        </TouchableOpacity>
        <Text style={styles.logoText}>In Luv</Text>
      </View>

      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        Sent to phone number{' '}
        <Text style={styles.bold}>{phoneNumber}</Text>{' '}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <Text style={styles.timerText}>
        {timer > 0
          ? `Resend OTP in 00:${timer.toString().padStart(2, '0')}`
          : 'You can resend OTP now'}
      </Text>

      <TouchableOpacity
        style={[styles.verifyBtn, isOtpComplete && styles.verifyBtnEnabled]}
        disabled={!isOtpComplete}
        onPress={handleVerify}
      >
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FA',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    marginRight: 8,
    color: '#333',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#111',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 40,
    color: '#111',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 8,
    color: '#444',
  },
  bold: {
    fontWeight: 'bold',
  },
  edit: {
    color: '#0057D9',
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  timerText: {
    textAlign: 'left',
    color: '#666',
    marginBottom: 20,
  },
  verifyBtn: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  verifyBtnEnabled: {
    backgroundColor: '#0057D9',
  },
  verifyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OtpScreen;