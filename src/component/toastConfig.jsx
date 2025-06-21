// // // toastConfig.js
// // import React from 'react';
// // import { View } from 'react-native';
// // import Text from '../font/CustomFont';
// // import { FontConfig } from '../components/fontSize'; // Import FontConfig

// // export const toastConfig = {
// //   success: ({ text1, text2, ...rest }) => (
// //     <View
// //       style={{
// //         backgroundColor: 'green',
// //         padding: 16,
// //         borderRadius: 8,
// //         marginHorizontal: 20,
// //         marginTop: 40,
// //       }}
// //     >
// //       <Text
// //         style={{
// //           color: 'white',
// //           fontWeight: 'bold',
// //           fontSize: FontConfig.fontSizes.toastTitle,
// //           fontFamily: FontConfig.fontFamily,
// //         }}
// //       >
// //         {text1}
// //       </Text>
// //       {text2 && (
// //         <Text
// //           style={{
// //             color: 'white',
// //             marginTop: 4,
// //             fontSize: FontConfig.fontSizes.toastMessage,
// //             fontFamily: FontConfig.fontFamily,
// //           }}
// //         >
// //           {text2}
// //         </Text>
// //       )}
// //       <View style={{ height: 2, backgroundColor: 'white', marginTop: 8 }} />
// //     </View>
// //   ),

// //   error: ({ text1, text2, ...rest }) => (
// //     <View
// //       style={{
// //         backgroundColor: 'red',
// //         padding: 16,
// //         borderRadius: 8,
// //         marginHorizontal: 20,
// //         marginTop: 40,
// //       }}
// //     >
// //       <Text
// //         style={{
// //           color: 'white',
// //           fontWeight: 'bold',
// //           fontSize: FontConfig.fontSizes.toastTitle,
// //           fontFamily: FontConfig.fontFamily,
// //         }}
// //       >
// //         {text1}
// //       </Text>
// //       {text2 && (
// //         <Text
// //           style={{
// //             color: 'white',
// //             marginTop: 4,
// //             fontSize: FontConfig.fontSizes.toastMessage,
// //             fontFamily: FontConfig.fontFamily,
// //           }}
// //         >
// //           {text2}
// //         </Text>
// //       )}
// //       <View style={{ height: 2, backgroundColor: 'white', marginTop: 8 }} />
// //     </View>
// //   ),
// // };




// // // src/components/toastConfig.js
// // import React, { useContext } from 'react';
// // import { View } from 'react-native';
// // import Text from '../font/CustomFont';
// // import { FontConfig } from '../components/fontSize';
// // import { ThemeContext } from '../components/context/ThemeContext';

// // export const toastConfig = {
// //   success: ({ text1, text2, ...rest }) => {
// //     const { colors } = useContext(ThemeContext);
// //     return (
// //       <View
// //         style={{
// //           backgroundColor: colors.toastSuccessBackground,
// //           padding: 16,
// //           borderRadius: 8,
// //           marginHorizontal: 20,
// //           marginTop: 40,
// //         }}
// //       >
// //         <Text
// //           style={{
// //             color: colors.toastText,
// //             fontWeight: 'bold',
// //             fontSize: FontConfig.fontSizes.toastTitle,
// //             fontFamily: FontConfig.fontFamily,
// //           }}
// //         >
// //           {text1}
// //         </Text>
// //         {text2 && (
// //           <Text
// //             style={{
// //               color: colors.toastText,
// //               marginTop: 4,
// //               fontSize: FontConfig.fontSizes.toastMessage,
// //               fontFamily: FontConfig.fontFamily,
// //             }}
// //           >
// //             {text2}
// //           </Text>
// //         )}
// //         <View style={{ height: 2, backgroundColor: colors.toastText, marginTop: 8 }} />
// //       </View>
// //     );
// //   },

// //   error: ({ text1, text2, ...rest }) => {
// //     const { colors } = useContext(ThemeContext);
// //     return (
// //       <View
// //         style={{
// //           backgroundColor: colors.toastErrorBackground,
// //           padding: 16,
// //           borderRadius: 8,
// //           marginHorizontal: 20,
// //           marginTop: 40,
// //         }}
// //       >
// //         <Text
// //           style={{
// //             color: colors.toastText,
// //             fontWeight: 'bold',
// //             fontSize: FontConfig.fontSizes.toastTitle,
// //             fontFamily: FontConfig.fontFamily,
// //           }}
// //         >
// //           {text1}
// //         </Text>
// //         {text2 && (
// //           <Text
// //             style={{
// //               color: colors.toastText,
// //               marginTop: 4,
// //               fontSize: FontConfig.fontSizes.toastMessage,
// //               fontFamily: FontConfig.fontFamily,
// //             }}
// //           >
// //             {text2}
// //           </Text>
// //         )}
// //         <View style={{ height: 2, backgroundColor: colors.toastText, marginTop: 8 }} />
// //       </View>
// //     );
// //   },
// // };


// import React from 'react';
// import { View,Text } from 'react-native';
// // import Text from '../font/CustomFont';
// import { FontConfig } from '../components/fontSize'; // Assuming this is the correct path

// export const toastConfig = {
//   success: ({ text1, text2, ...rest }) => (
//     <View
//       style={{
//         backgroundColor: 'green',
//         padding: 12, // Reduced padding to decrease height
//         borderRadius: 8,
//         marginHorizontal: 10, // Reduced margin for compactness
//         marginTop: 10, // Adjusted to position closer to top
//         alignSelf: 'flex-end', // Align to the right
//         width: '80%', // Control width to prevent full-screen stretch
//         maxWidth: 300, // Cap width for better appearance
//       }}
//     >
//       <Text
//         style={{
//           color: 'white',
//           fontWeight: 'bold',
//           fontSize: FontConfig.fontSizes.toastTitle,
//           fontFamily: FontConfig.fontFamily,
//         }}
//       >
//         {text1}
//       </Text>
//       {text2 && (
//         <Text
//           style={{
//             color: 'white',
//             marginTop: 2, // Reduced margin to decrease height
//             fontSize: FontConfig.fontSizes.toastMessage,
//             fontFamily: FontConfig.fontFamily,
//           }}
//         >
//           {text2}
//         </Text>
//       )}
//       <View style={{ height: 1, backgroundColor: 'white', marginTop: 6 }} /> {/* Reduced separator height */}
//     </View>
//   ),

//   error: ({ text1, text2, ...rest }) => (
//     <View
//       style={{
//         backgroundColor: 'red',
//         padding: 12, // Reduced padding to decrease height
//         borderRadius: 8,
//         marginHorizontal: 10, // Reduced margin for compactness
//         marginTop: 2, // Adjusted to position closer to top
//         alignSelf: 'flex-end', // Align to the right
//         width: '80%', // Control width to prevent full-screen stretch
//         maxWidth: 300, // Cap width for better appearance
//       }}
//     >
//       <Text
//         style={{
//           color: 'white',
//           fontWeight: 'bold',
//           fontSize: FontConfig.fontSizes.toastTitle,
//           fontFamily: FontConfig.fontFamily,
//         }}
//       >
//         {text1}
//       </Text>
//       {text2 && (
//         <Text
//           style={{
//             color: 'white',
//             marginTop: 2, // Reduced margin to decrease height
//             fontSize: FontConfig.fontSizes.toastMessage,
//             fontFamily: FontConfig.fontFamily,
//           }}
//         >
//           {text2}
//         </Text>
//       )}
//       <View style={{ height: 1, backgroundColor: 'white', marginTop: 6 }} /> {/* Reduced separator height */}
//     </View>
//   ),
// };

// ../components/toastConfig.js (temporary test)


import React from 'react';
import { View, Text } from 'react-native'; // Import Text
import { FontConfig } from '../components/fontSize';

export const toastConfig = {
  success: ({ text1, text2, ...rest }) => (
    <View
      style={{
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 10,
        marginTop: 10,
        alignSelf: 'flex-end',
        width: '80%',
        maxWidth: 300,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: FontConfig.fontSizes.toastTitle,
          fontFamily: FontConfig.fontFamily,
        }}
      >
        {text1}
      </Text>
      {text2 && (
        <Text
          style={{
            color: 'white',
            marginTop: 2,
            fontSize: FontConfig.fontSizes.toastMessage,
            fontFamily: FontConfig.fontFamily,
          }}
        >
          {text2}
        </Text>
      )}
      <View style={{ height: 1, backgroundColor: 'white', marginTop: 6 }} />
    </View>
  ),
  error: ({ text1, text2, ...rest }) => (
    <View
      style={{
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 10,
        marginTop: 2,
        alignSelf: 'flex-end',
        width: '80%',
        maxWidth: 300,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: FontConfig.fontSizes.toastTitle,
          fontFamily: FontConfig.fontFamily,
        }}
      >
        {text1}
      </Text>
      {text2 && (
        <Text
          style={{
            color: 'white',
            marginTop: 2,
            fontSize: FontConfig.fontSizes.toastMessage,
            fontFamily: FontConfig.fontFamily,
          }}
        >
          {text2}
        </Text>
      )}
      <View style={{ height: 1, backgroundColor: 'white', marginTop: 6 }} />
    </View>
  ),
};