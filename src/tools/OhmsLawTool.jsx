// src/tools/OhmsLawTool.jsx
// Ohm's Law calculator (translated UI).

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// Solves Ohm's Law equations given any two known values.
// Returns errorKey instead of an English sentence so UI can translate it.
function solveOhmsLaw({ P, V, I, R }) {
  let p = isNaN(P) ? null : P;
  let v = isNaN(V) ? null : V;
  let i = isNaN(I) ? null : I;
  let r = isNaN(R) ? null : R;

  let errorKey = "";

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
      errorKey = "ohmsLaw.errorTwoValues";
    }

    return { p, v, i, r, errorKey };
  } catch {
    return {
      p: null,
      v: null,
      i: null,
      r: null,
      errorKey: "ohmsLaw.errorCalc",
    };
  }
}

function OhmsLawTool() {
  const { t, i18n } = useTranslation();

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

  // Quick debug you can remove later:
  // If this logs correct Spanish strings when you toggle, i18n is fine.
  console.log("LANG:", i18n.language, t("ohmsLaw.title"));

  return (
    <div className="tool-container">
      <div className="card">
        <h2 className="tool-title">{t("ohmsLaw.title")}</h2>

        <div className="form-grid">
          <div className="form-field">
            <label className="form-label" htmlFor="power">
              {t("ohmsLaw.power")}
            </label>
            <input
              id="power"
              className="form-input"
              type="number"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              placeholder={t("ohmsLaw.placeholderUnknown")}
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="voltage">
              {t("ohmsLaw.voltage")}
            </label>
            <input
              id="voltage"
              className="form-input"
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder={t("ohmsLaw.placeholderVolts")}
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="current">
              {t("ohmsLaw.current")}
            </label>
            <input
              id="current"
              className="form-input"
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder={t("ohmsLaw.placeholderAmps")}
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="resistance">
              {t("ohmsLaw.resistance")}
            </label>
            <input
              id="resistance"
              className="form-input"
              type="number"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              placeholder={t("ohmsLaw.placeholderSolveResistance")}
            />
          </div>
        </div>

        <div className="tool-button-row">
          <button
            className="primary-button primary-button--small"
            type="button"
            onClick={handleCalculate}
          >
            {t("ohmsLaw.calculate")}
          </button>
        </div>

        {result && (
          <div className="result-box result-box-ohms">
            {result.errorKey ? (
              <div className="result-note">{t(result.errorKey)}</div>
            ) : (
              <>
                <div className="result-title">{t("ohmsLaw.results")}</div>
                <div>
                  <strong>P:</strong> {result.p.toFixed(2)} W
                </div>
                <div>
                  <strong>E:</strong> {result.v.toFixed(2)} V
                </div>
                <div>
                  <strong>I:</strong> {result.i.toFixed(2)} A
                </div>
                <div>
                  <strong>R:</strong> {result.r.toFixed(2)} Ω
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
