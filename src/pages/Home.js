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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white p-6">
        {/* Hero Section */}
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight tracking-wide">
            Welcome to{" "}
            <span className="text-[#00f7ff] hover:underline transition duration-300">
              YDEK Gaming
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Immerse yourself in a gaming community where you can build your
            legacy, dominate tournaments, and connect with fellow players like
            never before.
          </p>
          {!isAuthenticated ? (
            <div className="flex justify-center space-x-4 animate-fade-in">
              <a
                href="/login"
                className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-[#00f7ff] to-[#007bff] hover:from-[#007bff] hover:to-[#0056ff] font-semibold transition transform hover:scale-105"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-[#ff7b00] to-[#ff3b3b] hover:from-[#ff3b3b] hover:to-[#ff1f1f] font-semibold transition transform hover:scale-105"
              >
                Sign Up
              </a>
            </div>
          ) : (
            <a
              href="/dashboard"
              className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-[#00f7ff] to-[#007bff] hover:from-[#007bff] hover:to-[#0056ff] font-semibold transition transform hover:scale-105"
            >
              Go to Dashboard
            </a>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center px-6">
          <h2 className="text-4xl font-bold mb-4 text-[#00f7ff]">
            Step Into the Arena
          </h2>
          <p className="mb-8 text-lg text-gray-300 max-w-2xl mx-auto">
            Compete in tournaments, create guilds, and unlock achievements. YDEK
            Gaming isn’t just a platform; it’s your stage to shine.
          </p>
          {!isAuthenticated && (
            <a
              href="/signup"
              className="px-8 py-4 rounded-lg text-white bg-gradient-to-r from-[#222831] to-[#393e46] hover:from-[#393e46] hover:to-[#222831] font-bold transition transform hover:scale-105"
            >
              Get Started Now
            </a>
          )}
        </div>

        {/* Interactive Highlights Section */}
        <div className="mt-20 grid gap-8 sm:grid-cols-1 md:grid-cols-3 px-6 max-w-6xl">
          {[
            {
              title: "Guilds",
              description:
                "Join or create your guild to conquer challenges together.",
              gradient: "from-[#007bff] to-[#0056ff]",
            },
            {
              title: "Tournaments",
              description:
                "Participate in epic battles and claim your spot on the leaderboard.",
              gradient: "from-[#ff7b00] to-[#ff3b3b]",
            },
            {
              title: "Networking",
              description:
                "Connect with players, share achievements, and grow your circle.",
              gradient: "from-[#00f7ff] to-[#007bff]",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${feature.gradient} p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition transform hover:scale-105`}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Subtle Animation */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 animate-pulse">
            The future of gaming starts here. Will you join us?
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
