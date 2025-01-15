import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UnderConstructionBanner from "../components/UnderConstructionBanner"; // Import banner

function Guilds() {
  // Dummy guild data for demonstration purposes
  const [guilds, setGuilds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // In a real application, fetch guild data from an API here.
    setGuilds([
      {
        id: 1,
        name: "Dragon Slayers",
        platform: "PC",
        game: "World of Warcraft",
        type: "Guild",
        members: 45,
        weeklyPoints: 1500,
        overallPoints: 45000,
      },
      {
        id: 2,
        name: "Stealth Assassins",
        platform: "Xbox",
        game: "Fortnite",
        type: "Team",
        members: 12,
        weeklyPoints: 1200,
        overallPoints: 36000,
      },
      {
        id: 3,
        name: "Clan of Legends",
        platform: "PlayStation",
        game: "Call of Duty",
        type: "Clan",
        members: 30,
        weeklyPoints: 2000,
        overallPoints: 60000,
      },
      {
        id: 4,
        name: "Pixel Warriors",
        platform: "PC",
        game: "Minecraft",
        type: "Guild",
        members: 20,
        weeklyPoints: 800,
        overallPoints: 24000,
      },
      {
        id: 5,
        name: "Shadow Ninjas",
        platform: "PC",
        game: "Valorant",
        type: "Team",
        members: 15,
        weeklyPoints: 1700,
        overallPoints: 51000,
      },
      {
        id: 6,
        name: "Eternal Guardians",
        platform: "Xbox",
        game: "Halo",
        type: "Clan",
        members: 25,
        weeklyPoints: 1600,
        overallPoints: 48000,
      },
      // Add more guilds as needed
    ]);
  }, []);

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = guilds.filter((guild) =>
      guild.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  // Get top 3 guilds for the week
  const topWeeklyGuilds = [...guilds]
    .sort((a, b) => b.weeklyPoints - a.weeklyPoints)
    .slice(0, 3);

  // Get top 3 guilds overall
  const topOverallGuilds = [...guilds]
    .sort((a, b) => b.overallPoints - a.overallPoints)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Under Construction Banner */}
      <UnderConstructionBanner />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Guilds & Clans
        </h1>
        <p className="text-center text-lg mb-8">
          Explore and join guilds, clans, or teams in your favorite games.
        </p>

        {/* Top Guilds Sections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Top Guilds This Week
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {topWeeklyGuilds.map((guild) => (
              <div
                key={guild.id}
                className="bg-white text-black rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{guild.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">
                    Platform: <span className="font-semibold">{guild.platform}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Game: <span className="font-semibold">{guild.game}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Type: <span className="font-semibold">{guild.type}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Members: <span className="font-semibold">{guild.members}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    Weekly Points: <span className="font-semibold">{guild.weeklyPoints}</span>
                  </p>
                  <Link
                    to={`/guild-profile/${guild.id}`}
                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                  >
                    View Guild Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Top Guilds Overall
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {topOverallGuilds.map((guild) => (
              <div
                key={guild.id}
                className="bg-white text-black rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{guild.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">
                    Platform: <span className="font-semibold">{guild.platform}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Game: <span className="font-semibold">{guild.game}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Type: <span className="font-semibold">{guild.type}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Members: <span className="font-semibold">{guild.members}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    Overall Points: <span className="font-semibold">{guild.overallPoints}</span>
                  </p>
                  <Link
                    to={`/guild-profile/${guild.id}`}
                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                  >
                    View Guild Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Search for a Guild
          </h2>
          <form onSubmit={handleSearch} className="flex justify-center mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter guild name..."
              className="w-2/3 p-3 rounded-l-lg focus:outline-none text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg"
            >
              Search
            </button>
          </form>

          {/* Search Results */}
          {searchResults.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Search Results</h3>
              <div className="grid gap-6 md:grid-cols-3">
                {searchResults.map((guild) => (
                  <div
                    key={guild.id}
                    className="bg-white text-black rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300"
                  >
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{guild.name}</h3>
                      <p className="text-sm text-gray-700 mb-1">
                        Platform: <span className="font-semibold">{guild.platform}</span>
                      </p>
                      <p className="text-sm text-gray-700 mb-1">
                        Game: <span className="font-semibold">{guild.game}</span>
                      </p>
                      <p className="text-sm text-gray-700 mb-1">
                        Type: <span className="font-semibold">{guild.type}</span>
                      </p>
                      <p className="text-sm text-gray-700 mb-1">
                        Members: <span className="font-semibold">{guild.members}</span>
                      </p>
                      <Link
                        to={`/guild-profile/${guild.id}`}
                        className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                      >
                        View Guild Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : searchQuery.trim() !== "" ? (
            <p className="text-center text-red-500">No guilds found matching your search.</p>
          ) : null}
        </div>

        {/* All Guilds Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            All Guilds
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {guilds.map((guild) => (
              <div
                key={guild.id}
                className="bg-white text-black rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{guild.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">
                    Platform: <span className="font-semibold">{guild.platform}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Game: <span className="font-semibold">{guild.game}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Type: <span className="font-semibold">{guild.type}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    Members: <span className="font-semibold">{guild.members}</span>
                  </p>
                  <Link
                    to={`/guild-profile/${guild.id}`}
                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                  >
                    View Guild Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action for Non-Members */}
        <div className="mt-12 text-center">
          <p className="text-xl font-semibold">
            Not a member yet? Discover what you're missing!
          </p>
          <Link
            to="/signup"
            className="inline-block mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-3 rounded transition transform hover:-translate-y-1"
          >
            Join YDEK Gaming Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Guilds;
