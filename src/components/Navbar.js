import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Auth, Storage } from "aws-amplify";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(async (currentUser) => {
        setIsAuthenticated(true);
        const attrs = currentUser.attributes || {};
        const existingName = attrs["custom:displayName"] || attrs["name"] || currentUser.username;
        setDisplayName(existingName);

        try {
          const profilePicKey = `profile-pic-${currentUser.username}.jpg`;
          const profilePicUrl = await Storage.get(profilePicKey);
          setProfilePic(profilePicUrl);
        } catch {
          setProfilePic(null); // No profile pic found
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        setDisplayName("");
        setProfilePic(null);
      });
  }, []);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      setDisplayName("");
      setProfilePic(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const links = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Guilds", path: "/guilds", icon: "🛡️" },
    { name: "Tournaments", path: "/tournaments", icon: "🏆" },
    { name: "Subscriptions", path: "/subscriptions", icon: "💳" },
  ];

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold">
          YDEK Gaming
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center space-x-1 hover:text-gray-300 ${
                location.pathname === link.path ? "text-blue-400" : ""
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              {/* Profile Picture Button */}
              <button
                className="flex items-center space-x-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={profilePic || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-600"
                />
                <span className="hidden md:inline">{displayName}</span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 text-gray-800">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-blue-600 p-2 rounded hover:bg-blue-500"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-gray-700 md:hidden">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-4 py-2 hover:bg-gray-600 ${
                location.pathname === link.path ? "bg-gray-600" : ""
              }`}
            >
              {link.icon} {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
