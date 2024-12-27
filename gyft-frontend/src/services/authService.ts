import apiClient from "../utils/api";

export const checkUser = async (phoneNumber: string, token: string) => {
    try {
        const response = await apiClient.post(
            "/api/users/checkUser",
            { phoneNumber },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error checking user:", error);
        throw new Error(error.response?.data?.message || "Failed to check user.");
    }
};

export const registerUser = async (phoneNumber: string, token: string) => {
    try {
        const response = await apiClient.post(
            "/api/users/register",
            { phoneNumber },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error registering user:", error);
        throw new Error(error.response?.data?.message || "Failed to register user.");
    }
};
