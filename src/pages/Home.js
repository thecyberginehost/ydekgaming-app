import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import UnderConstructionBanner from "../components/UnderConstructionBanner";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for an authenticated user on mount
    Auth.currentAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <>
      <UnderConstructionBanner />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Welcome to YDEK Gaming
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
          A professional networking platform for gamers. Connect, compete, and showcase your gaming achievements in a community that understands your passion.
        </p>

        {!isAuthenticated ? (
          <div className="space-x-4">
            <a
              href="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition transform hover:-translate-y-1"
            >
              Login
            </a>
            <a
              href="/signup"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded transition transform hover:-translate-y-1"
            >
              Sign Up
            </a>
          </div>
        ) : (
          <a
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded transition transform hover:-translate-y-1"
          >
            Go to Dashboard
          </a>
        )}

        {/* Call to Action Section */}
        <div className="mt-12 text-center px-4">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Are You Ready to Dominate?
          </h2>
          <p className="mb-6 text-lg max-w-xl mx-auto">
            Join a community of dedicated gamers, build your network, join guilds, participate in epic tournaments, and unlock exclusive achievements.
          </p>
          {!isAuthenticated && (
            <a
              href="/signup"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded transition transform hover:-translate-y-1"
            >
              Get Started Now
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
