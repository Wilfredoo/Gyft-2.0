import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import GiftProfile from "./components/GiftProfile";
import FriendSearch from "./components/FriendSearch";
import LandingPage from "./components/LandingPage";
import { AuthProvider } from "./authContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gift-profile" element={<GiftProfile />} />
          <Route path="/friend-search" element={<FriendSearch />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
