import apiClient from "../utils/api";

export const getUserProfile = async (userId: string) => {
    try {
        const response = await apiClient.get(`/api/users/${userId}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching user profile:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch user profile.");
    }
};

export const updateUserProfile = async (userId: string, data: any) => {
    try {
        const response = await apiClient.put(`/api/users/${userId}`, data);
        return response.data;
    } catch (error: any) {
        console.error("Error updating user profile:", error);
        throw new Error(error.response?.data?.message || "Failed to update user profile.");
    }
};
