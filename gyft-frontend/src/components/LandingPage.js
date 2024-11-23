import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";

function LandingPage() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAddGift = () => {
    navigate("/gift-profile");
  };

  const handleViewWishes = () => {
    navigate("/wish-list");
  };

  const handleShareLink = () => {
    const shareLink = `${window.location.origin}/wish-list/${currentUser?.phoneNumber}`;
    navigator.clipboard.writeText(shareLink);
    alert("Your wish list link has been copied to the clipboard!");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial, sans-serif" }}>
      {/* Logout button in the top-right corner */}
      {currentUser && (
        <div style={{ position: "absolute", top: "20px", right: "20px" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 15px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}

      <h1>Welcome {currentUser ? currentUser.phoneNumber : "guest"}</h1>

      {!currentUser && (
        <p style={{ marginBottom: "30px", fontSize: "18px", color: "#555" }}>
          This is simple site for Wilfredo, friends, and friends of friends. Build your Gyft list and let wonder unfold.
          <br /><br />
          Here's what you can do:
          <ol style={{ textAlign: "left", display: "inline-block", margin: "20px 0" }}>
            <li>Add gift ideas to your Gyft list.</li>
            <li>Share your Gyft list with family, friends, and your boss if you like him.</li>
            <li>View someone else's Gyft list if they've shared it with you.</li>
          </ol>
        </p>
      )}

      {currentUser ? (
        <div>
          <p style={{ fontSize: "18px", color: "#333" }}>What would you like to do today?</p>
          <div style={{ margin: "20px 0" }}>
            <button
              onClick={handleAddGift}
              style={{ marginRight: "10px", padding: "10px 20px", cursor: "pointer" }}
            >
              Add a New Gift
            </button>
            <button
              onClick={handleViewWishes}
              style={{ marginRight: "10px", padding: "10px 20px", cursor: "pointer" }}
            >
              View Default Wishes
            </button>
            <button
              onClick={handleShareLink}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Copy Share Link
            </button>
          </div>
        </div>
      ) : (
        // Non-logged-in actions
        <div>
          <Link to="/login">
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Build my Gyft list now!
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
