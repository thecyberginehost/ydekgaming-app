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
        const existingName =
          attrs["custom:displayName"] || attrs["name"] || currentUser.username;
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
    { name: "Guilds", path: "/guilds", icon: "🛡️" },
    { name: "Tournaments", path: "/tournaments", icon: "🏆" },
    { name: "Subscriptions", path: "/subscriptions", icon: "💳" },
  ];

  if (isAuthenticated) {
    links.splice(1, 0, { name: "Dashboard", path: "/dashboard", icon: "📊" });
  }

  return (
    <nav className="bg-[#0f172a] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-extrabold tracking-wider text-[#00f7ff] hover:underline">
          YDEK Gaming
        </Link>
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center space-x-2 text-lg font-medium hover:text-[#00f7ff] transition ${
                location.pathname === link.path ? "text-[#00f7ff]" : "text-gray-300"
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:text-[#00f7ff] transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={profilePic || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-[#00f7ff]"
                />
                <span className="hidden md:inline text-gray-300">{displayName}</span>
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
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] rounded-lg shadow-lg py-2 text-gray-300">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-[#00f7ff] hover:text-black rounded-lg">
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-[#00f7ff] hover:text-black rounded-lg">
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-700 rounded-lg"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-[#007bff] hover:bg-[#0056ff] text-white rounded-lg shadow-md font-semibold">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-[#ff3b3b] hover:bg-[#ff1f1f] text-white rounded-lg shadow-md font-semibold">
                Sign Up
              </Link>
            </>
          )}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            ☰
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="bg-[#1e293b] md:hidden">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-4 py-2 text-lg font-medium hover:bg-[#00f7ff] hover:text-black ${
                location.pathname === link.path ? "bg-[#00f7ff] text-black" : "text-gray-300"
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
