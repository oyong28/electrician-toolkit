// src/App.jsx
// Mobile-friendly layout for Electrician Toolkit.
// Sidebar labels are now fully translatable via i18next.

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const tools = [
    { key: "ohmsLaw", label: t("sidebar.ohmsLaw") },
    { key: "wireColor", label: t("sidebar.wireColor") },
    { key: "conduitBending", label: t("sidebar.conduitBending") },
    { key: "tapeFraction", label: t("sidebar.tapeFraction") },
    { key: "voltageDrop", label: t("sidebar.voltageDrop") },
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
        <aside className={"left-rail" + (toolsOpen ? " open" : "")}>
          <button
            type="button"
            className="tools-button"
            onClick={() => setToolsOpen((v) => !v)}
            aria-expanded={toolsOpen}
          >
            ☰ {t("header.tools")}
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

        <main className="app-main">
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
