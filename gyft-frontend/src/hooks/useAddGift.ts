import { useState } from "react";
import { addGift } from "../services/giftService.ts";

interface Gift {
    _id: string;
    userId: string;
    title: string;
    description?: string;
}

const useAddGift = (initialGifts: Gift[] = []) => {
    const [gifts, setGifts] = useState<Gift[]>(initialGifts);

    const handleAddGift = async (gift: Omit<Gift, "_id">) => {
        try {
            const newGift = await addGift(gift);
            setGifts((prevGifts) => [...prevGifts, newGift]);
            return newGift;
        } catch (error) {
            console.error("Error adding gift:", error);
            throw error;
        }
    };

    return { gifts, setGifts, handleAddGift };
};

export default useAddGift;
