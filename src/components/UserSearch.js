import React, { useState } from "react";

const dummyUsers = [
  {
    id: 1,
    username: "GamerOne",
    email: "gamerone@example.com",
    profilePic: "https://via.placeholder.com/48",
    achievements: ["Won tournament", "Reached level 50"],
    isActive: true,
  },
  {
    id: 2,
    username: "GamerTwo",
    email: "gamertwo@example.com",
    profilePic: "https://via.placeholder.com/48",
    achievements: ["Beat final boss"],
    isActive: false,
  },
  {
    id: 3,
    username: "GamerThree",
    email: "gamerthree@example.com",
    profilePic: "https://via.placeholder.com/48",
    achievements: ["Collected 1000 coins"],
    isActive: true,
  },
];

function UserSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedUser(null); // clear previous selection on new query

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }
    // Filter dummyUsers based on username or email
    const matches = dummyUsers.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedUser(suggestions[0]);
        setSuggestions([]);
        setQuery(suggestions[0].username); // set input to selected username
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <label className="block text-gray-700 mb-2">Search Users:</label>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border rounded"
        placeholder="Type username or email..."
      />
      {suggestions.length > 0 && (
        <ul className="border rounded mt-2 bg-white shadow max-h-40 overflow-y-auto">
          {suggestions.map((user) => (
            <li
              key={user.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
              onClick={() => {
                setSelectedUser(user);
                setSuggestions([]);
                setQuery(user.username);
              }}
            >
              <img
                src={user.profilePic}
                alt={`${user.username}'s avatar`}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span>{user.username} ({user.email})</span>
            </li>
          ))}
        </ul>
      )}
      {selectedUser && (
        <div className="mt-4 p-4 border-t pt-4">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={selectedUser.profilePic}
              alt={`${selectedUser.username}'s profile`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold">{selectedUser.username}</h2>
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    selectedUser.isActive ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                <span className="text-sm text-gray-600">
                  {selectedUser.isActive ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Achievements:</h3>
          {selectedUser.achievements.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {selectedUser.achievements.map((ach, idx) => (
                <li key={idx} className="text-gray-700">{ach}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mb-4">No achievements.</p>
          )}
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
            View Profile (Read-Only)
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
