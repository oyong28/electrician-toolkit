// OhmsLawTool.jsx
// Ohm's Law calculator.
// -------------------------------------------------------------
// Original logic from ohms-law.js.

import React, { useState } from "react";

// Solves Ohm's Law equations given any two known values.
function solveOhmsLaw({ P, V, I, R }) {
  let p = isNaN(P) ? null : P;
  let v = isNaN(V) ? null : V;
  let i = isNaN(I) ? null : I;
  let r = isNaN(R) ? null : R;
  let error = "";
  // Try to compute missing values
  try {
    // Power
    if (p == null && v != null && i != null) p = v * i;
    else if (p == null && i != null && r != null) p = Math.pow(i, 2) * r;
    else if (p == null && v != null && r != null) p = Math.pow(v, 2) / r;

    // Voltage
    if (v == null && p != null && i != null) v = p / i;
    else if (v == null && i != null && r != null) v = i * r;
    else if (v == null && p != null && r != null) v = Math.sqrt(p * r);

    // Current
    if (i == null && p != null && v != null) i = p / v;
    else if (i == null && v != null && r != null) i = v / r;
    else if (i == null && p != null && r != null) i = Math.sqrt(p / r);

    // Resistance
    if (r == null && v != null && i != null) r = v / i;
    else if (r == null && p != null && i != null) r = p / Math.pow(i, 2);
    else if (r == null && p != null && v != null) r = Math.pow(v, 2) / p;

    // Need at least two known values
    if ([p, v, i, r].filter((x) => x == null).length > 2) {
      error = "Please provide at least two known values.";
    }

    return { p, v, i, r, error };
  } catch {
    return {
      p: null,
      v: null,
      i: null,
      r: null,
      error: "Calculation error. Please check your inputs.",
    };
  }
}

function OhmsLawTool() {
  // Raw input strings
  const [power, setPower] = useState("");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");

  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const P = parseFloat(power);
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const R = parseFloat(resistance);

    const solved = solveOhmsLaw({ P, V, I, R });
    setResult(solved);
  };

  return (
    <div className="tool-container">
      <div className="card">
        <h2 className="tool-title">Ohm&apos;s Law</h2>
        {/* Fields stacked P, E, I, R */}
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label" htmlFor="power">
              Power (P):
            </label>
            <input
              id="power"
              className="form-input"
              type="number"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              placeholder="Leave blank if unknown"
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="voltage">
              Voltage (E):
            </label>
            <input
              id="voltage"
              className="form-input"
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder="Volts"
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="current">
              Current (I):
            </label>
            <input
              id="current"
              className="form-input"
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="Amps"
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="resistance">
              Resistance (R):
            </label>
            <input
              id="resistance"
              className="form-input"
              type="number"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              placeholder="Leave blank if solving for Resistance"
            />
          </div>
        </div>

        <div className="tool-button-row">
          <button
            className="primary-button primary-button--small"
            type="button"
            onClick={handleCalculate}
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className="result-box result-box-ohms">
            {result.error ? (
              <div className="result-note">{result.error}</div>
            ) : (
              <>
                <div className="result-title">Results</div>
                <div>
                  <strong>Power (P):</strong> {result.p.toFixed(2)} W
                </div>
                <div>
                  <strong>Voltage (E):</strong> {result.v.toFixed(2)} V
                </div>
                <div>
                  <strong>Current (I):</strong> {result.i.toFixed(2)} A
                </div>
                <div>
                  <strong>Resistance (R):</strong> {result.r.toFixed(2)} Ω
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OhmsLawTool;
