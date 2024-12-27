import { useState, useEffect } from "react";
import { fetchGifts } from "../services/giftService.ts";

const useFetchGifts = (userId) => {
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        fetchGifts(userId).then(setGifts).catch(console.error);
    }, [userId]);

    return gifts;
};

export default useFetchGifts;
