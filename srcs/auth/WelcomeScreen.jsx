import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../font/CustomFont';
import CustomPoppinsFonts from '../font/CustomPoppinsFonts';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = async () => {
    try {
      // Set flag that user has seen welcome screen
      await AsyncStorage.setItem('hasSeenWelcome', 'true');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error setting welcome flag:', error);
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View className="flex-1 bg-gray-100 items-center font-familyFont">
      <StatusBar hidden={true} /> 

      {/* Background Shape */}
      <LinearGradient colors={["#8290EA", "#3F4CA0"]} className="absolute top-0 w-full h-[50%] rounded-b-[165px]" />

      {/* Logo in a perfect circular container */}
      <View className="mt-[330] w-24 h-24 rounded-full bg-[#E8EAF3] shadow-lg items-center justify-center relative">
        {/* Top Link */}
        <Image 
          source={require('../assets/Link.png')} 
          className="w-[52] h-[45] absolute"
          style={{ tintColor: "#4353B6", transform: [{ translateY: -5 }, { translateX: -8 }, { rotate: '-8deg' }] }}
        />

        {/* Bottom Link (adjusted positioning) */}
        <Image 
          source={require('../assets/Link.png')} 
          className="w-[52] h-[45] absolute"
          style={{ transform: [{ translateY: 4 }, { translateX: 5 }, { rotate: '175deg' }] }}
        />
      </View>

      {/* Title & Subtitle */}
      <View className="mt-6 px-6">
        <CustomPoppinsFonts className="text-[25px] font-normal text-[#273240] text-center">
          Lead Verse
        </CustomPoppinsFonts>
        <CustomPoppinsFonts className="text-[#273240] text-[18px] font-normal text-center mt-2">
          Your Business, Your Customers – All in One Place!
        </CustomPoppinsFonts>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity className="mt-[110px] w-[140px] h-[42px]" onPress={handleGetStarted}>
        <LinearGradient
          colors={["#8290EA", "#3F4CA0"]}
          className="w-full h-full rounded-[5px] items-center justify-center"
        >
          <CustomPoppinsFonts className="text-[#FFFFFF] text-[18px] font-normal text-center">
            Get Started
          </CustomPoppinsFonts>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
