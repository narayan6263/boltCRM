import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { userLogin } from '../redux/slice/index';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../component/toastConfig';
import { FontConfig } from '../components/fontSize';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const LoginScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth || {});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef(null);

const handleLogin = async () => {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    Toast.show({
      type: 'error',
      text1: 'No Internet',
      text2: 'Please check your internet connection and try again.',
      text1Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastTitle },
      text2Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastMessage },
    });
    return;
  }

  // Check if fields are empty
  if (!email && !password) {
    Toast.show({
      type: 'error',
      text1: 'Missing Fields',
      text2: 'Please enter both email and password.',
      text1Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastTitle },
      text2Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastMessage },
    });
    return;
  }

  if (!email) {
    Toast.show({
      type: 'error',
      text1: 'Missing Email',
      text2: 'Please enter your email address.',
      text1Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastTitle },
      text2Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastMessage },
    });
    return;
  }

  if (!password) {
    Toast.show({
      type: 'error',
      text1: 'Missing Password',
      text2: 'Please enter your password.',
      text1Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastTitle },
      text2Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastMessage },
    });
    return;
  }

  // Validate email format
  if (!validateEmail(email)) {
    Toast.show({
      type: 'error',
      text1: 'Invalid Email Format',
      text2: 'Please enter a valid email address.',
      text1Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastTitle },
      text2Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastMessage },
    });
    return;
  }

  try {
    const result = await dispatch(userLogin({ email, password })).unwrap();
    console.log('✅ Login Success:', result);

    const expiresAt = result.expiresAt || Date.now() + (result.expiresIn ? result.expiresIn * 1000 : 86400000);
    await AsyncStorage.setItem('tokenExpiresAt', expiresAt.toString());
    await AsyncStorage.setItem('hasLoggedIn', 'true');

    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'Welcome back!',
      text1Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastTitle },
      text2Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastMessage },
    });

    if (result.token) {
      navigation.replace('HomeScreen');
    }
  } catch (error) {
    console.log('❌ Login Error:', error);

    const errorMessage =
      error?.message ||
      error?.response?.data?.message ||
      error?.data?.message ||
      'Something went wrong. Please try again.';

    let toastMessage = 'Login failed. Please try again.';

    // Specific error messages based on server response
    if (errorMessage.toLowerCase().includes('email') && !errorMessage.toLowerCase().includes('password')) {
      toastMessage = 'Incorrect email address.';
    } else if (errorMessage.toLowerCase().includes('password') && !errorMessage.toLowerCase().includes('email')) {
      toastMessage = 'Incorrect password.';
    } else if (errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('password')) {
      toastMessage = 'Incorrect email and password.';
    } else if (errorMessage.toLowerCase().includes('credentials') || errorMessage.toLowerCase().includes('invalid')) {
      toastMessage = 'Invalid credentials. Please check your email and password.';
    }

    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: toastMessage,
      text1Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastTitle },
      text2Style: { fontFamily: FontConfig.fontFamily, fontSize: FontConfig.fontSizes.toastMessage },
    });
  }
};

  return (
    <LinearGradient colors={['#8290EA', '#3F4CA0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: isTablet ? width * 0.15 : width * 0.05,
              paddingVertical: isTablet ? height * 0.1 : height * 0.05,
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: isTablet ? height * 0.04 : height * 0.03,
                left: 16,
                zIndex: 10,
              }}
              onPress={() => navigation.navigate('WelcomeScreen')}
            >
              <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#FFFFFF" />
            </TouchableOpacity>

            <LinearGradient
              colors={['#8290EA', '#3F4CA0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: isTablet ? 120 : 100,
                height: isTablet ? 120 : 100,
                borderRadius: isTablet ? 60 : 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isTablet ? 24 : 16,
                marginTop: isTablet ? 40 : 20,
                ...Platform.select({
                  ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
                  android: { elevation: 5 },
                }),
              }}
            >
              <Image
                source={require('../assets/lead-removebg-preview.png')}
                style={{ width: isTablet ? 80 : 60, height: isTablet ? 80 : 60 }}
                resizeMode="contain"
              />
            </LinearGradient>

            <Text
              style={{
                fontFamily: FontConfig.fontFamily,
                fontSize: isTablet ? FontConfig.fontSizes.heading + 6 : FontConfig.fontSizes.heading + 2,
                color: '#FFFFFF',
                fontWeight: 'bold',
                marginBottom: 8,
              }}
            >
              Lead Verse
            </Text>

            <Text
              style={{
                fontFamily: FontConfig.fontFamily,
                fontSize: isTablet ? FontConfig.fontSizes.subHeading + 2 : FontConfig.fontSizes.subHeading,
                color: '#D1D5DB',
                textAlign: 'center',
                marginBottom: isTablet ? 32 : 24,
                paddingHorizontal: isTablet ? 40 : 20,
              }}
            >
              Discover Amazing Things Near Around You.
            </Text>

            <View
              style={{
                width: isTablet ? width * 0.6 : width * 0.9,
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                padding: isTablet ? 40 : 24,
                ...Platform.select({
                  ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12 },
                  android: { elevation: 6 },
                }),
              }}
            >
              <View style={{ marginBottom: isTablet ? 32 : 24 }}>
                <TextInput
                  style={{
                    fontFamily: FontConfig.fontFamily,
                    fontSize: isTablet ? FontConfig.fontSizes.input + 2 : FontConfig.fontSizes.input,
                    color: '#1A1A1A',
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 10,
                    paddingHorizontal: 16,
                    paddingVertical: isTablet ? 14 : 12,
                    marginBottom: 16,
                    backgroundColor: '#F9FAFB',
                  }}
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    ref={passwordInputRef}
                    style={{
                      flex: 1,
                      fontFamily: FontConfig.fontFamily,
                      fontSize: isTablet ? FontConfig.fontSizes.input + 2 : FontConfig.fontSizes.input,
                      color: '#1A1A1A',
                      borderWidth: 1,
                      borderColor: '#D1D5DB',
                      borderRadius: 10,
                      paddingHorizontal: 16,
                      paddingVertical: isTablet ? 14 : 12,
                      backgroundColor: '#F9FAFB',
                      paddingRight: 50,
                    }}
                    placeholder="Password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                  />
                  <TouchableOpacity
                    style={{ position: 'absolute', right: 16, padding: 8 }}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={isTablet ? 24 : 20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  paddingVertical: isTablet ? 16 : 14,
                  alignItems: 'center',
                  opacity: loading ? 0.7 : 1,
                }}
                onPress={handleLogin}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#8290EA', '#3F4CA0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 10,
                    paddingVertical: isTablet ? 16 : 14,
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FontConfig.fontFamily,
                      fontSize: isTablet ? FontConfig.fontSizes.button + 4 : FontConfig.fontSizes.button + 2,
                      color: '#FFFFFF',
                      fontWeight: '600',
                    }}
                  >
                    {loading ? 'Logging in...' : 'Sign In'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Toast config={toastConfig} />
    </LinearGradient>
  );
};

export default LoginScreen;
