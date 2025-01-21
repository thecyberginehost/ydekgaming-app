import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import UnderConstructionBanner from "../components/UnderConstructionBanner";

function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Authenticate user using username and password
      await Auth.signIn(username, password);
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Error signing in: " + error.message);
      console.error("Sign in error:", error);
    }
  };

  return (
    <>
      {/* Banner at the top */}
      <UnderConstructionBanner />
      
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-6">
        <form
          onSubmit={handleSignIn}
          className="bg-[#1e293b] p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-[#00f7ff]">
            Welcome Back
          </h2>

          <label htmlFor="username" className="block mb-2 text-gray-300">
            Username:
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-3 rounded-lg bg-[#0f172a] text-gray-300 border border-[#00f7ff] focus:outline-none focus:ring-2 focus:ring-[#00f7ff] mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />

          <label htmlFor="password" className="block mb-2 text-gray-300">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 rounded-lg bg-[#0f172a] text-gray-300 border border-[#00f7ff] focus:outline-none focus:ring-2 focus:ring-[#00f7ff] mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-lg font-semibold text-black bg-[#00f7ff] hover:bg-[#00c2d1] transition"
          >
            Sign In
          </button>

          <p className="text-center mt-4 text-gray-400">
            Forgot your password?{" "}
            <Link
              to="/password-reset"
              className="text-[#00f7ff] hover:text-[#00c2d1] underline"
            >
              Reset it here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
