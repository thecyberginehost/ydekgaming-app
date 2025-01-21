import React, { useEffect, useState } from "react";
import { Auth, Storage } from "aws-amplify";
import { Link } from "react-router-dom";
import UserSearch from "../components/UserSearch";
import UnderConstructionBanner from "../components/UnderConstructionBanner"; // Import banner

function Dashboard() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [friends, setFriends] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(async (currentUser) => {
        setUser(currentUser);
        const username = currentUser.username;
        fetchProfilePic(username);

        // Dummy data for achievements, friends, and activity feed
        setAchievements([
          "Defeated the Dark Lord",
          "Reached Level 100",
          "Won 5 tournaments in a row",
        ]);

        setFriends([
          {
            id: 1,
            username: "GamerOne",
            profilePic: "https://via.placeholder.com/48",
            isActive: true,
          },
          {
            id: 2,
            username: "GamerTwo",
            profilePic: "https://via.placeholder.com/48",
            isActive: false,
          },
        ]);

        setActivityFeed([
          { id: 1, message: "You joined the 'Battle Royale Championship' tournament." },
          { id: 2, message: "GamerOne sent you a friend request." },
          { id: 3, message: "Achievement unlocked: 'Top Player of the Week'." },
        ]);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const fetchProfilePic = async (username) => {
    try {
      const key = `profile-pic-${username}.jpg`;
      const url = await Storage.get(key);
      setProfilePic(url);
    } catch (error) {
      console.log("No profile pic found:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <UnderConstructionBanner /> {/* Under Construction Banner */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">No Pic</span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">Welcome, {user?.username || "Gamer"}!</h1>
              <p className="text-gray-200">It's a great day to dominate the leaderboards.</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/settings"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Settings
            </Link>
            <Link
              to="/profile"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              View Profile
            </Link>
          </div>
        </header>

        {/* Stats and Quick Links */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Tournaments</h2>
            <p className="text-4xl font-extrabold">{achievements.length}</p>
            <p className="text-gray-400">Joined Tournaments</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Guilds</h2>
            <p className="text-4xl font-extrabold">{friends.length}</p>
            <p className="text-gray-400">Guilds Participated</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Achievements</h2>
            <p className="text-4xl font-extrabold">{achievements.length}</p>
            <p className="text-gray-400">Unlocked Achievements</p>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-8 bg-[#1e293b] p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Recent Activity</h2>
          {activityFeed.length > 0 ? (
            <ul className="space-y-4">
              {activityFeed.map((activity) => (
                <li
                  key={activity.id}
                  className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  {activity.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent activity yet.</p>
          )}
        </section>

        {/* Call to Action */}
        <footer className="mt-8 text-center">
          <p className="text-lg text-gray-400">
            Explore tournaments, guilds, and connect with your community!
          </p>
          <div className="mt-4 space-x-4">
            <Link
              to="/tournaments"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Join Tournaments
            </Link>
            <Link
              to="/guilds"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Explore Guilds
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
