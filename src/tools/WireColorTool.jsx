// src/tools/WireColorTool.jsx
// -------------------------------------------------------------
// Summary:
// - React tool component for the Wire Color Guide in the
//   Electrician Toolkit dashboard.
// - User selects a voltage system, enters a circuit number,
//   and sees which phase color to use.
// - Uses getWireColorForCircuit() helper and shares the same
//   layout styles as other tools.
// -------------------------------------------------------------

import React, { useState } from "react";
import { getWireColorForCircuit } from "../data/wireColors";
import { useTranslation } from "react-i18next";

function WireColorTool() {
  const { t } = useTranslation();

  const [voltageSystem, setVoltageSystem] = useState("208");
  const [circuitInput, setCircuitInput] = useState("");
  const [result, setResult] = useState(null); // { circuit, color, colorClass }
  const [errorKey, setErrorKey] = useState(""); // store translation key

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorKey("");
    setResult(null);

    const circuitNumber = parseInt(circuitInput, 10);
    const response = getWireColorForCircuit(voltageSystem, circuitNumber);

    if (!response.ok) {
      // IMPORTANT:
      // If your helper returns raw English strings, we map them to translation keys here.
      // This keeps UI fully translatable.
      const msg = (response.error || "").toLowerCase();

      if (msg.includes("enter") && msg.includes("circuit")) {
        setErrorKey("wireColor.errorEnterCircuit");
      } else if (msg.includes("valid") || msg.includes("number")) {
        setErrorKey("wireColor.errorValidCircuit");
      } else {
        setErrorKey("wireColor.errorGeneric");
      }

      return;
    }

    setResult({
      circuit: response.circuit,
      colorKey: response.colorKey,
      colorClass: response.colorClass,
    });
  };

  return (
    <div className="tool-container">
      <div className="card">
        <h2 className="tool-title">{t("wireColor.title")}</h2>

        <form onSubmit={handleSubmit} className="tool-form">
          <div className="form-group">
            <label htmlFor="voltageSystem" className="form-label">
              {t("wireColor.voltageSystem")}
            </label>

            <select
              id="voltageSystem"
              className="form-control"
              value={voltageSystem}
              onChange={(e) => setVoltageSystem(e.target.value)}
            >
              <option value="208">120/208V 3Ø 4W</option>
              <option value="480">277/480V 3Ø 4W</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="circuitNumber" className="form-label">
              {t("wireColor.circuitNumber")}
            </label>

            <input
              id="circuitNumber"
              type="number"
              min="1"
              className="form-control"
              value={circuitInput}
              onChange={(e) => setCircuitInput(e.target.value)}
              placeholder={t("wireColor.placeholderCircuit")}
            />
          </div>

          <div className="tool-button-row">
            <button
              type="submit"
              className="primary-button primary-button--small"
            >
              {t("wireColor.getWireColor")}
            </button>
          </div>
        </form>

        {errorKey && (
          <div className="result-box result-box--error" role="alert">
            {t(errorKey)}
          </div>
        )}

        {result && !errorKey && (
          <div className="result-box result-box--info">
            {t("wireColor.resultPrefix", { num: result.circuit })}{" "}
            <span className={result.colorClass}>
              {t(`colors.${result.colorKey}`)}
            </span>{" "}
            {t("wireColor.resultSuffix")}
          </div>
        )}
      </div>
    </div>
  );
}

export default WireColorTool;
