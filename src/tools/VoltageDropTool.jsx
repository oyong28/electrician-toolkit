// src/tools/VoltageDropTool.jsx
// Summary:
// - Voltage Drop calculator (single-phase + three-phase).
// - Uses classic circular-mil formulas:
//   Single-phase: VD = (2 × K × I × L) / CM
//   Three-phase:  VD = (1.732 × K × I × L) / CM
//
// Notes:
// - L is one-way length in feet.
// - Outputs VD (volts), percent drop, and estimated voltage at the load.

import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const WIRE_CM = [
  { label: "14 AWG", cm: 4110 },
  { label: "12 AWG", cm: 6530 },
  { label: "10 AWG", cm: 10380 },
  { label: "8 AWG", cm: 16510 },
  { label: "6 AWG", cm: 26240 },
  { label: "4 AWG", cm: 41740 },
  { label: "3 AWG", cm: 52620 },
  { label: "2 AWG", cm: 66360 },
  { label: "1 AWG", cm: 83690 },
  { label: "1/0", cm: 105600 },
  { label: "2/0", cm: 133100 },
  { label: "3/0", cm: 167800 },
  { label: "4/0", cm: 211600 },
  { label: "250 kcmil", cm: 250000 },
  { label: "300 kcmil", cm: 300000 },
  { label: "350 kcmil", cm: 350000 },
  { label: "400 kcmil", cm: 400000 },
  { label: "500 kcmil", cm: 500000 },
];

function toNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function round(n, d = 3) {
  if (!Number.isFinite(n)) return "";
  const p = 10 ** d;
  return Math.round(n * p) / p;
}

function VoltageDropTool() {
  const { t } = useTranslation();

  const [system, setSystem] = useState("single"); // single | three
  const [material, setMaterial] = useState("copper"); // copper | aluminum
  const [wire, setWire] = useState(String(WIRE_CM[1].cm)); // default 12 AWG
  const [voltage, setVoltage] = useState("120");
  const [amps, setAmps] = useState("20");
  const [lengthFt, setLengthFt] = useState("100"); // one-way

  const k = material === "aluminum" ? 21.2 : 12.9;

  const out = useMemo(() => {
    const V = toNum(voltage);
    const I = toNum(amps);
    const L = toNum(lengthFt);
    const CM = toNum(wire);

    if (!Number.isFinite(V) || V <= 0)
      return { ok: false, msg: t("voltageDrop.errors.voltage") };
    if (!Number.isFinite(I) || I <= 0)
      return { ok: false, msg: t("voltageDrop.errors.amps") };
    if (!Number.isFinite(L) || L <= 0)
      return { ok: false, msg: t("voltageDrop.errors.length") };
    if (!Number.isFinite(CM) || CM <= 0)
      return { ok: false, msg: t("voltageDrop.errors.wire") };

    const factor = system === "three" ? 1.732 : 2;
    const vd = (factor * k * I * L) / CM;
    const pct = (vd / V) * 100;
    const loadV = V - vd;

    return {
      ok: true,
      vd: round(vd, 3),
      pct: round(pct, 2),
      loadV: round(loadV, 2),
      factor,
      k,
    };
  }, [system, material, wire, voltage, amps, lengthFt, k, t]);

  return (
    <div className="tool-container">
      <div className="card">
        <h2 className="tool-title">{t("voltageDrop.title")}</h2>

        <form className="tool-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="form-label" htmlFor="system">
              {t("voltageDrop.system")}
            </label>
            <select
              id="system"
              className="form-control"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
            >
              <option value="single">{t("voltageDrop.systemSingle")}</option>
              <option value="three">{t("voltageDrop.systemThree")}</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="material">
              {t("voltageDrop.material")}
            </label>
            <select
              id="material"
              className="form-control"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="copper">{t("voltageDrop.materialCopper")}</option>
              <option value="aluminum">
                {t("voltageDrop.materialAluminum")}
              </option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="wire">
              {t("voltageDrop.wire")}
            </label>
            <select
              id="wire"
              className="form-control"
              value={wire}
              onChange={(e) => setWire(e.target.value)}
            >
              {WIRE_CM.map((w) => (
                <option key={w.cm} value={String(w.cm)}>
                  {w.label} (CM {w.cm.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="voltage">
              {t("voltageDrop.voltageLabel")}
            </label>
            <input
              id="voltage"
              className="form-control"
              inputMode="decimal"
              placeholder={t("voltageDrop.placeholders.voltage")}
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amps">
              {t("voltageDrop.ampsLabel")}
            </label>
            <input
              id="amps"
              className="form-control"
              inputMode="decimal"
              placeholder={t("voltageDrop.placeholders.amps")}
              value={amps}
              onChange={(e) => setAmps(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="lengthFt">
              {t("voltageDrop.lengthLabel")}
            </label>
            <input
              id="lengthFt"
              className="form-control"
              inputMode="decimal"
              placeholder={t("voltageDrop.placeholders.length")}
              value={lengthFt}
              onChange={(e) => setLengthFt(e.target.value)}
            />
          </div>

          {out.ok ? (
            <div className="result-box result-box--info">
              <div>
                <strong>{t("voltageDrop.resultVd")}:</strong> {out.vd} V
              </div>
              <div>
                <strong>{t("voltageDrop.resultPct")}:</strong> {out.pct}%
              </div>
              <div>
                <strong>{t("voltageDrop.resultLoadV")}:</strong> {out.loadV} V
              </div>

              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.85rem",
                  opacity: 0.9,
                }}
              >
                {t("voltageDrop.footerNote", { factor: out.factor, k: out.k })}
              </div>
            </div>
          ) : (
            <div className="result-box result-box--error">{out.msg}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default VoltageDropTool;
