import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setuser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showPostsModal, setShowPostsModal] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/user/dashboard", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setuser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleViewPosts = () => {
    setLoadingPosts(true);
    fetch("http://localhost:3000/user/post", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Posts:", data);
        setUserPosts(data.posts || []);
        setShowPostsModal(true);
        setShowMenu(false);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
        alert("Failed to load posts");
      })
      .finally(() => {
        setLoadingPosts(false);
      });
  };

  const handleCreatePost = () => {
    setShowMenu(false);
    navigate("/post");
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {user ? <h3>Welcome {user.fullName}</h3> : <p>Loading...</p>}

      {/* Floating Plus Button with Menu */}
      <div className="floating-menu-container">
        <button
          className="floating-plus-btn"
          onClick={() => setShowMenu(!showMenu)}
          title="Menu"
        >
          +
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="dropdown-menu">
            <button className="menu-item" onClick={handleCreatePost}>
              Create a New Post
            </button>
            <button
              className="menu-item"
              onClick={handleViewPosts}
              disabled={loadingPosts}
            >
              {loadingPosts ? "Loading..." : "View My Posts"}
            </button>
          </div>
        )}
      </div>

      {/* Posts Modal */}
      {showPostsModal && (
        <div
          className="posts-modal-overlay"
          onClick={() => setShowPostsModal(false)}
        >
          <div className="posts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>My Posts</h2>
              <button
                className="close-modal-btn"
                onClick={() => setShowPostsModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="posts-list">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <div key={post._id} className="post-item">
                    <img src={post.image} alt="Post" className="post-image" />
                    <div className="post-content">
                      <p className="post-description">{post.description}</p>
                      <span className="post-date">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-posts">
                  No posts yet. Create your first post!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
