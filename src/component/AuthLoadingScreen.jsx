// import React, { useEffect, useState } from "react";
// import { View, ActivityIndicator, Text } from "react-native";
// import { useSelector } from "react-redux";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import jwtDecode from "jwt-decode";

// const AuthLoadingScreen = () => {
//   const navigation = useNavigation();
//   const { token, orgId } = useSelector((state) => state.auth || {});
//   const [isRehydrated, setIsRehydrated] = useState(false);

//   useEffect(() => {
//     const checkAuthState = async () => {
//       try {
//         // Wait for redux-persist to rehydrate
//         setTimeout(async () => {
//           console.log("🔄 Checking auth state...");
//           console.log("Redux token:", token, "orgId:", orgId);

//           // Fallback to AsyncStorage if Redux state is not populated
//           const storedToken = await AsyncStorage.getItem("authToken");
//           const storedOrgId = await AsyncStorage.getItem("orgId");

//           console.log("📦 AsyncStorage token:", storedToken, "orgId:", storedOrgId);

//           // Use Redux state if available, otherwise fallback to AsyncStorage
//           const authToken = token || storedToken;
//           const organizationId = orgId || storedOrgId;

//           if (authToken && organizationId) {
//             try {
//               // Decode JWT to check expiration
//               const decodedToken = jwtDecode(authToken);
//               const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

//               console.log("🔍 Decoded JWT:", decodedToken);
//               console.log("⏰ Current time:", currentTime, "Token exp:", decodedToken.exp);

//               if (decodedToken.exp && decodedToken.exp > currentTime) {
//                 console.log("✅ Token is valid and not expired, navigating to HomeScreen");
//                 navigation.replace("HomeScreen");
//               } else {
//                 console.log("❌ Token is expired, clearing storage and navigating to LoginScreen");
//                 await AsyncStorage.clear(); // Clear invalid/expired data
//                 navigation.replace("LoginScreen");
//               }
//             } catch (error) {
//               console.error("❌ Error decoding token:", error.message);
//               await AsyncStorage.clear();
//               navigation.replace("LoginScreen");
//             }
//           } else {
//             console.log("❌ No token or orgId found, navigating to LoginScreen");
//             navigation.replace("LoginScreen");
//           }

//           setIsRehydrated(true);
//         }, 1000); // Delay to ensure rehydration
//       } catch (error) {
//         console.error("❌ Error checking auth state:", error);
//         await AsyncStorage.clear();
//         navigation.replace("LoginScreen");
//         setIsRehydrated(true);
//       }
//     };

//     checkAuthState();
//   }, [navigation, token, orgId]);

//   if (!isRehydrated) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <ActivityIndicator size="large" color="#3F4CA0" />
//         <Text className="mt-4 text-[#444444]">Loading...</Text>
//       </View>
//     );
//   }

//   return null;
// };

// export default AuthLoadingScreen;