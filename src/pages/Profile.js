// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { Auth, Storage } from "aws-amplify";

function Profile() {
  const [user, setUser] = useState(null);           // Cognito user object
  const [displayName, setDisplayName] = useState(""); // Local state for "display name"
  const [profilePic, setProfilePic] = useState(null); // Signed URL for current profile pic
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    // 1. Get current authenticated user
    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        setUser(currentUser);
        // 2. Try to load "displayName" from their Cognito attributes
        const attrs = currentUser.attributes || {};
        // If you stored display name in "custom:displayName" or built-in "name"
        const existingDisplayName = attrs["custom:displayName"] || attrs["name"] || "";
        setDisplayName(existingDisplayName);

        // 3. Load their profile pic from S3
        fetchProfilePic(currentUser.username);
      })
      .catch((err) => {
        console.error("No user signed in:", err);
        setStatusMessage("No user is signed in.");
      });
  }, []);

  // Helper to fetch the S3 image
  const fetchProfilePic = async (username) => {
    try {
      // Using a naming convention, e.g. "profile-pic-<username>.jpg"
      const key = `profile-pic-${username}.jpg`;
      const url = await Storage.get(key);
      setProfilePic(url);
    } catch (error) {
      // If not found, you might see "No profile pic" in console
      console.log("No profile pic found:", error);
    }
  };

  // Called when user selects a new file to upload
  const handleFileChange = async (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setUploading(true);
    setStatusMessage("");

    try {
      const username = user.username;
      const key = `profile-pic-${username}.jpg`;

      await Storage.put(key, file, {
        level: "public", // or "protected"
        contentType: file.type,
      });
      // Once uploaded, retrieve the new signed URL
      const url = await Storage.get(key);
      setProfilePic(url);
      setStatusMessage("Profile picture uploaded!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatusMessage("Error uploading file: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Called when user clicks "Save Profile"
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      setStatusMessage("");

      // Example: store displayName in a "custom:displayName" Cognito attribute
      // Or use the built-in "name" attribute. Adjust as needed
      const result = await Auth.updateUserAttributes(user, {
        "custom:displayName": displayName,
      });

      setStatusMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatusMessage("Error updating profile: " + error.message);
    } finally {
      setSaving(false);
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

        {/* Display user’s current pic */}
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

        {/* Upload new pic */}
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

        {/* Display Name update */}
        <form onSubmit={handleSaveProfile}>
          <label htmlFor="displayName" className="block text-gray-700 mb-1">
            Display Name:
          </label>
          <input
            id="displayName"
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter how you want to be seen"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>

        {statusMessage && (
          <p className="mt-4 text-green-600 font-medium">{statusMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
