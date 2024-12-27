import React from "react";
import Button from "./Button.tsx";
import { formatPhoneNumber } from "../utils/helpers.tsx";

interface HeaderProps {
  userName?: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => (
  <div style={{ position: "relative", padding: "10px", textAlign: "center" }}>
    <h1>Welcome {userName || "Guest"}</h1>
    {userName && (
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <Button
          onClick={onLogout}
          style={{ backgroundColor: "#f44336", padding: "8px 12px" }}
        >
          Logout
        </Button>
      </div>
    )}
  </div>
);

export default Header;
