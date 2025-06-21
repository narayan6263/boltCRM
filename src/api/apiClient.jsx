

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiClient = axios.create({
  baseURL: "http://20.41.121.191:5151/Api/",
  // baseURL: "http://20.197.12.48:3300/Api/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const authToken = await AsyncStorage.getItem("authToken");
  const orgId = await AsyncStorage.getItem("orgId");

  console.log(`📡 API Request: ${config.url}`);
  console.log(`🔑 authToken: ${authToken ? 'present' : 'missing'}`);
  console.log(`🏢 orgId: ${orgId || 'missing'}`);

  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }
  if (orgId) {
    config.headers["Org_uuid"] = orgId;
  } else {
    console.warn(`⚠️ Org_uuid not found in AsyncStorage for request: ${config.url}`);
  }

  return config;
});

export default apiClient;
