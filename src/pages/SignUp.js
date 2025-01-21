import React, { useState } from "react";
import { Auth } from "aws-amplify";
import UnderConstructionBanner from "../components/UnderConstructionBanner";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [stage, setStage] = useState("form");
  const [errorMessage, setErrorMessage] = useState("");

  const canSignUp =
    username.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!canSignUp) {
      setErrorMessage("Please ensure all fields are valid and passwords match.");
      return;
    }

    try {
      setErrorMessage("");
      await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      setStage("confirm");
    } catch (error) {
      setErrorMessage(`Error signing up: ${error.message}`);
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
      setErrorMessage(`Error confirming sign up: ${error.message}`);
      console.error("Confirm sign up error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <UnderConstructionBanner />
      <div className="flex items-center justify-center p-6">
        {stage === "form" && (
          <form
            onSubmit={handleSignUp}
            className="bg-[#1e293b] text-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-3xl font-extrabold mb-4 text-[#00f7ff] text-center">
              Sign Up for Your Free Account
            </h2>
            {errorMessage && (
              <p className="bg-red-500 text-white p-2 rounded mb-4 text-center">
                {errorMessage}
              </p>
            )}
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full p-3 rounded bg-[#0f172a] text-gray-300 border border-[#00f7ff] focus:outline-none focus:ring-2 focus:ring-[#00f7ff] mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a unique username"
              required
            />
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 rounded bg-[#0f172a] text-gray-300 border border-[#00f7ff] focus:outline-none focus:ring-2 focus:ring-[#00f7ff] mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
            />
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-3 rounded bg-[#0f172a] text-gray-300 border border-[#00f7ff] focus:outline-none focus:ring-2 focus:ring-[#00f7ff] mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
            />
            <p className="text-sm text-gray-400 mb-4">
              Password must be at least 8 characters long and include uppercase,
              lowercase, numeric, or special characters.
            </p>
            <label htmlFor="confirmPassword" className="block mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full p-3 rounded bg-[#0f172a] text-gray-300 border border-[#00f7ff] focus:outline-none focus:ring-2 focus:ring-[#00f7ff] mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
            />
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
                canSignUp
                  ? "bg-[#00f7ff] text-black hover:bg-[#00c2d1]"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
              disabled={!canSignUp}
            >
              Create Account
            </button>
          </form>
        )}
        {stage === "confirm" && (
          <form
            onSubmit={handleConfirmSignUp}
            className="bg-[#1e293b] text-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-3xl font-extrabold mb-4 text-[#00f7ff] text-center">
              Confirm Your Email
            </h2>
            {errorMessage && (
              <p className="bg-red-500 text-white p-2 rounded mb-4 text-center">
                {errorMessage}
              </p>
            )}
            <p className="text-gray-400 mb-4 text-center">
              A confirmation code has been sent to your email. Enter it below to
              activate your account.
            </p>
            <label htmlFor="authCode" className="block mb-2">
              Confirmation Code
            </label>
            <input
              id="authCode"
              type="text"
              className="w-full p-3 rounded bg-[#0f172a] text-gray-300 border border-[#00f7ff] focus:outline-none focus:ring-2 focus:ring-[#00f7ff] mb-4"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              placeholder="Enter confirmation code"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#00f7ff] hover:bg-[#00c2d1] text-black font-semibold rounded-lg transition"
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
