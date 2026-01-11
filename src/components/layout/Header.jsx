// src/components/layout/Header.jsx
// Top header bar for the Electrician Toolkit.
// Mobile: shows a Tools button in the header that opens the drawer.

import React from "react";

function Header({ onOpenTools }) {
  return (
    <header className="app-header">
      <h1 className="header-title">Electrician Toolkit</h1>

      <div className="header-right">
        <button type="button" className="header-tools" onClick={onOpenTools}>
          ☰ Tools
        </button>

        <a href="https://joeyoyong.com/#projects" className="header-home">
          Home
        </a>
      </div>
    </header>
  );
}

export default Header;
