import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Brand and Description */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-extrabold text-[#00f7ff]">
            YDEK Gaming
          </h2>
          <p className="text-sm text-gray-400">
            Connect, compete, and build your gaming network with YDEK Gaming. 
            The ultimate platform for gamers to showcase their achievements, 
            join guilds, and participate in tournaments.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-[#00f7ff]">Quick Links</h3>
          <Link to="/" className="hover:text-[#00f7ff] transition">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-[#00f7ff] transition">
            Dashboard
          </Link>
          <Link to="/guilds" className="hover:text-[#00f7ff] transition">
            Guilds
          </Link>
          <Link to="/tournaments" className="hover:text-[#00f7ff] transition">
            Tournaments
          </Link>
          <Link to="/subscriptions" className="hover:text-[#00f7ff] transition">
            Subscriptions
          </Link>
        </div>

        {/* Column 3: Social Media & Contact */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-[#00f7ff]">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00f7ff] transition"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00f7ff] transition"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00f7ff] transition"
            >
              Instagram
            </a>
          </div>
          <h3 className="text-lg font-semibold text-[#00f7ff]">Contact Us</h3>
          <p className="text-sm text-gray-400">
            Email:{" "}
            <a
              href="mailto:support@ydekgaming.com"
              className="hover:text-[#00f7ff] transition"
            >
              support@ydekgaming.com
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} YDEK Gaming. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
