import React, { useState } from "react";

interface GiftFormProps {
  onSave: (gift: { title: string; description: string }) => void;
}

const GiftForm: React.FC<GiftFormProps> = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (title && description) {
      onSave({ title, description }); // Call onSave with the gift details
      setTitle(""); // Clear the form
      setDescription("");
    } else {
      alert("Please fill in both fields!");
    }
  };

  return (
    <div>
      <h3>Add a New Gift</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default GiftForm;
