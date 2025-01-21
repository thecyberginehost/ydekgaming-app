import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

function CreateTournament() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    monetized: false,
    minPlayers: 2,
    maxPlayers: 10,
  });

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("You must be logged in to create a tournament.");
      return;
    }
    alert("Tournament created successfully! (Add backend logic here)");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <p className="text-lg text-center">
          Please <a href="/login" className="text-[#00f7ff] underline">log in</a> to create a tournament.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <div className="max-w-3xl mx-auto bg-[#1e293b] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Create a Tournament</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1">Tournament Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#0f172a] text-gray-300 border border-[#00f7ff] rounded"
              placeholder="Enter tournament title"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block mb-1">Tournament Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#0f172a] text-gray-300 border border-[#00f7ff] rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#0f172a] text-gray-300 border border-[#00f7ff] rounded"
              placeholder="Enter tournament description"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="monetized" className="flex items-center">
                <input
                  id="monetized"
                  name="monetized"
                  type="checkbox"
                  checked={formData.monetized}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Monetized Tournament
              </label>
            </div>
            <div>
              <label htmlFor="minPlayers" className="block mb-1">Min Players</label>
              <input
                id="minPlayers"
                name="minPlayers"
                type="number"
                value={formData.minPlayers}
                onChange={handleInputChange}
                className="w-full p-2 bg-[#0f172a] text-gray-300 border border-[#00f7ff] rounded"
                min="2"
                required
              />
            </div>
            <div>
              <label htmlFor="maxPlayers" className="block mb-1">Max Players</label>
              <input
                id="maxPlayers"
                name="maxPlayers"
                type="number"
                value={formData.maxPlayers}
                onChange={handleInputChange}
                className="w-full p-2 bg-[#0f172a] text-gray-300 border border-[#00f7ff] rounded"
                min="2"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#00f7ff] hover:bg-[#00c7dd] text-black font-bold px-6 py-3 rounded transition w-full"
          >
            Create Tournament
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTournament;
