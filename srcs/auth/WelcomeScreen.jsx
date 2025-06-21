// // // // // // import React from 'react';
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   Image,
// // // // // //   ImageBackground,
// // // // // //   TouchableOpacity,
// // // // // //   SafeAreaView,
// // // // // //   ScrollView,
// // // // // // } from 'react-native';
// // // // // // import { styled } from 'nativewind';
// // // // // // import { useTheme } from '../component/ThemeToggle';
// // // // // // import { useNavigation } from '@react-navigation/native';
// // // // // // import Header from '../component/Header';
// // // // // // import CustomButton from '../component/CustomButton';
// // // // // // import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// // // // // // import { RFPercentage } from 'react-native-responsive-fontsize';
// // // // // // import { FontConfig } from '../component/FontConfig';

// // // // // // const StyledView = styled(View);
// // // // // // const StyledText = styled(Text);
// // // // // // const StyledSafeAreaView = styled(SafeAreaView);
// // // // // // const StyledScrollView = styled(ScrollView);
// // // // // // const StyledTouchable = styled(TouchableOpacity);

// // // // // // const WelcomeScreen = () => {
// // // // // //   const { theme } = useTheme();
// // // // // //   const navigation = useNavigation();

// // // // // //   return (
// // // // // //     <StyledSafeAreaView className="flex-1">
// // // // // //       <ImageBackground
// // // // // //         source={require('../assets/woman-9554464_1280.webp')} // Local asset path (download and place in assets)
// // // // // //         // source={require('../assets/woman-9554464_1280.jpg')} // Local asset path (download and place in assets)
// // // // // //         style={{ width: '100%', height: '100%' }}
// // // // // //         resizeMode="cover"
// // // // // //       >
// // // // // //         <StyledView className="flex-1 bg-black bg-opacity-50"> {/* Dark overlay for text visibility */}
// // // // // //           {/* <Header
// // // // // //             title="Welcome"
// // // // // //             showMenuButton={true}
// // // // // //             showSettingsButton={true}
// // // // // //           /> */}
// // // // // //           <StyledScrollView
// // // // // //             contentContainerStyle={{
// // // // // //               alignItems: 'center',
// // // // // //               justifyContent: 'center',
// // // // // //               paddingHorizontal: wp(5),
// // // // // //               paddingVertical: hp(10),
// // // // // //             }}
// // // // // //             showsVerticalScrollIndicator={false}
// // // // // //           >
// // // // // //             {/* Added Image within ScrollView */}
// // // // //             // <Image
// // // // //             //   source={{ uri: 'https://cdn.pixabay.com/photo/2025/04/24/05/23/woman-9554464_1280.jpg' }}
// // // // //             //   className="w-full h-[300px] mb-5" // Adjust height as needed
// // // // //             //   resizeMode="cover"
// // // // //             // />

// // // // // //             {/* Logo/Icon (Placeholder) */}
// // // // //             // {/* <Image
// // // // //             //   source={require('../assets/TALENT_LOGO.png')} // Replace with your logo or use the wifi icon
// // // // //             // //   source={require('../assets/TALENT_LOGO.png')} // Replace with your logo or use the wifi icon
// // // // //             //   className="w-12 h-12 mb-5"
// // // // //             //   resizeMode="contain"
// // // // //             // /> */}

// // // // // //             {/* Main Heading */}
// // // // // //             <StyledText
// // // // // //               className="text-3xl mb-4 text-center"
// // // // // //               style={{
// // // // // //                 color: '#FFFFFF',
// // // // // //                 fontFamily: FontConfig.bold,
// // // // // //                 backgroundColor: '#F28C38',
// // // // // //                 paddingHorizontal: wp(5),
// // // // // //                 paddingVertical: hp(1),
// // // // // //                 borderRadius: 10,
// // // // // //               }}
// // // // // //             >
// // // // // //               Start Learning from Anywhere
// // // // // //             </StyledText>

// // // // // //             {/* Subtext */}
// // // // // //             <StyledText
// // // // // //               className="text-base text-center mb-8 px-4"
// // // // // //               style={{
// // // // // //                 color: '#FFFFFF',
// // // // // //                 fontFamily: FontConfig.regular,
// // // // // //                 lineHeight: RFPercentage(2.5),
// // // // // //               }}
// // // // // //             >
// // // // // //               These lessons show you to use digital tools to learn effectively, from the comfort of your own home.
// // // // // //             </StyledText>

// // // // // //             {/* Get Started Button */}
// // // // // //             <CustomButton
// // // // // //               buttonName="Get Started"
// // // // // //               onPress={() => navigation.navigate('LoginScreen')}
// // // // // //               width={wp(80)}
// // // // // //               gradientColors={['#F28C38', '#F28C38']} // Orange gradient
// // // // // //               accessibilityLabel="Navigate to Login Screen"
// // // // // //               fontFamily={FontConfig.semiBold}
// // // // // //               containerStyle={{
// // // // // //                 marginBottom: hp(5),
// // // // // //                 shadowColor: '#000',
// // // // // //                 shadowOffset: { width: 0, height: 4 },
// // // // // //                 shadowOpacity: 0.2,
// // // // // //                 shadowRadius: 6,
// // // // // //                 elevation: 1,
// // // // // //               }}
// // // // // //             />
// // // // // //           </StyledScrollView>
// // // // // //         </StyledView>
// // // // // //       </ImageBackground>
// // // // // //     </StyledSafeAreaView>
// // // // // //   );
// // // // // // };

// // // // // // export default WelcomeScreen;

// // // // // import React, { useRef, useState } from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   FlatList,
// // // // //   Image,
// // // // //   Dimensions,
// // // // //   TouchableOpacity,
// // // // // } from 'react-native';
// // // // // import { useNavigation } from '@react-navigation/native';
// // // // // import { FontConfig } from '../component/FontConfig';
// // // // // import { RFPercentage } from 'react-native-responsive-fontsize';
// // // // // import { styled } from 'nativewind';

// // // // // const { width, height } = Dimensions.get('window');

// // // // // const slides = [
// // // // //   {
// // // // //     id: '1',
// // // // //     image: require('../assets/woman-9554464_1280.webp'),
// // // // //     title: 'Find Professional Trainer',
// // // // //     subtitle: 'Learn from the best instructors from anywhere.',
// // // // //   },
// // // // //   {
// // // // //     id: '2',
// // // // //     image: require('../assets/woman-9554464_1280.webp'),
// // // // //     title: 'Browse Courses',
// // // // //     subtitle: 'Choose from a wide range of available courses.',
// // // // //   },
// // // // //   {
// // // // //     id: '3',
// // // // //     image: require('../assets/woman-9554464_1280.webp'),
// // // // //     title: 'Grow Your Career',
// // // // //     subtitle: 'Upgrade your skills and advance professionally.',
// // // // //   },
// // // // //   {
// // // // //     id: '4',
// // // //     // image: require('../assets/woman-9554464_1280.webp'),
// // // // //     title: 'Join the Community',
// // // // //     subtitle: 'Collaborate and learn with peers around the globe.',
// // // // //   },
// // // // //   {
// // // // //     id: '5',
// // // // //     image: require('../assets/woman-9554464_1280.webp'),
// // // // //     title: 'Start Learning Today',
// // // // //     subtitle: 'Begin your journey with a simple tap.',
// // // // //   },
// // // // // ];

// // // // // const WelcomeScreen = () => {
// // // // //   const flatListRef = useRef();
// // // // //   const navigation = useNavigation();
// // // // //   const [currentIndex, setCurrentIndex] = useState(0);

// // // // //   const handleNext = () => {
// // // // //     if (currentIndex < slides.length - 1) {
// // // // //       flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
// // // // //     } else {
// // // // //       navigation.replace('LoginScreen');
// // // // //     }
// // // // //   };

// // // // //   const onViewableItemsChanged = useRef(({ viewableItems }) => {
// // // // //     if (viewableItems.length > 0) {
// // // // //       setCurrentIndex(viewableItems[0].index);
// // // // //     }
// // // // //   }).current;

// // // // //   const renderSlide = ({ item }) => (
// // // // //     <View className="items-center justify-center w-full h-full px-6">
// // // // //       <Image source={item.image} resizeMode="contain" style={{ width: width * 0.8, height: height * 0.4 }} />
// // // // //       <Text className="text-center text-xl mt-8 mb-4" style={{ fontFamily: FontConfig.bold }}>{item.title}</Text>
// // // // //       <Text className="text-center text-base text-gray-500" style={{ fontFamily: FontConfig.regular, lineHeight: RFPercentage(3) }}>
// // // // //         {item.subtitle}
// // // // //       </Text>
// // // // //     </View>
// // // // //   );

// // // // //   return (
// // // // //     <View className="flex-1 bg-white">
// // // // //       <FlatList
// // // // //         data={slides}
// // // // //         ref={flatListRef}
// // // // //         horizontal
// // // // //         pagingEnabled
// // // // //         showsHorizontalScrollIndicator={false}
// // // // //         keyExtractor={(item) => item.id}
// // // // //         renderItem={renderSlide}
// // // // //         onViewableItemsChanged={onViewableItemsChanged}
// // // // //       />

// // // // //       {/* Dots */}
// // // // //       <View className="flex-row justify-center mt-4">
// // // // //         {slides.map((_, index) => (
// // // // //           <View
// // // // //             key={index}
// // // // //             className={`h-2 rounded-full mx-1 ${index === currentIndex ? 'w-5 bg-orange-500' : 'w-2 bg-gray-300'}`}
// // // // //           />
// // // // //         ))}
// // // // //       </View>

// // // // //       {/* Button */}
// // // // //       <TouchableOpacity
// // // // //         onPress={handleNext}
// // // // //         className="mx-10 mt-6 mb-10 bg-orange-500 py-3 rounded-full items-center"
// // // // //       >
// // // // //         <Text className="text-white text-base" style={{ fontFamily: FontConfig.semiBold }}>
// // // // //           {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
// // // // //         </Text>
// // // // //       </TouchableOpacity>
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // export default WelcomeScreen;
// // // // import React, { useRef, useState } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   FlatList,
// // // //   Image,
// // // //   Dimensions,
// // // //   TouchableOpacity,
// // // //   StyleSheet,
// // // // } from 'react-native';
// // // // import { useNavigation } from '@react-navigation/native';
// // // // import { FontConfig } from '../component/FontConfig';
// // // // import { RFPercentage } from 'react-native-responsive-fontsize';

// // // // const { width, height } = Dimensions.get('window');

// // // // const slides = [
// // // //   {
// // // //     id: '1',
// // // //     image: require('../assets/woman-9554464_1280.webp'),
// // // //     title: 'Find Professional Trainer',
// // // //     subtitle: 'Learn from the best instructors from anywhere.',
// // // //   },
// // // //   {
// // // //     id: '2',
// // //     // image: require('../assets/woman-9554464_1280.webp'),
// // // //     title: 'Browse Courses',
// // // //     subtitle: 'Choose from a wide range of available courses.',
// // // //   },
// // // //   {
// // // //     id: '3',
// // // //     image: require('../assets/woman-9554464_1280.webp'),
// // // //     title: 'Grow Your Career',
// // // //     subtitle: 'Upgrade your skills and advance professionally.',
// // // //   },
// // // //   {
// // // //     id: '4',
// // // //     image: require('../assets/woman-9554464_1280.webp'),
// // // //     title: 'Join the Community',
// // // //     subtitle: 'Collaborate and learn with peers around the globe.',
// // // //   },
// // // //   {
// // // //     id: '5',
// // // //     image: require('../assets/woman-9554464_1280.webp'),
// // // //     title: 'Start Learning Today',
// // // //     subtitle: 'Begin your journey with a simple tap.',
// // // //   },
// // // // ];

// // // // const WelcomeScreen = () => {
// // // //   const navigation = useNavigation();
// // // //   const flatListRef = useRef(null);
// // // //   const [currentIndex, setCurrentIndex] = useState(0);

// // // //   const handleNext = () => {
// // // //     if (currentIndex < slides.length - 1) {
// // // //       flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
// // // //     } else {
// // // //       navigation.replace('LoginScreen');
// // // //     }
// // // //   };

// // // //   const onViewableItemsChanged = useRef(({ viewableItems }) => {
// // // //     if (viewableItems.length > 0) {
// // // //       setCurrentIndex(viewableItems[0].index);
// // // //     }
// // // //   }).current;

// // // //   const renderSlide = ({ item }) => (
// // // //     <View style={styles.slideContainer}>
// // // //       <View style={styles.card}>
// // // //         <Image
// // // //           source={item.image}
// // // //           resizeMode="contain"
// // // //           style={styles.image}
// // // //         />
// // // //         <Text style={styles.title}>{item.title}</Text>
// // // //         <Text style={styles.subtitle}>{item.subtitle}</Text>
// // // //       </View>
// // // //     </View>
// // // //   );

// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <FlatList
// // // //         ref={flatListRef}
// // // //         data={slides}
// // // //         horizontal
// // // //         pagingEnabled
// // // //         showsHorizontalScrollIndicator={false}
// // // //         keyExtractor={(item) => item.id}
// // // //         renderItem={renderSlide}
// // // //         onViewableItemsChanged={onViewableItemsChanged}
// // // //       />

// // // //       {/* Dots Indicator */}
// // // //       <View style={styles.dotsContainer}>
// // // //         {slides.map((_, index) => (
// // // //           <View
// // // //             key={index}
// // // //             style={[
// // // //               styles.dot,
// // // //               currentIndex === index && styles.activeDot,
// // // //             ]}
// // // //           />
// // // //         ))}
// // // //       </View>

// // // //       {/* Button */}
// // // //       <TouchableOpacity
// // // //         style={styles.button}
// // // //         onPress={handleNext}
// // // //       >
// // // //         <Text style={styles.buttonText}>
// // // //           {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
// // // //         </Text>
// // // //       </TouchableOpacity>
// // // //     </View>
// // // //   );
// // // // };

// // // // export default WelcomeScreen;

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: '#F3F4F6',
// // // //   },
// // // //   slideContainer: {
// // // //     width,
// // // //     alignItems: 'center',
// // // //     justifyContent: 'center',
// // // //     paddingVertical: 40,
// // // //   },
// // // //   card: {
// // // //     backgroundColor: 'white',
// // // //     borderRadius: 25,
// // // //     padding: 30,
// // // //     alignItems: 'center',
// // // //     width: width * 0.85,
// // // //     shadowColor: '#000',
// // // //     shadowOffset: { width: 0, height: 10 },
// // // //     shadowOpacity: 0.1,
// // // //     shadowRadius: 20,
// // // //     elevation: 6,
// // // //   },
// // // //   image: {
// // // //     width: width * 0.6,
// // // //     height: height * 0.35,
// // // //     marginBottom: 30,
// // // //   },
// // // //   title: {
// // // //     fontSize: RFPercentage(3),
// // // //     fontFamily: FontConfig.bold,
// // // //     color: '#111827',
// // // //     textAlign: 'center',
// // // //     marginBottom: 15,
// // // //   },
// // // //   subtitle: {
// // // //     fontSize: RFPercentage(2),
// // // //     fontFamily: FontConfig.regular,
// // // //     color: '#6B7280',
// // // //     textAlign: 'center',
// // // //     lineHeight: RFPercentage(3),
// // // //   },
// // // //   dotsContainer: {
// // // //     flexDirection: 'row',
// // // //     justifyContent: 'center',
// // // //     marginVertical: 20,
// // // //   },
// // // //   dot: {
// // // //     width: 8,
// // // //     height: 8,
// // // //     backgroundColor: '#D1D5DB',
// // // //     borderRadius: 4,
// // // //     marginHorizontal: 5,
// // // //   },
// // // //   activeDot: {
// // // //     width: 20,
// // // //     backgroundColor: '#F28C38',
// // // //   },
// // // //   button: {
// // // //     backgroundColor: '#F28C38',
// // // //     marginHorizontal: 40,
// // // //     marginBottom: 30,
// // // //     borderRadius: 30,
// // // //     paddingVertical: 15,
// // // //     alignItems: 'center',
// // // //   },
// // // //   buttonText: {
// // // //     color: '#fff',
// // // //     fontSize: RFPercentage(2.2),
// // // //     fontFamily: FontConfig.semiBold,
// // // //   },
// // // // });


// // // import React, { useRef, useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   FlatList,
// // //   Image,
// // //   Dimensions,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // // } from 'react-native';
// // // import { useNavigation } from '@react-navigation/native';
// // // import { FontConfig } from '../component/FontConfig';
// // // import { RFPercentage } from 'react-native-responsive-fontsize';

// // // const { width, height } = Dimensions.get('window');

// // // const slides = [
// // //   {
// // //     id: '1',
// // //     image: require('../assets/woman-9554464_1280.webp'),
// // //     title: 'Find Professional Trainer',
// // //     subtitle: 'Learn from the best instructors from anywhere.',
// // //   },
// // //   {
// // //     id: '2',
// // //     image: require('../assets/woman-9554464_1280.webp'),
// // //     title: 'Browse Courses',
// // //     subtitle: 'Choose from a wide range of available courses.',
// // //   },
// // //   {
// // //     id: '3',
// // //     image: require('../assets/woman-9554464_1280.webp'),
// // //     title: 'Grow Your Career',
// // //     subtitle: 'Upgrade your skills and advance professionally.',
// // //   },
// // //   {
// // //     id: '4',
// // //     image: require('../assets/woman-9554464_1280.webp'),
// // //     title: 'Join the Community',
// // //     subtitle: 'Collaborate and learn with peers around the globe.',
// // //   },
// // //   {
// // //     id: '5',
// // //     image: require('../assets/woman-9554464_1280.webp'),
// // //     title: 'Start Learning Today',
// // //     subtitle: 'Begin your journey with a simple tap.',
// // //   },
// // // ];

// // // const WelcomeScreen = () => {
// // //   const navigation = useNavigation();
// // //   const flatListRef = useRef(null);
// // //   const [currentIndex, setCurrentIndex] = useState(0);

// // //   // Auto-scroll every 3 seconds
// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       if (currentIndex < slides.length - 1) {
// // //         flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
// // //       } else {
// // //         clearInterval(interval);
// // //       }
// // //     }, 3000);

// // //     return () => clearInterval(interval);
// // //   }, [currentIndex]);

// // //   const onViewableItemsChanged = useRef(({ viewableItems }) => {
// // //     if (viewableItems.length > 0) {
// // //       setCurrentIndex(viewableItems[0].index);
// // //     }
// // //   }).current;

// // //   const renderSlide = ({ item }) => (
// // //     <View style={styles.slide}>
// // //       <Image source={item.image} resizeMode="contain" style={styles.image} />
// // //       <Text style={styles.title}>{item.title}</Text>
// // //       <Text style={styles.subtitle}>{item.subtitle}</Text>
// // //     </View>
// // //   );

// // //   const handleNext = () => {
// // //     if (currentIndex < slides.length - 1) {
// // //       flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
// // //     } else {
// // //       navigation.replace('LoginScreen');
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       {/* Phone Frame */}
// // //       <View style={styles.phoneFrame}>
// // //         <FlatList
// // //           ref={flatListRef}
// // //           data={slides}
// // //           keyExtractor={(item) => item.id}
// // //           renderItem={renderSlide}
// // //           horizontal
// // //           pagingEnabled
// // //           showsHorizontalScrollIndicator={false}
// // //           onViewableItemsChanged={onViewableItemsChanged}
// // //         />
// // //       </View>

// // //       {/* Dots */}
// // //       <View style={styles.dotsContainer}>
// // //         {slides.map((_, index) => (
// // //           <View
// // //             key={index}
// // //             style={[
// // //               styles.dot,
// // //               currentIndex === index && styles.activeDot,
// // //             ]}
// // //           />
// // //         ))}
// // //       </View>

// // //       {/* Next/Get Started Button */}
// // //       <TouchableOpacity style={styles.button} onPress={handleNext}>
// // //         <Text style={styles.buttonText}>
// // //           {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
// // //         </Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   );
// // // };

// // // export default WelcomeScreen;

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#EFEFF3',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //   },
// // //   phoneFrame: {
// // //     width: width * 0.85,
// // //     height: height * 0.7,
// // //     borderRadius: 40,
// // //     backgroundColor: '#FFFFFF',
// // //     padding: 25,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 10 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 20,
// // //     elevation: 8,
// // //   },
// // //   slide: {
// // //     width: width * 0.85 - 50, // padding margin adjustment
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //   },
// // //   image: {
// // //     width: '100%',
// // //     height: height * 0.3,
// // //     marginBottom: 30,
// // //   },
// // //   title: {
// // //     fontSize: RFPercentage(3),
// // //     fontFamily: FontConfig.bold,
// // //     color: '#1F2937',
// // //     textAlign: 'center',
// // //     marginBottom: 15,
// // //   },
// // //   subtitle: {
// // //     fontSize: RFPercentage(2),
// // //     fontFamily: FontConfig.regular,
// // //     color: '#6B7280',
// // //     textAlign: 'center',
// // //     lineHeight: RFPercentage(3),
// // //   },
// // //   dotsContainer: {
// // //     flexDirection: 'row',
// // //     marginTop: 20,
// // //   },
// // //   dot: {
// // //     width: 8,
// // //     height: 8,
// // //     backgroundColor: '#D1D5DB',
// // //     borderRadius: 4,
// // //     marginHorizontal: 4,
// // //   },
// // //   activeDot: {
// // //     width: 20,
// // //     backgroundColor: '#F28C38',
// // //   },
// // //   button: {
// // //     backgroundColor: '#F28C38',
// // //     marginTop: 20,
// // //     paddingVertical: 14,
// // //     paddingHorizontal: 50,
// // //     borderRadius: 30,
// // //   },
// // //   buttonText: {
// // //     color: 'white',
// // //     fontSize: RFPercentage(2.2),
// // //     fontFamily: FontConfig.semiBold,
// // //   },
// // // });


// // import React, { useRef, useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   Image,
// //   Dimensions,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Animated,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { FontConfig } from '../component/FontConfig';
// // import { RFPercentage } from 'react-native-responsive-fontsize';

// // const { width, height } = Dimensions.get('window');

// // const slides = [
// //   {
// //     id: '1',
// //     image: require('../assets/woman-9554464_1280.webp'),
// //     title: 'Find Professional Trainer',
// //     subtitle: 'Learn from the best instructors from anywhere.',
// //   },
// //   {
// //     id: '2',
// //     image: require('../assets/woman-9554464_1280.webp'),
// //     title: 'Browse Courses',
// //     subtitle: 'Choose from a wide range of available courses.',
// //   },
// //   {
// //     id: '3',
// //     image: require('../assets/woman-9554464_1280.webp'),
// //     title: 'Grow Your Career',
// //     subtitle: 'Upgrade your skills and advance professionally.',
// //   },
// //   {
// //     id: '4',
// //     image: require('../assets/woman-9554464_1280.webp'),
// //     title: 'Join the Community',
// //     subtitle: 'Collaborate and learn with peers around the globe.',
// //   },
// //   {
// //     id: '5',
// //     image: require('../assets/woman-9554464_1280.webp'),
// //     title: 'Start Learning Today',
// //     subtitle: 'Begin your journey with a simple tap.',
// //   },
// // ];

// // const WelcomeScreen = () => {
// //   const navigation = useNavigation();
// //   const flatListRef = useRef(null);
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   // Auto-scroll with infinite looping
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       const nextIndex = (currentIndex + 1) % slides.length;
// //       flatListRef.current?.scrollToIndex({
// //         index: nextIndex,
// //         animated: true,
// //       });
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, [currentIndex]);

// //   const onViewableItemsChanged = useRef(({ viewableItems }) => {
// //     if (viewableItems.length > 0) {
// //       setCurrentIndex(viewableItems[0].index);
// //     }
// //   }).current;

// //   const renderSlide = ({ item }) => (
// //     <View style={styles.slide}>
// //       <Image source={item.image} resizeMode="contain" style={styles.image} />
// //       <Text style={styles.title}>{item.title}</Text>
// //       <Text style={styles.subtitle}>{item.subtitle}</Text>
// //     </View>
// //   );

// //   const handleGetStarted = () => {
// //     navigation.replace('LoginScreen');
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {/* Phone Frame */}
// //       <View style={styles.phoneFrame}>
// //         <FlatList
// //           ref={flatListRef}
// //           data={slides}
// //           keyExtractor={(item) => item.id}
// //           renderItem={renderSlide}
// //           horizontal
// //           pagingEnabled
// //           showsHorizontalScrollIndicator={false}
// //           onViewableItemsChanged={onViewableItemsChanged}
// //         />
// //       </View>

// //       {/* Dots */}
// //       <View style={styles.dotsContainer}>
// //         {slides.map((_, index) => (
// //           <View
// //             key={index}
// //             style={[
// //               styles.dot,
// //               currentIndex === index && styles.activeDot,
// //             ]}
// //           />
// //         ))}
// //       </View>

// //       {/* Always Visible Get Started Button */}
// //       <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
// //         <Text style={styles.buttonText}>Get Started</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // export default WelcomeScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#EFEFF3',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   phoneFrame: {
// //     width: width * 0.85,
// //     height: height * 0.7,
// //     borderRadius: 40,
// //     backgroundColor: '#FFFFFF',
// //     padding: 25,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 10 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 20,
// //     elevation: 8,
// //   },
// //   slide: {
// //     width: width * 0.85 - 50,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   image: {
// //     width: '100%',
// //     height: height * 0.4, // Increased image size
// //     marginBottom: 30,
// //   },
// //   title: {
// //     fontSize: RFPercentage(3),
// //     fontFamily: FontConfig.bold,
// //     color: '#1F2937',
// //     textAlign: 'center',
// //     marginBottom: 15,
// //   },
// //   subtitle: {
// //     fontSize: RFPercentage(2),
// //     fontFamily: FontConfig.regular,
// //     color: '#6B7280',
// //     textAlign: 'center',
// //     lineHeight: RFPercentage(3),
// //   },
// //   dotsContainer: {
// //     flexDirection: 'row',
// //     marginTop: 20,
// //   },
// //   dot: {
// //     width: 8,
// //     height: 8,
// //     backgroundColor: '#D1D5DB',
// //     borderRadius: 4,
// //     marginHorizontal: 4,
// //   },
// //   activeDot: {
// //     width: 20,
// //     backgroundColor: '#F28C38',
// //   },
// //   button: {
// //     backgroundColor: '#F28C38',
// //     marginTop: 20,
// //     paddingVertical: 14,
// //     paddingHorizontal: 50,
// //     borderRadius: 30,
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: RFPercentage(2.2),
// //     fontFamily: FontConfig.semiBold,
// //   },
// // });


// import React, { useRef, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { FontConfig } from '../component/FontConfig';
// import { RFPercentage } from 'react-native-responsive-fontsize';

// const { width, height } = Dimensions.get('window');

// const slides = [
//   {
//     id: '1',
//     image: require('../assets/woman-9554464_1280.webp'),
//     title: 'Find Professional Trainer',
//     subtitle: 'Learn from the best instructors from anywhere.',
//   },
//   {
//     id: '2',
//     image: require('../assets/woman-9554464_1280.webp'),
//     title: 'Browse Courses',
//     subtitle: 'Choose from a wide range of available courses.',
//   },
//   {
//     id: '3',
//     image: require('../assets/woman-9554464_1280.webp'),
//     title: 'Grow Your Career',
//     subtitle: 'Upgrade your skills and advance professionally.',
//   },
//   {
//     id: '4',
//     image: require('../assets/woman-9554464_1280.webp'),
//     title: 'Join the Community',
//     subtitle: 'Collaborate and learn with peers around the globe.',
//   },
//   {
//     id: '5',
//     image: require('../assets/woman-9554464_1280.webp'),
//     title: 'Start Learning Today',
//     subtitle: 'Begin your journey with a simple tap.',
//   },
// ];

// const WelcomeScreen = () => {
//   const navigation = useNavigation();
//   const flatListRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto-scroll with infinite looping
// useEffect(() => {
//   const interval = setInterval(() => {
//     const nextIndex = currentIndex + 1;

//     if (nextIndex < slides.length) {
//       flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//     } else {
//       // Instantly jump to the first slide without animation
//       flatListRef.current?.scrollToIndex({ index: 0, animated: false });
//     }
//   }, 2000); // faster speed (2 seconds)

//   return () => clearInterval(interval);
// }, [currentIndex]);


//   const onViewableItemsChanged = useRef(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setCurrentIndex(viewableItems[0].index);
//     }
//   }).current;

//   const renderSlide = ({ item }) => (
//     <View style={styles.slide}>
//       <Image source={item.image} resizeMode="contain" style={styles.image} />
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.subtitle}>{item.subtitle}</Text>
//     </View>
//   );

//   const handleGetStarted = () => {
//     navigation.replace('Login');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Phone Frame */}
//       <View style={styles.phoneFrame}>
//         <FlatList
//           ref={flatListRef}
//           data={slides}
//           keyExtractor={(item) => item.id}
//           renderItem={renderSlide}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onViewableItemsChanged={onViewableItemsChanged}
//         />
//       </View>

//       {/* Dots */}
//       <View style={styles.dotsContainer}>
//         {slides.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.dot,
//               currentIndex === index && styles.activeDot,
//             ]}
//           />
//         ))}
//       </View>

//       {/* Always Visible Get Started Button */}
//       <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
//         <Text style={styles.buttonText}>Get Started</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default WelcomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EFEFF3',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   phoneFrame: {
//     width: width * 0.85,
//     height: height * 0.7,
//     borderRadius: 40,
//     backgroundColor: '#FFFFFF',
//     padding: 25,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 8,
//   },
//   slide: {
//     width: width * 0.85 - 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: '100%',
//     height: height * 0.4, // Increased image size
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: RFPercentage(3),
//     fontFamily: FontConfig.bold,
//     color: '#1F2937',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   subtitle: {
//     fontSize: RFPercentage(2),
//     fontFamily: FontConfig.regular,
//     color: '#6B7280',
//     textAlign: 'center',
//     lineHeight: RFPercentage(3),
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     backgroundColor: '#D1D5DB',
//     borderRadius: 4,
//     marginHorizontal: 4,
//   },
//   activeDot: {
//     width: 20,
//     backgroundColor: '#F28C38',
//   },
//   button: {
//     backgroundColor: '#F28C38',
//     marginTop: 20,
//     paddingVertical: 14,
//     paddingHorizontal: 50,
//     borderRadius: 30,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: RFPercentage(2.2),
//     fontFamily: FontConfig.semiBold,
//   },
// });


import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontConfig } from '../component/FontConfig';
import { RFPercentage } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../assets/woman-9554464_1280.webp'),
    title: 'Find Professional Trainer',
    subtitle: 'Learn from the best instructors from anywhere.',
  },
  {
    id: '2',
    image: require('../assets/woman-9554464_1280.webp'),
    title: 'Browse Courses',
    subtitle: 'Choose from a wide range of available courses.',
  },
  {
    id: '3',
    image: require('../assets/woman-9554464_1280.webp'),
    title: 'Grow Your Career',
    subtitle: 'Upgrade your skills and advance professionally.',
  },
];

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} resizeMode="contain" style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  const handleGetStarted = () => {
    navigation.replace('Login');
  };

  return (
    <LinearGradient colors={['#9C27B0', '#6A1B9A']} style={styles.container}>
      {/* White Card Frame */}
      <View style={styles.phoneFrame}>
        <FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(item) => item.id}
          renderItem={renderSlide}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      </View>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneFrame: {
    width: width * 0.85,
    height: height * 0.7,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  slide: {
    width: width * 0.85 - 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.35,
    marginBottom: 30,
  },
  title: {
    fontSize: RFPercentage(3),
    fontFamily: FontConfig.bold,
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: RFPercentage(2),
    fontFamily: FontConfig.regular,
    color: '#666',
    textAlign: 'center',
    lineHeight: RFPercentage(3),
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#D1D5DB',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#9C27B0',
  },
  button: {
    backgroundColor: '#9C27B0',
    marginTop: 25,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: RFPercentage(2.2),
    fontFamily: FontConfig.semiBold,
  },
});
