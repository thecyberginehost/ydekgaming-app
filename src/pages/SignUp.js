// src/pages/SignUp.js
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import UnderConstructionBanner from "../components/UnderConstructionBanner"; // Import banner

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [stage, setStage] = useState("form");
  const [errorMessage, setErrorMessage] = useState("");

  // Check if all fields are filled and passwords match
  const canSignUp =
    username.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setErrorMessage(""); // Clear any previous errors
      await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      setStage("confirm");
    } catch (error) {
      setErrorMessage("Error signing up: " + error.message);
      console.error("Sign up error:", error);
    }
  };

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      await Auth.confirmSignUp(username, authCode);
      alert("Sign up successful! You can now log in.");
      window.location.href = "/login";
    } catch (error) {
      setErrorMessage("Error confirming sign up: " + error.message);
      console.error("Confirm sign up error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Under Construction Banner */}
      <UnderConstructionBanner />

      <div className="flex items-center justify-center p-4">
        {stage === "form" && (
          <form
            onSubmit={handleSignUp}
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

            {errorMessage && (
              <p className="bg-red-100 text-red-700 p-2 rounded mb-4">
                {errorMessage}
              </p>
            )}

            <label htmlFor="username" className="block text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a unique username"
              required
            />

            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
            />

            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
            />
            <p className="text-xs text-gray-600 mb-4 mt-1">
              Password must be at least 8 characters long and contain uppercase,
              lowercase, numeric, or special characters (according to your Cognito policy).
            </p>

            <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full p-2 border rounded mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
            />

            <button
              type="submit"
              className={`${
                canSignUp
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white w-full py-2 rounded transition`}
              disabled={!canSignUp}
            >
              Create Account
            </button>
          </form>
        )}

        {stage === "confirm" && (
          <form
            onSubmit={handleConfirmSignUp}
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Confirm Sign Up</h2>

            {errorMessage && (
              <p className="bg-red-100 text-red-700 p-2 rounded mb-4">
                {errorMessage}
              </p>
            )}

            <p className="text-gray-700 mb-2">
              A confirmation code was sent to your email.
            </p>

            <label htmlFor="authCode" className="block text-gray-700 mb-1">
              Confirmation Code
            </label>
            <input
              id="authCode"
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              placeholder="Code from your email"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-500"
            >
              Confirm
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignUp;
