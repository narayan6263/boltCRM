// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import { logInUser } from "../../api/LogInApi";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // export const userLogin = createAsyncThunk(
// //   "auth/login",
// //   async ({ email, password }, { rejectWithValue }) => {
// //     try {
// //       return await logInUser(email, password);
// //     } catch (error) {
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// // const logInSlice = createSlice({
// //   name: "auth",
// //   initialState: {
// //     user: null,
// //     token: null,
// //     loading: false,
// //     error: null,
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(userLogin.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(userLogin.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.user = action.payload.data;
// //         state.token = action.payload.token;

// //         const storeUserData = async () => {
// //           try {
// //             const {
// //               token,
// //               permissions,
// //               data: {
// //                 categoryId,
// //                 _id: systemUserId,
// //                 linkSystemUser
// //               }
// //             } = action.payload;

// //             // optional chaining for safety
// //             const orgId = linkSystemUser?.[0]?.organizationId || null;
// //             const organizationName = linkSystemUser?.[0]?.organizationName || null;

// //             // ✅ Console logs for API response
// //             console.log("✅ API Login Response:");
// //             console.log("authToken:", token);
// //             console.log("permissionList:", permissions);
// //             console.log("categoryId:", categoryId);
// //             console.log("orgId:", orgId);
// //             console.log("organizationName:", organizationName);
// //             console.log("systemUserId:", systemUserId);

// //             // ✅ Save to AsyncStorage
// //             await AsyncStorage.setItem("authToken", token);
// //             await AsyncStorage.setItem("permissionList", JSON.stringify(permissions));
// //             await AsyncStorage.setItem("categoryId", categoryId);
// //             await AsyncStorage.setItem("orgId", orgId);
// //             await AsyncStorage.setItem("organizationName", organizationName);
// //             await AsyncStorage.setItem("systemUserId", systemUserId);
// //             // await AsyncStorage.setItem("LeadToEdit", LeadToEdit);
// //             // await AsyncStorage.setItem("bookList", bookList);
           



// //             await AsyncStorage.setItem("empId",action.payload.data.linkSystemUser[0].employeeId);


// //             // ✅ Read back to confirm (optional)
// //             const authToken = await AsyncStorage.getItem("authToken");
// //             const permissionList = await AsyncStorage.getItem("permissionList");
// //             const categoryIdStored = await AsyncStorage.getItem("categoryId");
// //             const orgIdStored = await AsyncStorage.getItem("orgId");
// //             const orgNameStored = await AsyncStorage.getItem("organizationName");
// //             const systemUserIdStored = await AsyncStorage.getItem("systemUserId");
// //             const empIdStored = await AsyncStorage.getItem("empId");
// //             // const LeadToEditStored = await AsyncStorage.getItem("LeadToEdit");
// //             // const bookListStored = await AsyncStorage.getItem("bookList");

// //             console.log("📦 Stored in AsyncStorage:");
// //             console.log("authToken: heee", authToken);
// //             console.log("permissionList:heee", JSON.parse(permissionList));
// //             console.log("categoryId:heee", categoryIdStored);
// //             console.log("orgId:heee", orgIdStored);
// //             console.log("organizationName:heee", orgNameStored);
// //             console.log("systemUserId:heee", systemUserIdStored);
// //             console.log("empIdStored:heeerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", empIdStored);
// //             // console.log("LeadToEditStored:heeeo", LeadToEditStored);
// //             // console.log("bookListStored:heeeo", bookListStored);
// //           } catch (error) {
// //             console.error("❌ Error saving to AsyncStorage:", error);
// //           }
// //         };

// //         storeUserData();
// //       })
// //       .addCase(userLogin.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // export default logInSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { logInUser } from "../../api/LogInApi";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { persistReducer } from 'redux-persist'; // Import persistReducer

// export const userLogin = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await logInUser(email, password);
//       const {
//         token,
//         permissions,
//         data: { categoryId, _id: systemUserId, linkSystemUser },
//       } = response;

//       // Extract orgId and organizationName with safety checks
//       const orgId = linkSystemUser?.[0]?.organizationId || null;
//       const organizationName = linkSystemUser?.[0]?.organizationName || null;
//       const empId = linkSystemUser?.[0]?.employeeId || null;

//       if (!orgId) {
//         throw new Error("Organization UUID not found in API response");
//       }

//       // Log API response
//       console.log("✅ API Login Response:");
//       console.log("authToken:", token);
//       console.log("permissionList:", permissions);
//       console.log("categoryId:", categoryId);
//       console.log("orgId:", orgId);
//       console.log("organizationName:", organizationName);
//       console.log("systemUserId:", systemUserId);
//       console.log("empId:", empId);

//       // Store data in AsyncStorage
//       await AsyncStorage.setItem("authToken", token);
//       await AsyncStorage.setItem("permissionList", JSON.stringify(permissions));
//       await AsyncStorage.setItem("categoryId", categoryId);
//       await AsyncStorage.setItem("orgId", orgId);
//       await AsyncStorage.setItem("organizationName", organizationName);
//       await AsyncStorage.setItem("systemUserId", systemUserId);
//       await AsyncStorage.setItem("empId", empId);

//       // Verify storage
//       const storedOrgId = await AsyncStorage.getItem("orgId");
//       if (!storedOrgId) {
//         throw new Error("Failed to store orgId in AsyncStorage");
//       }

//       // Log stored data
//       console.log("📦 Stored in AsyncStorage:");
//       console.log("authToken:", await AsyncStorage.getItem("authToken"));
//       console.log("permissionList:", JSON.parse(await AsyncStorage.getItem("permissionList")));
//       console.log("categoryId:", await AsyncStorage.getItem("categoryId"));
//       console.log("orgId:", storedOrgId);
//       console.log("organizationName:", await AsyncStorage.getItem("organizationName"));
//       console.log("systemUserId:", await AsyncStorage.getItem("systemUserId"));
//       console.log("empId:", await AsyncStorage.getItem("empId"));

//       return response;
//     } catch (error) {
//       console.error("❌ Error in userLogin:", error.message);
//       return rejectWithValue(error.message || "Login failed");
//     }
//   }
// );

// const logInSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     token: null,
//     orgId: null,
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(userLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(userLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.data;
//         state.token = action.payload.token;
//         state.orgId = action.payload.data.linkSystemUser?.[0]?.organizationId || null;
//       })
//       .addCase(userLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // Persist configuration
// const persistConfig = {
//   key: 'auth',
//   storage: AsyncStorage,
//   whitelist: ['token', 'orgId', 'user'], // Persist only these fields
// };

// // Export the persisted reducer
// export default persistReducer(persistConfig, logInSlice.reducer);


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInUser } from "../../api/LogInApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from 'redux-persist';
export const userLogin = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await logInUser(email, password);
            const {
                token,
                permissions,
                data: { categoryId, _id: systemUserId, linkSystemUser },
            } = response;

            const orgId = linkSystemUser?.[0]?.organizationId || null;
            const organizationName = linkSystemUser?.[0]?.organizationName || null;
            const empId = linkSystemUser?.[0]?.employeeId || null;

            if (!orgId) {
                throw new Error("Organization UUID not found in API response");
            }

            // Calculate token expiration (default to 24 hours if not provided)
            const expiresAt = response.expiresAt || Date.now() + (response.expiresIn ? response.expiresIn * 1000 : 24 * 60 * 60 * 1000);

            // Store data in AsyncStorage
            await AsyncStorage.setItem("authToken", token);
            await AsyncStorage.setItem("tokenExpiresAt", expiresAt.toString());
            await AsyncStorage.setItem("permissionList", JSON.stringify(permissions));
            await AsyncStorage.setItem("categoryId", categoryId);
            await AsyncStorage.setItem("orgId", orgId);
            await AsyncStorage.setItem("organizationName", organizationName);
            await AsyncStorage.setItem("systemUserId", systemUserId);
            await AsyncStorage.setItem("empId", empId);

            console.log("📦 Stored in AsyncStorage:", {
                authToken: await AsyncStorage.getItem("authToken"),
                tokenExpiresAt: await AsyncStorage.getItem("tokenExpiresAt"),
                orgId: await AsyncStorage.getItem("orgId"),
            });

            return { ...response, expiresAt };
        } catch (error) {
            console.error("❌ Error in userLogin:", error.message);
            return rejectWithValue(error.message || "Login failed");
        }
    }
);

const logInSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        orgId: null,
        expiresAt: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.token = action.payload.token;
                state.orgId = action.payload.data.linkSystemUser?.[0]?.organizationId || null;
                state.expiresAt = action.payload.expiresAt;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: ['token', 'orgId', 'user', 'expiresAt'],
};

export default persistReducer(persistConfig, logInSlice.reducer);

