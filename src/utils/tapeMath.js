// src/utils/tapeMath.js
// Summary:
// - Parse "tape measure" style strings into inches (Number).
// - Format inches back into tape-friendly fractions (nearest 1/16 by default).
//
// Supported inputs:
// - 4
// - 4.25
// - 4 1/4
// - 4-1/4
// - 3/16
// - 10' 2 3/16"
// - 10 ft 2 3/16 in

const DEFAULT_DENOM = 16;

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function simplifyFraction(n, d) {
  if (d === 0) return { n: 0, d: 1 };
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

export function roundToDenom(inches, denom = DEFAULT_DENOM) {
  if (!Number.isFinite(inches)) return NaN;
  return Math.round(inches * denom) / denom;
}

// Format inches into tape fraction string.
// includeFeet=false:  "7 9/16\""
// includeFeet=true:   "2' 7 9/16\""
export function formatTape(
  inches,
  { denom = DEFAULT_DENOM, includeFeet = false } = {}
) {
  if (!Number.isFinite(inches)) return "";

  const neg = inches < 0;
  let x = Math.abs(inches);

  x = roundToDenom(x, denom);

  let feet = 0;
  if (includeFeet) {
    feet = Math.floor(x / 12);
    x = x - feet * 12;
  }

  let whole = Math.floor(x);
  const frac = x - whole;

  let nRaw = Math.round(frac * denom);
  let n = nRaw;
  let d = denom;

  // Carry handling (e.g., 11 16/16 -> 12)
  if (n === denom) {
    whole += 1;
    n = 0;
  }

  // Simplify fraction for readability
  if (n !== 0) {
    const simp = simplifyFraction(n, d);
    n = simp.n;
    d = simp.d;
  }

  const parts = [];

  if (includeFeet) {
    parts.push(`${feet}'`);
  }

  if (n === 0) {
    parts.push(`${whole}"`);
  } else if (whole === 0) {
    parts.push(`${n}/${d}"`);
  } else {
    parts.push(`${whole} ${n}/${d}"`);
  }

  return (neg ? "-" : "") + parts.join(" ");
}

// Parse tape input into inches.
// Returns: { ok: true, inches } or { ok: false, error }
export function parseTapeToInches(input) {
  if (typeof input !== "string") return { ok: false, error: "Invalid input." };

  const raw = input.trim().toLowerCase();
  if (!raw) return { ok: false, error: "Enter a measurement." };

  // Plain number
  if (/^-?\d+(\.\d+)?$/.test(raw)) {
    return { ok: true, inches: Number(raw) };
  }

  // Normalize
  let s = raw
    .replace(/feet|foot|ft/g, "'")
    .replace(/inches|inch|in/g, '"')
    .replace(/″/g, '"')
    .replace(/′/g, "'")
    .replace(/"/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Extract feet if present
  let feet = 0;
  const feetMatch = s.match(/^(-?\d+)\s*'\s*(.*)$/);
  if (feetMatch) {
    feet = Number(feetMatch[1]);
    s = (feetMatch[2] || "").trim();
  }

  // Convert "4-1/4" to "4 1/4"
  s = s.replace(/-/g, " ").trim();

  // If only feet provided
  if (!s) return { ok: true, inches: feet * 12 };

  // Decimal inches
  if (/^-?\d+(\.\d+)?$/.test(s)) {
    return { ok: true, inches: feet * 12 + Number(s) };
  }

  const tokens = s.split(" ").filter(Boolean);

  let inchesPart = 0;

  // "N/D"
  if (tokens.length === 1 && /^-?\d+\/\d+$/.test(tokens[0])) {
    const [nStr, dStr] = tokens[0].split("/");
    const n = Number(nStr);
    const d = Number(dStr);
    if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) {
      return { ok: false, error: "Invalid fraction." };
    }
    inchesPart = n / d;
    return { ok: true, inches: feet * 12 + inchesPart };
  }

  // "W"
  if (tokens.length === 1 && /^-?\d+$/.test(tokens[0])) {
    inchesPart = Number(tokens[0]);
    return { ok: true, inches: feet * 12 + inchesPart };
  }

  // "W N/D"
  if (
    tokens.length === 2 &&
    /^-?\d+$/.test(tokens[0]) &&
    /^-?\d+\/\d+$/.test(tokens[1])
  ) {
    const w = Number(tokens[0]);
    const [nStr, dStr] = tokens[1].split("/");
    const n = Number(nStr);
    const d = Number(dStr);
    if (
      !Number.isFinite(w) ||
      !Number.isFinite(n) ||
      !Number.isFinite(d) ||
      d === 0
    ) {
      return { ok: false, error: "Invalid fraction." };
    }
    inchesPart = w + n / d;
    return { ok: true, inches: feet * 12 + inchesPart };
  }

  return {
    ok: false,
    error: "Could not parse. Examples: 4 1/4, 3/16, 10' 2 3/16\"",
  };
}
