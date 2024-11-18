import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../../src/firebaseConfig";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

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
        setStep(2);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  const verifyOtpAndLogin = () => {
    if (!otp || !verificationId) {
      alert("Please enter the OTP sent to your phone.");
      return;
    }

    auth.signInWithCredential(
      auth.PhoneAuthProvider.credential(verificationId, otp)
    )
      .then((result) => {
        console.log("Login successful");
        // Redirect the user to the dashboard
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>

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
          <button onClick={verifyOtpAndLogin}>Verify and Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;
