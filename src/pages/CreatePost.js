// src/pages/CreatePost.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "aws-amplify";

function CreatePost() {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (!postText.trim() && !postImage) {
      alert("Please add some text or upload an image for your post.");
      return;
    }

    let imageUrl = null;

    if (postImage) {
      try {
        const key = `post-image-${Date.now()}.jpg`;
        await Storage.put(key, postImage, {
          level: "public",
          contentType: postImage.type,
        });
        imageUrl = await Storage.get(key);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload the image. Please try again.");
        return;
      }
    }

    const newPost = {
      id: Date.now(),
      text: postText.trim(),
      image: imageUrl,
    };

    // Save post to backend or state (mock for now)
    console.log("Post created:", newPost);

    // Redirect to profile page
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Create a Post</h1>

        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">
          <span className="text-gray-700">Upload an Image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPostImage(e.target.files[0])}
            className="mt-1 block"
          />
        </label>

        <button
          onClick={handleCreatePost}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
