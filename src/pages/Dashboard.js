import React, { useEffect, useState } from "react";
import { Auth, Storage } from "aws-amplify";
import UserSearch from "../components/UserSearch";
import UnderConstructionBanner from "../components/UnderConstructionBanner";  // Import banner

function Dashboard() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(async (currentUser) => {
        setUser(currentUser);
        const username = currentUser.username;
        fetchProfilePic(username);

        // Use dummy data for achievements and friends; replace these with API calls later
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
          {
            id: 3,
            username: "GamerThree",
            profilePic: "https://via.placeholder.com/48",
            isActive: true,
          },
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
    <div className="min-h-screen bg-gray-100 p-6">
      <UnderConstructionBanner /> {/* Under Construction Banner at the top */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        {/* User Search Component */}
        <UserSearch />
        
        {/* User Profile Section */}
        {user && (
          <div className="bg-white rounded shadow p-6 mb-6 flex items-center space-x-4">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Pic</span>
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <div className="flex items-center mt-1">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm text-gray-600">Online</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Latest Achievements */}
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Latest Achievements</h2>
            {achievements.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {achievements.map((ach, index) => (
                  <li key={index} className="text-gray-700">{ach}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No achievements yet.</p>
            )}
          </div>

          {/* Friends List */}
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Friends</h2>
            {friends.length > 0 ? (
              <ul className="space-y-4">
                {friends.map((friend) => (
                  <li key={friend.id} className="flex items-center space-x-4">
                    <img
                      src={friend.profilePic}
                      alt={`${friend.username}'s profile`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-lg">{friend.username}</span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${friend.isActive ? "bg-green-500" : "bg-gray-500"}`}
                        title={friend.isActive ? "Online" : "Offline"}
                      ></span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No friends added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
