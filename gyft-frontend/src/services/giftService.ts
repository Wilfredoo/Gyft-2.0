import axios from "axios";
import apiClient from "../utils/api.ts"


export const fetchGifts = async (userId: string) => {
    console.log("running fetch gifts", userId);
    try {
        const response = await apiClient.get("/api/gifts", {
            params: { userId },
        });
        console.log("Response received:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching gifts:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch gifts.");
    }
};

// Add a new gift
export const addGift = async (gift: { userId: string; title: string; description?: string }) => {
    console.log("addGift service calle")
    try {
        const response = await axios.post("/api/gifts", gift);
        console.log("response in addgift")
        return response.data;
    } catch (error: any) {
        console.error("Error adding gift:", error);
        throw new Error(error.response?.data?.message || "Failed to add gift.");
    }
};

// Delete a gift by ID
export const deleteGift = async (giftId: string) => {
    try {
        const response = await axios.delete(`/api/gifts/${giftId}`);
        return response.data;
    } catch (error: any) {
        console.error("Error deleting gift:", error);
        throw new Error(error.response?.data?.message || "Failed to delete gift.");
    }
};

// Update an existing gift
export const updateGift = async (giftId: string, updatedData: { title?: string; description?: string }) => {
    try {
        const response = await axios.put(`/api/gifts/${giftId}`, updatedData);
        return response.data;
    } catch (error: any) {
        console.error("Error updating gift:", error);
        throw new Error(error.response?.data?.message || "Failed to update gift.");
    }
};
