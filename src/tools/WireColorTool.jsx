// src/tools/WireColorTool.jsx
// -------------------------------------------------------------
// Summary:
// - React tool component for the Wire Color Guide in the
//   Electrician Toolkit dashboard.
// - Replicates your original website tool:
//   user selects a voltage system, enters a circuit number,
//   and sees which phase color to use.
// - Uses getWireColorForCircuit() helper instead of direct
//   DOM access, and shares the same layout styles as the
//   Ohm's Law tool.
// -------------------------------------------------------------

import React, { useState } from "react";
import { getWireColorForCircuit } from "../data/wireColors";

function WireColorTool() {
  const [voltageSystem, setVoltageSystem] = useState("208");
  const [circuitInput, setCircuitInput] = useState("");
  const [result, setResult] = useState(null); // { circuit, color, colorClass }
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setResult(null);

    const circuitNumber = parseInt(circuitInput, 10);
    const response = getWireColorForCircuit(voltageSystem, circuitNumber);

    if (!response.ok) {
      setError(response.error);
      return;
    }

    setResult({
      circuit: response.circuit,
      color: response.color,
      colorClass: response.colorClass,
    });
  };

  return (
    <div className="tool-container">
      <div className="card">
        <h2 className="tool-title">Wire Color Guide</h2>

        <form onSubmit={handleSubmit} className="tool-form">
          <div className="form-group">
            <label htmlFor="voltageSystem" className="form-label">
              Voltage System
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
              Circuit Number
            </label>
            <input
              id="circuitNumber"
              type="number"
              min="1"
              className="form-control"
              value={circuitInput}
              onChange={(e) => setCircuitInput(e.target.value)}
              placeholder="e.g. 34"
            />
          </div>

          {/* Centered, smaller button - same pattern as Ohm's Law */}
          <div className="tool-button-row">
            <button
              type="submit"
              className="primary-button primary-button--small"
            >
              Get Wire Color
            </button>
          </div>
        </form>

        {error && (
          <div className="result-box result-box--error" role="alert">
            {error}
          </div>
        )}

        {result && !error && (
          <div className="result-box result-box--info">
            <strong>Circuit #{result.circuit}</strong> uses{" "}
            <span className={result.colorClass}>{result.color}</span> wire.
          </div>
        )}
      </div>
    </div>
  );
}

export default WireColorTool;
