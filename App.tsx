import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux/slice/store'; // Redux store
import StackNavigator from './src/navigation/StackNavigator'; // Main navigator
// import DataInitializer from './src/api/DataInitializer'; // Import DataInitializer

const App = () => {
  return (
    <Provider store={store}>
      {/* <DataInitializer> */}
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      {/* </DataInitializer> */}
    </Provider>
  );
};

export default App;



// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { Provider } from 'react-redux';
// // import store from './src/redux/store';
// // import StackNavigator from './src/navigation/StackNavigator';
// // // import { ThemeProvider } from './src/component/ThemeToggle';

// // const App = () => {
// //   return (
// //     <Provider store={store}>
// //       {/* <ThemeProvider> */}
// //         <NavigationContainer>
// //           <StackNavigator />
// //         </NavigationContainer>
// //       {/* </ThemeProvider> */}
// //     </Provider>
// //   );
// // };

// // export default App;

// import React, { Suspense } from 'react';
// import { ActivityIndicator, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from 'react-redux';
// import store from './src/redux/store';
// import StackNavigator from './src/navigation/StackNavigator';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <Suspense
//         fallback={
//           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
//             <ActivityIndicator size="large" color="#1976D2" />
//           </View>
//         }
//       >
//         <NavigationContainer>
//           <StackNavigator />
//         </NavigationContainer>
//       </Suspense>
//     </Provider>
//   );
// };

// export default App;

// import React from 'react';
// import { View ,Button} from 'react-native';
// import {launchCamera} from 'react-native-image-picker';
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';

// const App = () => {

//   const handleCameraLaunch = async (isCamera: boolean) => {
//     const options = {
//       mediaType: isCamera ? 'photo' : 'video',
//     };

//     try {
//       const response = await launchCamera(options);
//       console.log('pickedFile',response);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   const uploadFileOnPressHandler = async () => {
//     try {
//       const pickedFile = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.allFiles],
//       });
//       console.log('pickedFile',pickedFile);
      
//       await RNFS.readFile(pickedFile.uri, 'base64').then(data => {
//         console.log('base64',data);
//       });
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log(err);
//       } else {
//         console.log(error);
//         throw err;
//       }
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//        <Button title="Camera" onPress={async () => {
//               handleCameraLaunch(true);
//           }} />
//        <Button title="Video" onPress={async () => {
//               handleCameraLaunch(false);
//           }} />
//           <Button title="Gallary" onPress={async () => {
//               uploadFileOnPressHandler();
//           }} />
//     </View>
//   );
// };

// export default App;
