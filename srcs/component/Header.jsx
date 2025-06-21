// import React from 'react';
// import { View, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
// import { styled } from 'nativewind';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { useNavigation } from '@react-navigation/native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // import { useTheme } from '../component/useTheme';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchable = styled(TouchableOpacity);

// const Header = ({
//   title = 'Screen Title',
//   showBackButton = false,
//   showMenuButton = false,
//   showSearchButton = false,
//   showNotificationButton = false,
//   showSettingsButton = false,
//   showCloseButton = false,
//   onBackPress,
//   onMenuPress,
//   onSearchPress,
//   onNotificationPress,
//   onSettingsPress,
//   onClosePress,
//   backScreenName = null,
//   backScreenParams = {},
//   titleFontWeight = '600',
//   titleFontSize = RFPercentage(2.5),
//   containerStyle = {},
// }) => {
//   const navigation = useNavigation();
//   // const { theme, colors } = useTheme();
//   const insets = useSafeAreaInsets();

//   // Dynamic top padding for status bar
//   const statusBarPadding = Platform.OS === 'android' ? StatusBar.currentHeight || hp(2) : insets.top || hp(2);

//   // Fixed colors for light theme
//   const colors = {
//     background: '#FFFFFF',
//     text: '#000000',
//     border: '#E0E0E0'
//   };

//   const handleBackPress = () => {
//     console.log('Header: Back button pressed');
//     if (onBackPress) {
//       onBackPress();
//     } else if (backScreenName) {
//       navigation.navigate(backScreenName, backScreenParams);
//     } else if (navigation.canGoBack()) {
//       navigation.goBack();
//     }
//   };

//   const handleMenuPress = () => {
//     if (onMenuPress) {
//       onMenuPress();
//     } else {
//       navigation.openDrawer();
//     }
//   };

//   const handleSearchPress = () => {
//     if (onSearchPress) {
//       onSearchPress();
//     }
//   };

//   const handleNotificationPress = () => {
//     if (onNotificationPress) {
//       onNotificationPress();
//     }
//   };

//   const handleSettingsPress = () => {
//     if (onSettingsPress) {
//       onSettingsPress();
//     } else {
//       navigation.navigate('Settings');
//     }
//   };

//   const handleClosePress = () => {
//     if (onClosePress) {
//       onClosePress();
//     }
//   };

//   return (
//     <LinearGradient
//       colors={['#FFFFFF', '#FFFFFF']}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//       style={[
//         {
//           paddingHorizontal: wp(4),
//           paddingTop: statusBarPadding + hp(1),
//           paddingBottom: hp(1),
//           minHeight: hp(8),
//           zIndex: 10,
//           borderBottomWidth: 1,
//           borderBottomColor: colors.border,
//         },
//         containerStyle,
//       ]}
//     >
//       <StyledView className="flex-row justify-between items-center">
//         {/* Left Section */}
//         <StyledView className="flex-row items-center">
//           {showBackButton && (
//             <StyledTouchable
//               onPress={handleBackPress}
//               accessibilityLabel="Go back"
//               className="mr-2"
//             >
//               <Ionicons name="arrow-back" size={RFPercentage(2.8)} color={colors.text} />
//             </StyledTouchable>
//           )}
//           {showMenuButton && (
//             <StyledTouchable
//               onPress={handleMenuPress}
//               accessibilityLabel="Open navigation drawer"
//               className="mr-2"
//             >
//               <Ionicons name="menu" size={RFPercentage(2.8)} color={colors.text} />
//             </StyledTouchable>
//           )}
//         </StyledView>

//         {/* Centered Title */}
//         <StyledView className="absolute left-0 right-0 items-center justify-center">
//           <StyledText
//             style={{
//               fontSize: titleFontSize,
//               fontWeight: titleFontWeight,
//               fontFamily: 'Poppins-Regular',
//               color: colors.text,
//             }}
//           >
//             {title}
//           </StyledText>
//         </StyledView>

//         {/* Right Section */}
//         <StyledView className="flex-row space-x-3">
//           {showSearchButton && (
//             <StyledTouchable
//               onPress={handleSearchPress}
//               accessibilityLabel="Open search filters"
//             >
//               <Ionicons name="search" size={RFPercentage(2.8)} color={colors.text} />
//             </StyledTouchable>
//           )}
//           {showNotificationButton && (
//             <StyledTouchable
//               onPress={handleNotificationPress}
//               accessibilityLabel="View notifications"
//             >
//               <Ionicons name="notifications-outline" size={RFPercentage(2.8)} color={colors.text} />
//             </StyledTouchable>
//           )}
//           {showSettingsButton && (
//             <StyledTouchable
//               onPress={handleSettingsPress}
//               accessibilityLabel="Open settings"
//             >
//               <Ionicons name="settings-outline" size={RFPercentage(2.8)} color={colors.text} />
//             </StyledTouchable>
//           )}
//           {showCloseButton && (
//             <StyledTouchable
//               onPress={handleClosePress}
//               accessibilityLabel="Close screen"
//             >
//               <StyledText
//                 style={{
//                   fontSize: RFPercentage(2),
//                   color: colors.text,
//                   fontFamily: 'Poppins-SemiBold',
//                 }}
//               >
//                 Close
//               </StyledText>
//             </StyledTouchable>
//           )}
//         </StyledView>
//       </StyledView>
//     </LinearGradient>
//   );
// };

// export default Header;

import React from 'react';
import { View, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { styled } from 'nativewind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from './ThemeToggle';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const Header = ({
  title = 'Screen Title',
  showBackButton = false,
  showMenuButton = false,
  showSearchButton = false,
  showNotificationButton = false,
  showSettingsButton = false,
  showCloseButton = false,
  onBackPress,
  onMenuPress,
  onSearchPress,
  onNotificationPress,
  onSettingsPress,
  onClosePress,
  backScreenName = null,
  backScreenParams = {},
  titleFontWeight = '600',
  titleFontSize = RFPercentage(2.5),
  containerStyle = {},
}) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Dynamic top padding for status bar
  const statusBarPadding = Platform.OS === 'android' ? StatusBar.currentHeight || hp(2) : insets.top || hp(2);

  const handleBackPress = () => {
    console.log('Header: Back button pressed');
    if (onBackPress) {
      onBackPress();
    } else if (backScreenName) {
      navigation.navigate(backScreenName, backScreenParams);
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      navigation.openDrawer();
    }
  };

  const handleSearchPress = () => {
    if (onSearchPress) {
      onSearchPress();
    }
  };

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    }
  };

  const handleSettingsPress = () => {
    if (onSettingsPress) {
      onSettingsPress();
    } else {
      navigation.navigate('Settings');
    }
  };

  const handleClosePress = () => {
    if (onClosePress) {
      onClosePress();
    }
  };

  return (
    <LinearGradient
      colors={[theme.header, theme.header]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        {
          paddingHorizontal: wp(4),
          paddingTop: statusBarPadding + hp(1),
          paddingBottom: hp(1),
          minHeight: hp(8),
          zIndex: 10,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        },
        containerStyle,
      ]}
    >
      <StyledView className="flex-row justify-between items-center">
        {/* Left Section */}
        <StyledView className="flex-row items-center">
          {showBackButton && (
            <StyledTouchable
              onPress={handleBackPress}
              accessibilityLabel="Go back"
              className="mr-2"
            >
              <Ionicons name="arrow-back" size={RFPercentage(2.8)} color={theme.text} />
            </StyledTouchable>
          )}
          {showMenuButton && (
            <StyledTouchable
              onPress={handleMenuPress}
              accessibilityLabel="Open navigation drawer"
              className="mr-2"
            >
              <Ionicons name="menu" size={RFPercentage(2.8)} color={theme.text} />
            </StyledTouchable>
          )}
        </StyledView>

        {/* Centered Title */}
        <StyledView className="absolute left-0 right-0 items-center justify-center">
          <StyledText
            style={{
              fontSize: titleFontSize,
              fontWeight: titleFontWeight,
              fontFamily: 'Poppins-Regular',
              color: theme.text,
            }}
          >
            {title}
          </StyledText>
        </StyledView>

        {/* Right Section */}
        <StyledView className="flex-row space-x-3">
          {showSearchButton && (
            <StyledTouchable
              onPress={handleSearchPress}
              accessibilityLabel="Open search filters"
            >
              <Ionicons name="search" size={RFPercentage(2.8)} color={theme.text} />
            </StyledTouchable>
          )}
          {showNotificationButton && (
            <StyledTouchable
              onPress={handleNotificationPress}
              accessibilityLabel="View notifications"
            >
              <Ionicons name="notifications-outline" size={RFPercentage(2.8)} color={theme.text} />
            </StyledTouchable>
          )}
          {showSettingsButton && (
            <StyledTouchable
              onPress={handleSettingsPress}
              accessibilityLabel="Open settings"
            >
              <Ionicons name="settings-outline" size={RFPercentage(2.8)} color={theme.text} />
            </StyledTouchable>
          )}
          {showCloseButton && (
            <StyledTouchable
              onPress={handleClosePress}
              accessibilityLabel="Close screen"
            >
              <StyledText
                style={{
                  fontSize: RFPercentage(2),
                  color: theme.text,
                  fontFamily: 'Poppins-SemiBold',
                }}
              >
                Close
              </StyledText>
            </StyledTouchable>
          )}
        </StyledView>
      </StyledView>
    </LinearGradient>
  );
};

export default Header;