// src/tools/ConduitBendingTool.jsx
// Summary:
// - Conduit Bending Tool (v3 - tape friendly + saddles)
// - Includes:
//   1) 2-Bend Offset calculator (standard multipliers + shrink)
//   2) Rolling Offset calculator (true offset -> same multipliers + shrink)
//   3) 3-Bend Saddle (22.5°-45°-22.5° layout with standard spacing + center advance)
//   4) 4-Bend Saddle (two offsets separated by a span)
//
// Notes:
// - Inputs accept tape formats: 4 1/4, 3/16, 10' 2 3/16"
// - Outputs are rounded to nearest 1/16 and displayed as tape fractions.

import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatTape, parseTapeToInches, roundToDenom } from "../utils/tapeMath";

const ANGLE_OPTIONS = [
  { deg: 10, label: "10°", multiplier: 5.8, shrinkPerIn: 1 / 16 },
  { deg: 22.5, label: "22.5°", multiplier: 2.6, shrinkPerIn: 3 / 16 },
  { deg: 30, label: "30°", multiplier: 2.0, shrinkPerIn: 1 / 4 },
  { deg: 45, label: "45°", multiplier: 1.4, shrinkPerIn: 3 / 8 },
  { deg: 60, label: "60°", multiplier: 1.2, shrinkPerIn: 1 / 2 },
];

// 3-bend saddle defaults (22.5°-45°-22.5°)
// - Outer marks from center = Height × 2.5
// - Center mark advance = Height × 3/16
const SADDLE3_OUTER_FROM_CENTER_MULT = 2.5;
const SADDLE3_CENTER_ADV_PER_IN = 3 / 16;

function toFixedSmart(n, places = 4) {
  if (!Number.isFinite(n)) return "";
  return Number(n.toFixed(places));
}

function ConduitBendingTool() {
  const { t } = useTranslation();

  const [mode, setMode] = useState("offset"); // "offset" | "rolling" | "saddle3" | "saddle4"
  const [angleDeg, setAngleDeg] = useState("30");

  // Tape-style inputs
  const [offsetIn, setOffsetIn] = useState("");
  const [riseIn, setRiseIn] = useState("");
  const [rollIn, setRollIn] = useState("");

  // Saddle inputs
  const [saddleHeightIn, setSaddleHeightIn] = useState("");
  const [saddleWidthIn, setSaddleWidthIn] = useState("");

  const angle = useMemo(() => {
    const match = ANGLE_OPTIONS.find((a) => String(a.deg) === String(angleDeg));
    return match || ANGLE_OPTIONS[2];
  }, [angleDeg]);

  // Live parsed previews (helps avoid mistakes)
  const parsedOffset = useMemo(() => parseTapeToInches(offsetIn), [offsetIn]);
  const parsedRise = useMemo(() => parseTapeToInches(riseIn), [riseIn]);
  const parsedRoll = useMemo(() => parseTapeToInches(rollIn), [rollIn]);

  const parsedSaddleHeight = useMemo(
    () => parseTapeToInches(saddleHeightIn),
    [saddleHeightIn],
  );
  const parsedSaddleWidth = useMemo(
    () => parseTapeToInches(saddleWidthIn),
    [saddleWidthIn],
  );

  const results = useMemo(() => {
    const denom = 16;

    const formatLine = (inches) => {
      const rounded = roundToDenom(inches, denom);
      return {
        tape: formatTape(rounded, { denom, includeFeet: false }),
        dec: `${toFixedSmart(rounded, 4)} in`,
      };
    };

    if (mode === "offset") {
      if (!parsedOffset.ok || parsedOffset.inches <= 0) {
        return {
          ok: false,
          message: t("conduitBending.errors.offsetInvalid"),
        };
      }

      const off = parsedOffset.inches;

      const distanceBetweenMarks = off * angle.multiplier;
      const shrink = off * angle.shrinkPerIn;

      return {
        ok: true,
        title: t("conduitBending.results.offsetTitle"),
        lines: [
          { label: t("conduitBending.labels.angle"), value: angle.label },
          {
            label: t("conduitBending.labels.multiplier"),
            value: `${angle.multiplier}`,
          },
          {
            label: t("conduitBending.labels.distanceBetweenMarks"),
            value: formatLine(distanceBetweenMarks),
          },
          {
            label: t("conduitBending.labels.shrink"),
            value: formatLine(shrink),
          },
        ],
        note: t("conduitBending.notes.offsetNote"),
      };
    }

    if (mode === "rolling") {
      if (
        !parsedRise.ok ||
        parsedRise.inches <= 0 ||
        !parsedRoll.ok ||
        parsedRoll.inches <= 0
      ) {
        return {
          ok: false,
          message: t("conduitBending.errors.rollingInvalid"),
        };
      }

      const rise = parsedRise.inches;
      const roll = parsedRoll.inches;

      const trueOffset = Math.sqrt(rise * rise + roll * roll);
      const distanceBetweenMarks = trueOffset * angle.multiplier;
      const shrink = trueOffset * angle.shrinkPerIn;

      return {
        ok: true,
        title: t("conduitBending.results.rollingTitle"),
        lines: [
          { label: t("conduitBending.labels.angle"), value: angle.label },
          {
            label: t("conduitBending.labels.trueOffset"),
            value: formatLine(trueOffset),
          },
          {
            label: t("conduitBending.labels.multiplier"),
            value: `${angle.multiplier}`,
          },
          {
            label: t("conduitBending.labels.distanceBetweenMarks"),
            value: formatLine(distanceBetweenMarks),
          },
          {
            label: t("conduitBending.labels.shrink"),
            value: formatLine(shrink),
          },
        ],
        note: t("conduitBending.notes.rollingNote"),
      };
    }

    if (mode === "saddle3") {
      if (!parsedSaddleHeight.ok || parsedSaddleHeight.inches <= 0) {
        return {
          ok: false,
          message: t("conduitBending.errors.saddleHeightInvalid"),
        };
      }

      const h = parsedSaddleHeight.inches;

      const outerFromCenter = h * SADDLE3_OUTER_FROM_CENTER_MULT;
      const centerAdvance = h * SADDLE3_CENTER_ADV_PER_IN;

      return {
        ok: true,
        title: t("conduitBending.results.saddle3Title"),
        lines: [
          {
            label: t("conduitBending.labels.bends"),
            value: "22.5° — 45° — 22.5°",
          },
          {
            label: t("conduitBending.labels.saddleHeight"),
            value: formatLine(h),
          },
          {
            label: t("conduitBending.labels.centerMarkAdvance"),
            value: formatLine(centerAdvance),
          },
          {
            label: t("conduitBending.labels.outerMarksFromCenter"),
            value: formatLine(outerFromCenter),
          },
          {
            label: t("conduitBending.labels.outerToCenterSpacing"),
            value: formatLine(outerFromCenter),
          },
        ],
        note: t("conduitBending.notes.saddle3Note"),
      };
    }

    if (mode === "saddle4") {
      if (!parsedSaddleHeight.ok || parsedSaddleHeight.inches <= 0) {
        return {
          ok: false,
          message: t("conduitBending.errors.saddleHeightInvalid4"),
        };
      }
      if (!parsedSaddleWidth.ok || parsedSaddleWidth.inches <= 0) {
        return {
          ok: false,
          message: t("conduitBending.errors.saddleWidthInvalid"),
        };
      }

      const h = parsedSaddleHeight.inches; // offset depth per side
      const w = parsedSaddleWidth.inches; // obstacle span

      const markSpacing = h * angle.multiplier;
      const shrinkPerSide = h * angle.shrinkPerIn;
      const totalShrink = 2 * shrinkPerSide;

      const halfW = w / 2;

      const innerFromCenter = roundToDenom(halfW, 16);
      const outerFromCenter = roundToDenom(halfW + markSpacing, 16);

      return {
        ok: true,
        title: t("conduitBending.results.saddle4Title"),
        lines: [
          { label: t("conduitBending.labels.angleAll4"), value: angle.label },
          {
            label: t("conduitBending.labels.saddleHeight"),
            value: formatLine(h),
          },
          {
            label: t("conduitBending.labels.saddleWidthSpan"),
            value: formatLine(w),
          },
          {
            label: t("conduitBending.labels.markSpacingEachOffset"),
            value: formatLine(markSpacing),
          },
          {
            label: t("conduitBending.labels.shrinkPerSide"),
            value: formatLine(shrinkPerSide),
          },
          {
            label: t("conduitBending.labels.totalShrink"),
            value: formatLine(totalShrink),
          },
          {
            label: t("conduitBending.labels.innerMarksFromCenter"),
            value: {
              tape: `± ${formatTape(innerFromCenter, { denom: 16, includeFeet: false })}`,
              dec: `${toFixedSmart(innerFromCenter, 4)} in`,
            },
          },
          {
            label: t("conduitBending.labels.outerMarksFromCenter2"),
            value: {
              tape: `± ${formatTape(outerFromCenter, { denom: 16, includeFeet: false })}`,
              dec: `${toFixedSmart(outerFromCenter, 4)} in`,
            },
          },
        ],
        note: t("conduitBending.notes.saddle4Note"),
      };
    }

    return { ok: false, message: t("conduitBending.errors.selectOption") };
  }, [
    mode,
    angle,
    parsedOffset,
    parsedRise,
    parsedRoll,
    parsedSaddleHeight,
    parsedSaddleWidth,
    t,
  ]);

  const renderParsedHint = (parsed) => {
    if (!parsed || !parsed.ok) return null;
    const rounded = roundToDenom(parsed.inches, 16);
    return (
      <div
        style={{ marginTop: "0.35rem", fontSize: "0.85rem", color: "#6c757d" }}
      >
        {t("conduitBending.parsed")}{" "}
        <strong>{formatTape(rounded, { denom: 16, includeFeet: true })}</strong>{" "}
        <span style={{ opacity: 0.9 }}>({toFixedSmart(rounded, 4)} in)</span>
      </div>
    );
  };

  return (
    <div className="tool-container">
      <div className="card">
        <h2 className="tool-title">{t("conduitBending.title")}</h2>

        <form className="tool-form" onSubmit={(e) => e.preventDefault()}>
          {/* Mode */}
          <div className="form-group">
            <label className="form-label" htmlFor="mode">
              {t("conduitBending.modeLabel")}
            </label>
            <select
              id="mode"
              className="form-control"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="offset">{t("conduitBending.modes.offset")}</option>
              <option value="rolling">
                {t("conduitBending.modes.rolling")}
              </option>
              <option value="saddle3">
                {t("conduitBending.modes.saddle3")}
              </option>
              <option value="saddle4">
                {t("conduitBending.modes.saddle4")}
              </option>
            </select>
          </div>

          {/* Angle */}
          <div className="form-group">
            <label className="form-label" htmlFor="angle">
              {t("conduitBending.angleLabel")}
            </label>
            <select
              id="angle"
              className="form-control"
              value={angleDeg}
              onChange={(e) => setAngleDeg(e.target.value)}
              disabled={mode === "saddle3"}
              title={
                mode === "saddle3" ? t("conduitBending.saddle3AngleHint") : ""
              }
            >
              {ANGLE_OPTIONS.map((a) => (
                <option key={a.deg} value={String(a.deg)}>
                  {t("conduitBending.angleOption", {
                    label: a.label,
                    mult: a.multiplier,
                  })}
                </option>
              ))}
            </select>
          </div>

          {/* Inputs */}
          {mode === "offset" ? (
            <div className="form-group">
              <label className="form-label" htmlFor="offsetIn">
                {t("conduitBending.offsetDistance")}
              </label>
              <input
                id="offsetIn"
                className="form-control"
                inputMode="text"
                placeholder={t("conduitBending.placeholders.offset")}
                value={offsetIn}
                onChange={(e) => setOffsetIn(e.target.value)}
              />
              {renderParsedHint(parsedOffset)}
            </div>
          ) : mode === "rolling" ? (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="riseIn">
                  {t("conduitBending.rise")}
                </label>
                <input
                  id="riseIn"
                  className="form-control"
                  inputMode="text"
                  placeholder={t("conduitBending.placeholders.rise")}
                  value={riseIn}
                  onChange={(e) => setRiseIn(e.target.value)}
                />
                {renderParsedHint(parsedRise)}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="rollIn">
                  {t("conduitBending.roll")}
                </label>
                <input
                  id="rollIn"
                  className="form-control"
                  inputMode="text"
                  placeholder={t("conduitBending.placeholders.roll")}
                  value={rollIn}
                  onChange={(e) => setRollIn(e.target.value)}
                />
                {renderParsedHint(parsedRoll)}
              </div>
            </>
          ) : mode === "saddle3" ? (
            <div className="form-group">
              <label className="form-label" htmlFor="saddleHeightIn">
                {t("conduitBending.saddleHeight")}
              </label>
              <input
                id="saddleHeightIn"
                className="form-control"
                inputMode="text"
                placeholder={t("conduitBending.placeholders.saddleHeight")}
                value={saddleHeightIn}
                onChange={(e) => setSaddleHeightIn(e.target.value)}
              />
              {renderParsedHint(parsedSaddleHeight)}
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="saddleHeightIn4">
                  {t("conduitBending.saddleHeight")}
                </label>
                <input
                  id="saddleHeightIn4"
                  className="form-control"
                  inputMode="text"
                  placeholder={t("conduitBending.placeholders.saddleHeight4")}
                  value={saddleHeightIn}
                  onChange={(e) => setSaddleHeightIn(e.target.value)}
                />
                {renderParsedHint(parsedSaddleHeight)}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="saddleWidthIn">
                  {t("conduitBending.saddleWidthSpan")}
                </label>
                <input
                  id="saddleWidthIn"
                  className="form-control"
                  inputMode="text"
                  placeholder={t("conduitBending.placeholders.saddleWidth")}
                  value={saddleWidthIn}
                  onChange={(e) => setSaddleWidthIn(e.target.value)}
                />
                {renderParsedHint(parsedSaddleWidth)}
              </div>
            </>
          )}

          {/* Results */}
          {results.ok ? (
            <div className="result-box result-box--info">
              <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>
                {results.title}
              </div>

              {results.lines.map((line) => (
                <div key={line.label} style={{ marginBottom: "0.35rem" }}>
                  <strong>{line.label}:</strong>{" "}
                  {typeof line.value === "string" ? (
                    line.value
                  ) : (
                    <>
                      <span>{line.value.tape}</span>
                      <div style={{ fontSize: "0.85rem", opacity: 0.85 }}>
                        {line.value.dec}
                      </div>
                    </>
                  )}
                </div>
              ))}

              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.85rem",
                  opacity: 0.9,
                }}
              >
                {results.note}
              </div>
            </div>
          ) : (
            <div className="result-box result-box--error">
              {results.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ConduitBendingTool;
