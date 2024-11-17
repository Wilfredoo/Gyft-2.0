import logo from './logo.svg';
import './App.css';
import { auth } from "./firebaseConfig"; // adjust the path if necessary
import PhoneAuth from './components/phoneAuth/phoneAuth';
import React, { useEffect } from "react";



function App() {
  return (
    <div className="App">
      <h1>Welcome to Firebase Authentication</h1>
      <PhoneAuth />
    </div>
  );
}

export default App;
