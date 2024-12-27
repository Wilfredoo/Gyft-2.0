import React from "react";
import Button from "../../shared/Button.tsx";

const GiftItem = ({ gift, onDelete }) => (
  <li>
    <strong>{gift.title}</strong>: {gift.description}
    <Button
      onClick={() => onDelete(gift._id)}
      style={{ marginLeft: "10px", backgroundColor: "#f44336" }}
    >
      Delete
    </Button>
  </li>
);

export default GiftItem;
