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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <p className="text-xl">No user is signed in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        {/* Display user info */}
        <p className="text-gray-700 mb-4">Username: {user.username}</p>

        {/* Display user's current pic */}
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
            <span className="text-gray-500">No Picture</span>
          </div>
        )}

        {/* Upload new profile pic */}
        <label className="block mb-2">
          <span className="text-gray-700">Upload a new picture:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block"
            disabled={uploading}
          />
        </label>
        {uploading && <p className="text-sm">Uploading...</p>}

        <hr className="my-4" />

        {/* About Me Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">About Me</h2>
          {editingAboutMe ? (
            <>
              <textarea
                className="w-full p-2 border rounded mb-2"
                rows="4"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="Write something about yourself..."
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveAboutMe}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingAboutMe(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-2">
                {aboutMe || "No About Me information yet."}
              </p>
              <button
                onClick={() => setEditingAboutMe(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Edit About Me
              </button>
            </>
          )}
        </div>

        {statusMessage && (
          <p className="mt-4 text-green-600 font-medium">{statusMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
