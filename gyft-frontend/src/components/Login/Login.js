import React, { useState, useEffect } from "react";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../../firebaseConfig";
import {
  LoginContainer,
  Heading,
  Label,
  Select,
  Input,
  RecaptchaContainer,
} from "./Styles";
import countryCodes from "./CountryCodes.ts"
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import axios from 'axios'
import { Button, TextField, Alert, CircularProgress } from "@mui/material";
import { Button as StyledButton } from "./Styles";
import { toast } from "react-toastify";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+49");
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [attemptsLeft, setAttemptsLeft] = useState(3);

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
    const recaptchaContainer = document.getElementById('recaptcha-container');
    if (!recaptchaContainer) {
      console.error("reCAPTCHA container is missing in the DOM.");
      return;
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" },
    );
    window.recaptchaVerifier.render();
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);


  const resendOtp = () => {
    setTimeLeft(60);
    setIsResendDisabled(true);
    requestOTP();
  };

  const requestOTP = () => {
    console.log("requestOTP function called")

    if (!phoneNumber || phoneNumber.length < 10 || !/^\d+$/.test(phoneNumber)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/[^0-9]/g, "")}`;

    setupRecaptcha();

    signInWithPhoneNumber(auth, fullPhoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        toast.success("Verification code sent!");

        setVerificationId(confirmationResult.verificationId);
        setStep(2);
      })
      .catch((error) => {
        console.log("error of timeout?", error)
        toast.error("Failed to send verification code.");
        console.error("Error sending OTP:", error);
        if (error.code === 'auth/recaptcha/timeout') {
          toast.error("reCAPTCHA timed out. Please try again.");
        }
      });
  };

  const verifyOtpAndLogin = async () => {
    console.log("verifyOtpAndLogin function called")

    if (!otp || !/^\d+$/.test(otp)) {
      setError("Please enter the verification code sent to your phone.");
      return;
    }

    setLoading(true);

    try {
      console.log("let's try this", verificationId, otp)
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      console.log("let's try this 2", auth, credential)
      const userCredential = await signInWithCredential(auth, credential);
      console.log("let's try this 2", userCredential)
      const idToken = await userCredential.user.getIdToken();
      console.log("User authenticated, ID Token retrieved:", idToken);
      console.log("Sending POST request to /checkUser with phoneNumber:", phoneNumber);

      const response = await axios.post(
        "http://localhost:5000/api/users/checkUser",
        { phoneNumber },
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );

      if (response.data.isNewUser) {
        console.log("it's a new user, lets call register endpoint")
        await axios.post(
          "http://localhost:5000/api/users/register",
          { phoneNumber },
          {
            headers: { Authorization: `Bearer ${idToken}` },
          }
        );
      }
      setLoading(false);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.log("WTF happened?", error)
      setLoading(false);
      if (error.code === 'auth/timeout') {
        setError("The OTP verification timed out. Please try again.");
      } else {
        setError("Error during login: " + error.message);
      }
    }
  }

  return (
    <LoginContainer>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      {step === 1 && (
        <>
          <Heading>First you need to login</Heading>
          <Label>
            Select Country:
            <Select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {countryCodes.map((country) => (
                <option key={`${country.code}-${country.label}`} value={country.code}>
                  {country.label} ({country.code})
                </option>
              ))}
            </Select>
          </Label>
          <Input
            type="text"
            placeholder="Enter phone number (e.g., 5551234567)"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPhoneNumber(value);
              }
              setPhoneNumber(e.target.value)
            }
            }
          />
          <Button onClick={requestOTP} disabled={loading} variant="contained" color="primary">
            Send Verification Code
          </Button>
          <RecaptchaContainer id="recaptcha-container"></RecaptchaContainer>
        </>
      )}

      {step === 2 && (
        <>
          <Heading>Almost there</Heading>
          <p>You should have received an SMS with a code, simply write it below</p>
          <Input
            type="text"
            placeholder="Enter Verification Code"
            value={otp}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setOtp(value);
              }
            }}
          />
          <Button onClick={verifyOtpAndLogin} disabled={loading} variant="contained" color="primary">
            Verify and Login
          </Button>
          <p>
            Time left: <strong>{timeLeft}s</strong>
          </p>
          <button
            onClick={resendOtp}
            disabled={isResendDisabled}
            style={{
              cursor: isResendDisabled ? "not-allowed" : "pointer",
              backgroundColor: isResendDisabled ? "#ccc" : "#4caf50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            {isResendDisabled ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
          </button>
          < br />
          <p style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', margin: 0 }}>
            Didn't get an SMS? Time for SOS. Write Wilfredo at
            <a href="tel:+4915781295360" style={{ color: '#007BFF', textDecoration: 'none' }}>
              +4915781295360
            </a> and I'll try my best to solve it.
          </p>
        </>
      )}
    </LoginContainer>
  );
}

export default Login;
