import React from "react";
import UnderConstructionBanner from "../components/UnderConstructionBanner"; // Import banner

function Tournaments() {
  // Dummy tournament data for display purposes
  const tournaments = [
    {
      id: 1,
      title: "Battle Royale Championship",
      date: "2023-08-15",
      image: "https://via.placeholder.com/400x200?text=Battle+Royale",
      description: "Join the ultimate battle royale and prove your skills!",
    },
    {
      id: 2,
      title: "Guild Wars Tournament",
      date: "2023-09-01",
      image: "https://via.placeholder.com/400x200?text=Guild+Wars",
      description: "Guilds compete in an epic tournament. Will yours rise to the top?",
    },
    {
      id: 3,
      title: "Speedrun Showdown",
      date: "2023-08-30",
      image: "https://via.placeholder.com/400x200?text=Speedrun+Showdown",
      description: "Race against the clock in this thrilling speedrun event.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Under Construction Banner */}
      <UnderConstructionBanner />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Upcoming Tournaments
        </h1>
        <p className="text-center text-lg mb-8">
          Discover the latest tournaments and join the action!
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tourney) => (
            <div
              key={tourney.id}
              className="bg-white text-black rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300"
            >
              <img
                src={tourney.image}
                alt={tourney.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{tourney.title}</h2>
                <p className="text-sm text-gray-600 mb-1">Date: {tourney.date}</p>
                <p className="text-gray-700 mb-4">{tourney.description}</p>
                <a
                  href="/signup"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                >
                  Sign up to join
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-semibold">
            Not a member yet? Discover what you're missing!
          </p>
          <a
            href="/signup"
            className="inline-block mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-3 rounded transition transform hover:-translate-y-1"
          >
            Join YDEK Gaming Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Tournaments;
