import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import UnderConstructionBanner from "../components/UnderConstructionBanner";

function Login() {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Cognito will accept either username or email as identifier
      await Auth.signIn(identifier, password);
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Error signing in: " + error.message);
      console.error("Sign in error:", error);
    }
  };

  return (
    <>
      {/* Banner at the very top, outside the flex container */}
      <UnderConstructionBanner />
      
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleSignIn}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          <label htmlFor="identifier" className="block text-gray-700 mb-1">
            Username or Email:
          </label>
          <input
            id="identifier"
            type="text"
            className="w-full p-2 border rounded mb-4"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your username or email"
            required
          />

          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border rounded mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-500"
          >
            Sign In
          </button>

          <p className="text-center mt-4 text-sm">
            Forgot your password?{" "}
            <a href="/password-reset" className="text-blue-600 underline">
              Reset here
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
