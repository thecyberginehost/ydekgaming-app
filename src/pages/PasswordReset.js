// src/pages/PasswordReset.js
import React, { useState } from "react";
import { Auth } from "aws-amplify";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stage, setStage] = useState("request");

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      await Auth.forgotPassword(email);
      setStage("confirm");
    } catch (error) {
      alert("Error requesting password reset: " + error.message);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      alert("Password reset successful! You can now log in.");
      window.location.href = "/login";
    } catch (error) {
      alert("Error resetting password: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {stage === "request" && (
        <form
          onSubmit={handleRequest}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Enter your email address:
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-2 border rounded"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-500"
          >
            Send Verification Code
          </button>
        </form>
      )}

      {stage === "confirm" && (
        <form
          onSubmit={handleReset}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Enter Code & New Password</h2>
          <div className="mb-4">
            <label htmlFor="code" className="block text-gray-700">
              Verification Code:
            </label>
            <input
              type="text"
              id="code"
              className="w-full mt-1 p-2 border rounded"
              placeholder="e.g. 123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-gray-700">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full mt-1 p-2 border rounded"
              placeholder="Your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-500"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}

export default PasswordReset;
