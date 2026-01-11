// src/App.jsx
// Mobile-friendly version of the PROD VIDEO layout.
// Desktop: left rail under header + Tools button inside rail.
// Mobile: left rail becomes a slide-in drawer opened from header.

import React, { useState } from "react";
import "./styles/globals.css";
import "./styles/layout.css";

import Header from "./components/layout/Header.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import Footer from "./components/layout/Footer.jsx";

import OhmsLawTool from "./tools/OhmsLawTool.jsx";
import WireColorTool from "./tools/WireColorTool.jsx";
import ConduitBendingTool from "./tools/ConduitBendingTool.jsx";
import TapeFractionTool from "./tools/TapeFractionTool.jsx";
import VoltageDropTool from "./tools/VoltageDropTool.jsx";

function App() {
  const tools = [
    { key: "ohmsLaw", label: "Ohm's Law" },
    { key: "wireColor", label: "Wire Color Guide" },
    { key: "conduitBending", label: "Conduit Bending" },
    { key: "tapeFraction", label: "Tape Fraction Calc" },
    { key: "voltageDrop", label: "Voltage Drop" },
  ];

  const [selectedToolKey, setSelectedToolKey] = useState("ohmsLaw");
  const [toolsOpen, setToolsOpen] = useState(false);

  const renderTool = () => {
    switch (selectedToolKey) {
      case "wireColor":
        return <WireColorTool />;
      case "conduitBending":
        return <ConduitBendingTool />;
      case "tapeFraction":
        return <TapeFractionTool />;
      case "voltageDrop":
        return <VoltageDropTool />;
      case "ohmsLaw":
      default:
        return <OhmsLawTool />;
    }
  };

  return (
    <div className="app-shell">
      <Header onOpenTools={() => setToolsOpen(true)} />

      <div className="app-shell-inner">
        {/* LEFT RAIL / DRAWER */}
        <aside className={"left-rail" + (toolsOpen ? " open" : "")}>
          {/* Desktop tools button (hidden on mobile by CSS) */}
          <button
            type="button"
            className="tools-button"
            onClick={() => setToolsOpen((v) => !v)}
            aria-expanded={toolsOpen}
          >
            ☰ Tools
          </button>

          <Sidebar
            tools={tools}
            selectedToolKey={selectedToolKey}
            onSelectTool={(key) => {
              setSelectedToolKey(key);
              setToolsOpen(false);
            }}
          />
        </aside>

        {/* MAIN */}
        <main className="app-main">
          {/* Dim overlay when Tools is open (click to close) */}
          <button
            type="button"
            className={"main-dim" + (toolsOpen ? " open" : "")}
            aria-label="Close tools menu"
            onClick={() => setToolsOpen(false)}
          />

          <div className="tool-stage">
            <div className="tool-container">{renderTool()}</div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
