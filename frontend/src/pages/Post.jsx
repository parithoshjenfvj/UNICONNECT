import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Post.css";

const Post = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description.trim()) {
      alert("Please select an image and add a description");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:3000/user/post", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Post created successfully!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-container">
      <div className="post-card">
        <div className="post-header">
          <h2>Create a New Post</h2>
          <button className="close-btn" onClick={() => navigate("/dashboard")}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          <div className="image-upload-section">
            {preview ? (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
                <label htmlFor="image-input" className="change-image-btn">
                  Change Image
                </label>
              </div>
            ) : (
              <label htmlFor="image-input" className="image-upload-label">
                <div className="upload-icon">📷</div>
                <p>Click to upload image</p>
              </label>
            )}
            <input
              type="file"
              id="image-input"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <textarea
            className="description-textarea"
            placeholder="Write a description for your post..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={5}
          />

          <div className="char-count">{description.length}/500</div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;