import React, { useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "./../../firebaseConfig";
import axios from 'axios';

function PhoneAuth() {
    // Hardcoded test phone number and verification code
    const testPhoneNumber = "+4915781295360"; // This should match the test number in Firebase Console
    const testVerificationCode = "789654"; // This should match the test code in Firebase Console

    const [verificationId, setVerificationId] = useState("");
    const auth = getAuth();

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth,
                "recaptcha-container",
                { size: "invisible" },
            );
    
            window.recaptchaVerifier.render()
                .then((widgetId) => {
                    console.log("reCAPTCHA initialized with widget ID:", widgetId);
                })
                .catch((error) => {
                    console.error("Error initializing reCAPTCHA:", error);
                });
        }
    };

    const requestOTP = () => {
        setupRecaptcha();

        // Using the hardcoded test phone number
        signInWithPhoneNumber(auth, testPhoneNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {
                setVerificationId(confirmationResult.verificationId);
                alert("OTP sent (simulated)!");
            })
            .catch((error) => {
                console.error("Error sending OTP:", error);
                if (window.recaptchaVerifier) {
                    window.recaptchaVerifier.clear();
                }
            });
    };

    const verifyCode = () => {
        if (!verificationId) {
            console.error("No verification ID set. Request OTP first.");
            return;
        }

        const credential = PhoneAuthProvider.credential(
            verificationId,
            testVerificationCode
        );
            signInWithCredential(auth, credential)
            .then((result) => {
                result.user.getIdToken().then((idToken) => {
                    axios.post('http://localhost:5000/verify-token', {
                        token: idToken
                    })
                    .then(response => {
                        console.log("Backend response:", response.data);
                    })
                    .catch(error => {
                        console.error("Error sending token to backend:", error);
                    });
                });
            })
            .catch((error) => {
                console.error("Error verifying code:", error);
            });
    };

    return (
        <div>
            <h2>Phone Authentication</h2>
            <button onClick={requestOTP}>Send OTP</button>
            <div id="recaptcha-container"></div>
            {verificationId && (
                <>
                    <button onClick={verifyCode}>Verify Code</button>
                </>
            )}
        </div>
    );
}

export default PhoneAuth;
