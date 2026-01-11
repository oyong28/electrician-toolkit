// src/components/layout/Sidebar.jsx
// Tool selector list for the left rail.
// Parent controls visibility.

import React from "react";

function Sidebar({ tools = [], selectedToolKey, onSelectTool }) {
  return (
    <div className="sidebar-panel">
      <div className="tool-list">
        {tools.map((tool) => (
          <button
            key={tool.key}
            type="button"
            className={
              "tool-button" + (selectedToolKey === tool.key ? " active" : "")
            }
            onClick={() => onSelectTool(tool.key)}
          >
            {tool.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
