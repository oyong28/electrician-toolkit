// Sidebar.jsx
// Left side tool selector. Renders a list of tools and highlights the selected tool.

import React from "react";

function Sidebar({ tools, selectedToolKey, onSelectTool }) {
  return (
    <aside className="app-sidebar">
      <h2 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>Tools</h2>

      <div className="tool-list">
        {tools.map((tool) => (
          <button
            key={tool.key}
            className={
              "tool-button" + (selectedToolKey === tool.key ? " active" : "")
            }
            onClick={() => onSelectTool(tool.key)}
          >
            {tool.label}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
