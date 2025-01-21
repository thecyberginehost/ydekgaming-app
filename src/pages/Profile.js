import React, { useEffect, useState } from "react";
import { Auth, Storage } from "aws-amplify";

function Profile() {
  const [user, setUser] = useState(null); // Cognito user object
  const [profilePic, setProfilePic] = useState(null); // Signed URL for current profile pic
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [aboutMe, setAboutMe] = useState(""); // "About Me" field
  const [editingAboutMe, setEditingAboutMe] = useState(false); // State to toggle editing mode

  useEffect(() => {
    // Get current authenticated user
    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        setUser(currentUser);

        // Load the user's profile pic from S3
        fetchProfilePic(currentUser.username);

        // Load "About Me" if it's saved as a Cognito custom attribute
        const attrs = currentUser.attributes || {};
        const aboutMeValue = attrs["custom:aboutMe"] || ""; // Adjust this key based on your Cognito setup
        setAboutMe(aboutMeValue);
      })
      .catch((err) => {
        console.error("No user signed in:", err);
        setStatusMessage("No user is signed in.");
      });
  }, []);

  // Helper to fetch the S3 image
  const fetchProfilePic = async (username) => {
    try {
      const key = `profile-pic-${username}.jpg`;
      const url = await Storage.get(key);
      setProfilePic(url);
    } catch (error) {
      console.log("No profile pic found:", error);
    }
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setUploading(true);
    setStatusMessage("");

    try {
      const username = user.username;
      const key = `profile-pic-${username}.jpg`;

      await Storage.put(key, file, {
        level: "public",
        contentType: file.type,
      });

      // Fetch the new profile picture URL
      const url = await Storage.get(key);
      setProfilePic(url);
      setStatusMessage("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatusMessage("Error uploading file: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Save "About Me" to Cognito
  const handleSaveAboutMe = async () => {
    try {
      setStatusMessage("");
      await Auth.updateUserAttributes(user, {
        "custom:aboutMe": aboutMe, // Adjust this key based on your Cognito setup
      });
      setEditingAboutMe(false);
      setStatusMessage("About Me updated successfully!");
    } catch (error) {
      console.error("Error saving About Me:", error);
      setStatusMessage("Error saving About Me: " + error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-4">
        <p className="text-xl">No user is signed in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-4xl mx-auto bg-[#1e293b] rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white mx-auto mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-white mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-300">No Picture</span>
            </div>
          )}
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-gray-200 mt-2">Gamer | Networker | Competitor</p>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* About Me Section */}
          <div>
            <h2 className="text-2xl font-bold mb-2">About Me</h2>
            {editingAboutMe ? (
              <>
                <textarea
                  className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none"
                  rows="4"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  placeholder="Write something about yourself..."
                />
                <div className="flex space-x-4 mt-2">
                  <button
                    onClick={handleSaveAboutMe}
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingAboutMe(false)}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-400">
                  {aboutMe || "Tell others about yourself."}
                </p>
                <button
                  onClick={() => setEditingAboutMe(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                >
                  Edit About Me
                </button>
              </>
            )}
          </div>

          {/* Upload Section */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Profile Picture</h2>
            <label className="block">
              <span className="text-gray-400">Change your profile picture:</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
                disabled={uploading}
              />
            </label>
            {uploading && (
              <p className="text-sm text-gray-400 mt-1">Uploading...</p>
            )}
          </div>
        </div>

        {statusMessage && (
          <div className="bg-green-500 text-white text-center p-3">
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
