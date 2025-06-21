// // // import React from 'react';
// // // import { TouchableOpacity, View, Text } from 'react-native';
// // // import { styled } from 'nativewind';
// // // import LinearGradient from 'react-native-linear-gradient';
// // // import { RFPercentage } from 'react-native-responsive-fontsize';

// // // const StyledView = styled(View);
// // // const StyledText = styled(Text);
// // // const StyledTouchable = styled(TouchableOpacity);

// // // const CustomButton = ({
// // //   buttonName = 'Button',
// // //   onPress,
// // //   gradientColors = ['#8290EA', '#3F4CA0'],
// // //   start = { x: 0, y: 0 },
// // //   end = { x: 1, y: 0 },
// // //   height = 36, // Default height to approximate py-1
// // //   width = 'auto', // Can be a number (pixels) or string (e.g., '100%')
// // //   containerStyle = {},
// // //   textStyle = {},
// // //   component = null,
// // //   accessibilityLabel = 'Custom button',
// // //   fontSize = RFPercentage(2),
// // //   fontFamily = 'poppins',
// // //   fontWeight = 'medium',
// // // }) => {
// // //   return (
// // //     <StyledTouchable
// // //       onPress={onPress}
// // //       className="flex-row items-center"
// // //       accessibilityLabel={accessibilityLabel}
// // //       style={containerStyle}
// // //     >
// // //       <LinearGradient
// // //         colors={gradientColors}
// // //         start={start}
// // //         end={end}
// // //         className="rounded-lg px-4 flex-row items-center justify-center"
// // //         style={[{ height, width: width === 'auto' ? undefined : width }]}
// // //       >
// // //         {component && <StyledView className="mr-2">{component}</StyledView>}
// // //         <StyledText
// // //           className={`text-white font-${fontFamily} font-${fontWeight}`}
// // //           style={[{ fontSize }, textStyle]}
// // //         >
// // //           {buttonName}
// // //         </StyledText>
// // //       </LinearGradient>
// // //     </StyledTouchable>
// // //   );
// // // };

// // // export default CustomButton;

// // import React from 'react';
// // import { TouchableOpacity, View, Text } from 'react-native';
// // import { styled } from 'nativewind';
// // import LinearGradient from 'react-native-linear-gradient';
// // import { RFPercentage } from 'react-native-responsive-fontsize';

// // const StyledView = styled(View);
// // const StyledText = styled(Text);
// // const StyledTouchable = styled(TouchableOpacity);

// // const CustomButton = ({
// //   buttonName = 'Button',
// //   onPress,
// //   gradientColors = ['#8290EA', '#3F4CA0'],
// //   start = { x: 0, y: 0 },
// //   end = { x: 1, y: 0 },
// //   height = 36,
// //   width = 'auto',
// //   containerStyle = {},
// //   textStyle = {},
// //   component = null,
// //   accessibilityLabel = 'Custom button',
// //   fontSize = RFPercentage(2),
// //   fontFamily = 'poppins',
// //   fontWeight = 'medium',
// //   disabled = false, // Added disabled prop
// // }) => {
// //   return (
// //     <StyledTouchable
// //       onPress={disabled ? undefined : onPress} // Disable onPress when disabled
// //       className="flex-row items-center"
// //       accessibilityLabel={accessibilityLabel}
// //       style={[containerStyle, { opacity: disabled ? 0.6 : 1 }]} // Reduce opacity when disabled
// //       disabled={disabled} // Pass disabled to TouchableOpacity
// //     >
// //       <LinearGradient
// //         colors={gradientColors}
// //         start={start}
// //         end={end}
// //         className="rounded-lg px-4 flex-row items-center justify-center"
// //         style={[{ height, width: width === 'auto' ? undefined : width }]}
// //       >
// //         {component && <StyledView className="mr-2">{component}</StyledView>}
// //         <StyledText
// //           className={`text-white font-${fontFamily} font-${fontWeight}`}
// //           style={[{ fontSize }, textStyle]}
// //         >
// //           {buttonName}
// //         </StyledText>
// //       </LinearGradient>
// //     </StyledTouchable>
// //   );
// // };

// // export default CustomButton;

// import React from 'react';
// import { TouchableOpacity, View, Text } from 'react-native';
// import { styled } from 'nativewind';
// import LinearGradient from 'react-native-linear-gradient';
// import { RFPercentage } from 'react-native-responsive-fontsize';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchable = styled(TouchableOpacity);

// const CustomButton = ({
//   buttonName = 'Button',
//   onPress,
//   gradientColors = ['#8290EA', '#3F4CA0'],
//   start = { x: 0, y: 0 },
//   end = { x: 1, y: 0 },
//   height = 56, // Standardized height
//   width = '100%', // Full width by default
//   containerStyle = {},
//   textStyle = {},
//   component = null,
//   accessibilityLabel = 'Custom button',
//   fontSize = RFPercentage(2),
//   fontFamily = 'poppins',
//   fontWeight = 'semibold',
//   disabled = false,
// }) => {
//   return (
//     <StyledTouchable
//       onPress={disabled ? undefined : onPress}
//       className="flex-row items-center"
//       accessibilityLabel={accessibilityLabel}
//       style={[containerStyle, { opacity: disabled ? 0.6 : 1, alignSelf: 'center' }]}
//       disabled={disabled}
//     >
//       <LinearGradient
//         colors={gradientColors}
//         start={start}
//         end={end}
//         className="rounded-lg px-4 flex-row items-center justify-center"
//         style={[{ height, width: width === 'auto' ? undefined : width }]}
//       >
//         {component && <StyledView className="mr-2">{component}</StyledView>}
//         <StyledText
//           className={`text-white font-${fontFamily} font-${fontWeight}`}
//           style={[{ fontSize }, textStyle]}
//         >
//           {buttonName}
//         </StyledText>
//       </LinearGradient>
//     </StyledTouchable>
//   );
// };

// export default CustomButton;

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styled } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const CustomButton = ({
  buttonName = 'Button',
  onPress,
  gradientColors = ['#8290EA', '#3F4CA0'],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  height = 56,
  width = '100%',
  containerStyle = {},
  textStyle = {},
  component = null,
  accessibilityLabel = 'Custom button',
  fontSize = RFPercentage(2),
  fontFamily = 'poppins',
  fontWeight = 'semibold',
  disabled = false,
  paddingX = 16, // Default to px-4 (≈16px)
}) => {
  return (
    <StyledTouchable
      onPress={disabled ? undefined : onPress}
      className="flex-row items-center"
      accessibilityLabel={accessibilityLabel}
      style={[containerStyle, { opacity: disabled ? 0.6 : 1, alignSelf: 'center' }]}
      disabled={disabled}
    >
      <LinearGradient
        colors={gradientColors}
        start={start}
        end={end}
        className="flex-row items-center justify-center"
        style={[
          {
            height,
            width: width === 'auto' ? undefined : width,
            paddingHorizontal: paddingX,
            borderRadius: containerStyle.borderRadius || 8, // Use container's borderRadius or default
            overflow: 'hidden', // Prevent icon clipping
          },
        ]}
      >
        {component && (
          <StyledView className={buttonName ? 'mr-2' : ''}>{component}</StyledView>
        )}
        {buttonName && (
          <StyledText
            className={`text-white font-${fontFamily} font-${fontWeight}`}
            style={[{ fontSize }, textStyle]}
          >
            {buttonName}
          </StyledText>
        )}
      </LinearGradient>
    </StyledTouchable>
  );
};

export default CustomButton;