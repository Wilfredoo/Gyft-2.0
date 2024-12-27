import React, { useState } from "react";

function GiftProfile() {
  const [gifts, setGifts] = useState([{ title: "", description: "" }]);

  const handleAddGift = () => {
    setGifts([...gifts, { title: "", description: "" }]);
  };

  const handleGiftChange = (index, field, value) => {
    const updatedGifts = gifts.map((gift, idx) =>
      idx === index ? { ...gift, [field]: value } : gift
    );
    setGifts(updatedGifts);
  };

  const handleSaveProfile = () => {
    console.log("Saving Gift Profile:", gifts);
    // Here you would send the `gifts` data to your backend using an API.
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Build Your Gift Profile</h2>
      {gifts.map((gift, index) => (
        <div key={index} style={{ margin: "10px 0" }}>
          <input
            type="text"
            placeholder="Gift Title"
            value={gift.title}
            onChange={(e) =>
              handleGiftChange(index, "title", e.target.value)
            }
            style={{ marginRight: "5px" }}
          />
          <input
            type="text"
            placeholder="Gift Description"
            value={gift.description}
            onChange={(e) =>
              handleGiftChange(index, "description", e.target.value)
            }
          />
        </div>
      ))}
      <div style={{ margin: "20px 0" }}>
        <button onClick={handleAddGift}>Add Gift</button>
        <button onClick={handleSaveProfile} style={{ marginLeft: "10px" }}>
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default GiftProfile;
