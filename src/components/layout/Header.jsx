// Header.jsx
// Top header bar for the Electrician Toolkit.
// Uses the same dark-mode behavior as your main site by toggling body.dark-mode.

import React, { useState, useEffect } from "react";

function Header() {
  // Initialize from current body state (in case page already in dark mode)
  const [isDark, setIsDark] = useState(() =>
    document.body.classList.contains("dark-mode")
  );

  const handleToggleTheme = () => {
    document.body.classList.toggle("dark-mode");
    setIsDark((prev) => !prev);
  };

  // Keep title simple and on-brand
  return (
    <header className="app-header">
      <h1 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
        Electrician Toolkit
      </h1>
      <a
        href="https://joeyoyong.com/#projects"
        className="btn btn-outline-primary"
        style={{ marginLeft: "1rem" }}
      >
        🏠 Home
      </a>

      <button
        id="darkModeToggle"
        type="button"
        onClick={handleToggleTheme}
        style={{
          padding: "0.35rem 0.75rem",
          borderRadius: "999px",
          border: "1px solid rgba(0,0,0,0.1)",
          backgroundColor: isDark ? "#ffc107" : "#0d6efd",
          color: "#fff",
          fontSize: "0.8rem",
          cursor: "pointer",
        }}
      >
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}

export default Header;
