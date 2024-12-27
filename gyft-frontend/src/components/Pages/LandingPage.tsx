import React, { useState } from "react";
import GiftList from "../Gifts/GiftList.tsx";
import GiftForm from "../Gifts/GiftForm.tsx";
import useFetchGifts from "../../hooks/useFetchGifts.ts";
import { useAuth } from "../../context/authContext.tsx";
import Header from "../../shared/Header.tsx";
import Button from "../../shared/Button.tsx";
import useAddGift from "../../hooks/useAddGift.ts";

const LandingPage = () => {
  const { currentUser, logout } = useAuth();
  const initialGifts = useFetchGifts(currentUser?.uid);
  const { gifts, setGifts, handleAddGift: addGiftHandler } = useAddGift(initialGifts);
  const [showForm, setShowForm] = useState(false);

  const onAddGift = async (gift: Omit<Gift, "_id">) => {
    try {
        const userGift = { ...gift, userId: currentUser?.uid };
        await addGiftHandler(userGift); 
        setShowForm(false); 
    } catch (error) {
        console.error("Failed to add gift:", error);
    }
};

  return (
    <div>
      <Header
        userName={currentUser?.phoneNumber}
        onLogout={() => {
          logout();
        }}
      />
      <GiftList
        gifts={gifts}
        onDelete={(giftId) => console.log("Delete gift with ID:", giftId)}
      />
      {showForm ? (
        <GiftForm onSave={addGiftHandler} />

      ) : (
        <Button onClick={() => setShowForm(true)}>Add Gift</Button>
      )}
    </div>
  );
};

export default LandingPage;
