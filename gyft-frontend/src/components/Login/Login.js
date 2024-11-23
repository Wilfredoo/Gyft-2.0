import React, { useState } from "react";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../../../src/firebaseConfig";
import {
  LoginContainer,
  Heading,
  Label,
  Select,
  Input,
  Button,
  RecaptchaContainer,
} from "./Styles";
import countryCodes from "./CountryCodes"

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+49");
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" },
      );
      window.recaptchaVerifier.render();
    }
  };

  const requestOTP = () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(
      /[^0-9]/g,
      ""
    )}`;

    setupRecaptcha();

    signInWithPhoneNumber(auth, fullPhoneNumber, window.recaptchaVerifier)
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

    auth
      .signInWithCredential(
        auth.PhoneAuthProvider.credential(verificationId, otp)
      )
      .then(() => {
        console.log("Login successful");
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <LoginContainer>
      <Heading>Login</Heading>

      {step === 1 && (
        <>
          <Label>
            Select Country:
            <Select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label} ({country.code})
                </option>
              ))}
            </Select>
          </Label>
          <Input
            type="text"
            placeholder="Enter phone number (e.g., 5551234567)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button onClick={requestOTP}>Send OTP</Button>
          <RecaptchaContainer id="recaptcha-container"></RecaptchaContainer>
        </>
      )}

      {step === 2 && (
        <>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button onClick={verifyOtpAndLogin}>Verify and Login</Button>
        </>
      )}
    </LoginContainer>
  );
}

export default Login;
