// App.jsx
// -------------------------------------------------------------
// Summary:
// - Top-level structure for the Electrician Toolkit.
// - Renders Header, Sidebar, main panel, and Footer.
// - Manages which tool is selected and shows the correct tool
//   component in the main area.
//
// Structure:
// - tools array: controls what appears in the sidebar.
// - selectedToolKey state: tracks which tool is active.
// - renderTool(): returns the correct tool component based
//   on the selectedToolKey.
// -------------------------------------------------------------

import React, { useState } from "react";
import Header from "./components/layout/Header.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import Footer from "./components/layout/Footer.jsx";

import OhmsLawTool from "./tools/OhmsLawTool.jsx";
import WireColorTool from "./tools/WireColorTool.jsx";
// Later we will import:
// import VoltageDropTool from "./tools/VoltageDropTool.jsx";
// import ConduitFillTool from "./tools/ConduitFillTool.jsx";
// import AmpacityTool from "./tools/AmpacityTool.jsx";

function App() {
  // List of tools that appear in the sidebar
  const tools = [
    { key: "ohmsLaw", label: "Ohm's Law" },
    { key: "wireColor", label: "Wire Color Guide" },
    { key: "voltageDrop", label: "Voltage Drop" },
    { key: "conduitFill", label: "Conduit Fill" },
    { key: "wireAmpacity", label: "Ampacity" },
  ];

  // Currently selected tool key
  const [selectedToolKey, setSelectedToolKey] = useState("ohmsLaw");

  // Optional: helper to get the label for the selected tool
  const currentTool = tools.find((t) => t.key === selectedToolKey);

  // Decide which tool component to render in the main panel
  const renderTool = () => {
    switch (selectedToolKey) {
      case "ohmsLaw":
        return <OhmsLawTool />;
      case "wireColor":
        return <WireColorTool />;
      // Later we will add:
      // case "voltageDrop":
      //   return <VoltageDropTool />;
      // case "conduitFill":
      //   return <ConduitFillTool />;
      // case "wireAmpacity":
      //   return <AmpacityTool />;
      default:
        return (
          <p style={{ color: "#6c757d" }}>
            This tool is coming soon. We will build it after Ohm&apos;s Law and
            Wire Color Guide.
          </p>
        );
    }
  };

  return (
    <div className="app-shell">
      <Header />

      <Sidebar
        tools={tools}
        selectedToolKey={selectedToolKey}
        onSelectTool={setSelectedToolKey}
      />

      <main className="app-main">
        {/* If you ever want to show the current tool name at the top, you can use currentTool here */}
        {/* <h1 className="app-main-title">{currentTool?.label}</h1> */}
        {renderTool()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
