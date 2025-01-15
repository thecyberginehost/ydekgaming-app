// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        setIsAuthenticated(true);
        const attrs = currentUser.attributes || {};
        const existingName = attrs["custom:displayName"] || attrs["name"] || currentUser.username;
        setDisplayName(existingName);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setDisplayName("");
      });
  }, []);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      setDisplayName("");
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold">
          YDEK Gaming
        </Link>

        {/* Main Nav Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/guilds" className="hover:text-gray-300">
            Guilds
          </Link>
          <Link to="/tournaments" className="hover:text-gray-300">
            Tournaments
          </Link>
          <Link to="/subscriptions" className="hover:text-gray-300">
            Subscriptions
          </Link>
        </div>

        {/* Right side: Auth Buttons or User Info */}
        <div className="space-x-2">
          {isAuthenticated ? (
            <>
              {/* Show display name */}
              <span className="mr-2">
                Welcome, {displayName}!
              </span>
              {/* Profile & Sign Out */}
              <Link
                to="/profile"
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
              >
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
