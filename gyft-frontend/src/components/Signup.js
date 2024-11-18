import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../../src/firebaseConfig";
import axios from "axios";

function Signup() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState(""); // Optional additional field
  const [email, setEmail] = useState(""); // Optional additional field
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Phone input, Step 2: OTP verification

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
      window.recaptchaVerifier.render();
    }
  };

  const requestOTP = () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }

    setupRecaptcha();

    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setStep(2); // Proceed to OTP verification step
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
        }
      });
  };

  const verifyOtpAndSignup = () => {
    if (!otp || !verificationId) {
      alert("Please enter the OTP sent to your phone.");
      return;
    }

    // Verify OTP and send user data to the backend
    auth.signInWithCredential(
      auth.PhoneAuthProvider.credential(verificationId, otp)
    )
      .then((result) => {
        // Retrieve Firebase ID Token
        return result.user.getIdToken();
      })
      .then((idToken) => {
        // Send token and optional additional fields (e.g., name, email) to the backend
        return axios.post(
          "http://localhost:5000/api/register",
          { name, email, phoneNumber },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
      })
      .then((response) => {
        console.log("Signup successful:", response.data);
        alert("Signup successful!");
        // Optionally redirect the user to a dashboard
      })
      .catch((error) => {
        console.error("Error during signup:", error);
      });
  };

  return (
    <div>
      <h2>Signup</h2>

      {step === 1 && (
        <div>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={requestOTP}>Send OTP</button>
          <div id="recaptcha-container"></div>
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={verifyOtpAndSignup}>Verify and Signup</button>
        </div>
      )}
    </div>
  );
}

export default Signup;
