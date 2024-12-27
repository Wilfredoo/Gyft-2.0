import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, style, disabled }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 20px",
      backgroundColor: disabled ? "#ccc" : "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: disabled ? "not-allowed" : "pointer",
      ...style,
    }}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
