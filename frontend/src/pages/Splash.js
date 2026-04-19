import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loader-container">
      <div className="loader-logo">🎶</div>
      <h1>MUSIC</h1>
      <div className="spinner"></div>
      <div className="loading-text">Loading Assets...</div>
    </div>
  );
};

export default Splash;