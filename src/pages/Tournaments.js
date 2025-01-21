import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UnderConstructionBanner from "../components/UnderConstructionBanner"; // Import banner

function Tournaments() {
  const navigate = useNavigate();

  // Dummy tournament data for display purposes
  const tournaments = [
    {
      id: 1,
      title: "Battle Royale Championship",
      date: "2025-08-15",
      image: "https://via.placeholder.com/400x200?text=Battle+Royale",
      description: "Join the ultimate battle royale and prove your skills!",
    },
    {
      id: 2,
      title: "Guild Wars Tournament",
      date: "2025-09-01",
      image: "https://via.placeholder.com/400x200?text=Guild+Wars",
      description: "Guilds compete in an epic tournament. Will yours rise to the top?",
    },
    {
      id: 3,
      title: "Speedrun Showdown",
      date: "2025-08-30",
      image: "https://via.placeholder.com/400x200?text=Speedrun+Showdown",
      description: "Race against the clock in this thrilling speedrun event.",
    },
  ];

  const handleCreateTournament = () => {
    // Redirect to the tournament creation page
    navigate("/create-tournament");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Under Construction Banner */}
      <UnderConstructionBanner />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            Upcoming Tournaments
          </h1>
          <button
            onClick={handleCreateTournament}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition transform hover:-translate-y-1"
          >
            Create a Tournament
          </button>
        </div>

        <p className="text-lg text-center mb-8">
          Discover the latest tournaments and join the action!
        </p>

        {/* Tournaments Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tourney) => (
            <div
              key={tourney.id}
              className="bg-[#1e293b] rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300"
            >
              <img
                src={tourney.image}
                alt={tourney.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2 text-[#00f7ff]">
                  {tourney.title}
                </h2>
                <p className="text-sm text-gray-400 mb-1">Date: {tourney.date}</p>
                <p className="text-gray-300 mb-4">{tourney.description}</p>
                <Link
                  to="/signup"
                  className="block w-full text-center bg-[#00f7ff] hover:bg-[#00c7dd] text-black font-semibold py-2 rounded transition"
                >
                  Sign up to join
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-semibold">
            Not a member yet? Discover what you're missing!
          </p>
          <Link
            to="/signup"
            className="inline-block mt-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold px-8 py-3 rounded transition transform hover:-translate-y-1"
          >
            Join YDEK Gaming Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Tournaments;
