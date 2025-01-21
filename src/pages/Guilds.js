import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UnderConstructionBanner from "../components/UnderConstructionBanner"; // Import banner

function Guilds() {
  // Guild data and state for search/filtering
  const [guilds, setGuilds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Mock guild data (replace with API call in production)
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
    ]);
  }, []);

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

  const topGuilds = [...guilds].sort((a, b) => b.weeklyPoints - a.weeklyPoints).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <UnderConstructionBanner />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 text-center mb-8">
          Guilds & Clans
        </h1>

        {/* Top Guilds Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6 text-center">
            Top Guilds This Week
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {topGuilds.map((guild) => (
              <div
                key={guild.id}
                className="bg-white text-black rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{guild.name}</h3>
                  <p className="text-sm text-gray-600">Platform: {guild.platform}</p>
                  <p className="text-sm text-gray-600">Game: {guild.game}</p>
                  <p className="text-sm text-gray-600">Members: {guild.members}</p>
                  <p className="text-sm text-gray-600">
                    Weekly Points: <span className="font-bold">{guild.weeklyPoints}</span>
                  </p>
                  <Link
                    to={`/guild-profile/${guild.id}`}
                    className="mt-4 block bg-blue-600 text-white font-bold text-center py-2 rounded-lg hover:bg-blue-700"
                  >
                    View Guild
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Section */}
        <form onSubmit={handleSearch} className="mb-8 flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a guild..."
            className="w-3/4 md:w-1/2 p-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-3 rounded-r-lg font-bold hover:from-green-600 hover:to-blue-700"
          >
            Search
          </button>
        </form>

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {searchResults.map((guild) => (
              <div
                key={guild.id}
                className="bg-white text-black rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{guild.name}</h3>
                  <p className="text-sm text-gray-600">Platform: {guild.platform}</p>
                  <p className="text-sm text-gray-600">Game: {guild.game}</p>
                  <Link
                    to={`/guild-profile/${guild.id}`}
                    className="mt-4 block bg-blue-600 text-white font-bold text-center py-2 rounded-lg hover:bg-blue-700"
                  >
                    View Guild
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          searchQuery && <p className="text-center text-red-500">No results found.</p>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-xl font-semibold">
            Join our community of gamers and connect with guilds today!
          </p>
          <Link
            to="/signup"
            className="mt-4 inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 font-bold rounded-lg hover:from-purple-600 hover:to-pink-600"
          >
            Join YDEK Gaming Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Guilds;
