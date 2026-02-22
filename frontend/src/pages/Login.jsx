import React, { useState } from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";
const Login = ({ onSwitchToRegister }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API connection will be added later
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // VERY IMPORTANT (for cookies)
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Login success:", data);
        navigate("/dashboard");
        alert("Login Successful 🚀");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="app-title">UniConnect</h1>
          <p className="app-subtitle">Connect with Students Across India</p>
        </div>

        <div className="form-section">
          <h2>Welcome Back</h2>
          <p className="form-subtitle">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="your.email@university.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <button onClick={onSwitchToRegister} className="switch-auth-btn">
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
