import apiAuth from "./apiAuth";

export const logInUser = async (email, password) => {
  try {
    const response = await apiAuth.post("/auth/login", {
      systemUserEmail: email,
      systemUserPassword: password,
    });

    console.log("🌐 Raw API Response:", response.data);

    if (response.status === 200 && response.data.token) {
            console.log("ye response he",response)

            console.log("ye response.data he ",response.data)
      return response.data;

    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.log("❌ API Error:", error.response?.data || error);
    throw error.response?.data?.message || "Login failed";
  }
};
