import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";

function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome, {currentUser?.phoneNumber || "User"}!</h1>
      <p>What would you like to do today?</p>
      <div style={{ margin: "20px 0" }}>
        <Link to="/gift-profile">
          <button style={{ marginRight: "10px", padding: "10px 20px" }}>
            Build My Gift Profile
          </button>
        </Link>
        <Link to="/friend-search">
          <button style={{ padding: "10px 20px" }}>Search for a Friend</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
