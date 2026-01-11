// src/tools/TapeFractionTool.jsx
// Summary:
// - Standalone tape fraction calculator (add/subtract).
// - Inputs accept tape formats: 4 1/4, 3/16, 10' 2 3/16"
// - Output is rounded to nearest 1/16.

import React, { useMemo, useState } from "react";
import { formatTape, parseTapeToInches, roundToDenom } from "../utils/tapeMath";

function toFixedSmart(n, places = 4) {
  if (!Number.isFinite(n)) return "";
  return Number(n.toFixed(places));
}

function TapeFractionTool() {
  const [a, setA] = useState("");
  const [op, setOp] = useState("+");
  const [b, setB] = useState("");

  const parsedA = useMemo(() => parseTapeToInches(a), [a]);
  const parsedB = useMemo(() => parseTapeToInches(b), [b]);

  const result = useMemo(() => {
    if (!parsedA.ok || !parsedB.ok) {
      return { ok: false, message: "Enter two valid tape measurements." };
    }

    const aIn = parsedA.inches;
    const bIn = parsedB.inches;

    const out = op === "-" ? aIn - bIn : aIn + bIn;
    const rounded = roundToDenom(out, 16);

    return {
      ok: true,
      tape: formatTape(rounded, { denom: 16, includeFeet: true }),
      dec: `${toFixedSmart(rounded, 4)} in`,
    };
  }, [parsedA, parsedB, op]);

  const hint = (parsed) => {
    if (!parsed?.ok) return null;
    const rounded = roundToDenom(parsed.inches, 16);
    return (
      <div
        style={{ marginTop: "0.35rem", fontSize: "0.85rem", color: "#6c757d" }}
      >
        Parsed:{" "}
        <strong>{formatTape(rounded, { denom: 16, includeFeet: true })}</strong>{" "}
        <span style={{ opacity: 0.9 }}>({toFixedSmart(rounded, 4)} in)</span>
      </div>
    );
  };

  return (
    <div className="tool-container">
      <div className="card">
        <h2 className="tool-title">Tape Fraction Calculator</h2>

        <form className="tool-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="form-label" htmlFor="a">
              Measurement A
            </label>
            <input
              id="a"
              className="form-control"
              inputMode="text"
              placeholder="Examples: 3 1/2, 5-7/8, 10' 2 3/16&quot;"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
            {hint(parsedA)}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="op">
              Operation
            </label>
            <select
              id="op"
              className="form-control"
              value={op}
              onChange={(e) => setOp(e.target.value)}
            >
              <option value="+">Add (+)</option>
              <option value="-">Subtract (−)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="b">
              Measurement B
            </label>
            <input
              id="b"
              className="form-control"
              inputMode="text"
              placeholder='Examples: 1 1/4, 3/16, 2"'
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
            {hint(parsedB)}
          </div>

          {result.ok ? (
            <div className="result-box result-box--info">
              <div>
                <strong>Result:</strong> {result.tape}
              </div>
              <div style={{ fontSize: "0.85rem", opacity: 0.85 }}>
                {result.dec}
              </div>
            </div>
          ) : (
            <div className="result-box result-box--error">{result.message}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default TapeFractionTool;
