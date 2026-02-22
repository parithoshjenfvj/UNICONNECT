import React, { useState } from "react";
import "../styles/Auth.css";

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    universityName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
        const response=await fetch("http://localhost:3000/api/auth/user/register",{
            method:"POST",
            credentials:"include",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: formData.fullName,
                email: formData.email,
                universityName: formData.universityName,
                password: formData.password,
            })
        });
        const data=await response.json();
        if(response.ok){
            alert("Registration Successful");
        }else{
            alert(data.message);
        }
    }catch(error){
        console.error("Registration error:", error);
        alert("Something went wrong");
    }

    // API connection will be added later
    console.log("Registration attempt:", {
      fullName: formData.fullName,
      email: formData.email,
      universityName: formData.universityName,
      password: formData.password,
    });
  };

  const popularUniversities = [
    "Delhi University",
    "BITS Pilani",
    "IIT Delhi",
    "Mumbai University",
    "IISER Pune",
    "Ashoka University",
    "Manipal Academy",
    "VIT Vellore",
    "NMIMS Mumbai",
    "Christ University",
    "Other University",
  ];

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <h1 className="app-title">UniConnect</h1>
          <p className="app-subtitle">Connect with Students Across India</p>
        </div>

        <div className="form-section">
          <h2>Create Your Account</h2>
          <p className="form-subtitle">Join the UniConnect community</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@university.ac.in"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="universityName">University / College</label>
              <select
                id="universityName"
                name="universityName"
                value={formData.universityName}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your university</option>
                {popularUniversities.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
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
              <small className="password-hint">
                Password must be at least 6 characters
              </small>
            </div>


            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <button onClick={onSwitchToLogin} className="switch-auth-btn">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
