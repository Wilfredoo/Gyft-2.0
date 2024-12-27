import React from "react";
import GiftItem from "./GiftItem.tsx";

const GiftList = ({ gifts, onDelete }) => (
  <ul>
    {gifts.map((gift) => (
      <GiftItem key={gift._id} gift={gift} onDelete={onDelete} />
    ))}
  </ul>
);

export default GiftList;
