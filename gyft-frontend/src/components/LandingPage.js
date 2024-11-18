import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";

function LandingPage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!currentUser) {
      alert("Please log in to search for friends.");
      return;
    }
    // Logic to search for a friend (e.g., make API call or update state)
    console.log("Searching for:", searchQuery);
    alert(`Searching for friend: ${searchQuery}`);
  };

  const handleGiftProfile = () => {
    if (!currentUser) {
      alert("Please log in to build your gift profile.");
      navigate("/login");
      return;
    }
    navigate("/gift-profile");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {/* Welcome message based on authentication state */}
      <h1>
        Welcome, {currentUser ? currentUser.phoneNumber || "User" : "Guest"}!
      </h1>
      <p>
        {currentUser
          ? "What would you like to do today?"
          : "You are not logged in. Please log in or sign up to access more features."}
      </p>

      {/* Options for logged-in and non-logged-in users */}
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={handleGiftProfile}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Build My Gift Profile
        </button>
        <input
          type="text"
          placeholder="Search for a friend"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: "10px", padding: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
          Search
        </button>
      </div>

      {/* Links for non-logged-in users */}
      {!currentUser && (
        <div style={{ marginTop: "20px" }}>
          <Link to="/signup">
            <button style={{ marginRight: "10px", padding: "10px 20px" }}>
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button style={{ padding: "10px 20px" }}>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
