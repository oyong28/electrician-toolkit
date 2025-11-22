// src/data/wireColors.js
// -------------------------------------------------------------
// Summary:
// - Provides reusable helper functions and data for the
//   Wire Color Guide tool in the Electrician Toolkit.
// - Mirrors the original wire-color.js logic, but returns
//   plain data so React components can use it without
//   touching the DOM.
//
// Structure:
// - Constant arrays for each voltage system.
// - getWireColorForCircuit() - main helper that validates
//   the circuit number and returns either an error object
//   or a color result object.
// -------------------------------------------------------------

// 208 V: Black, Black, Red, Red, Blue, Blue
const COLORS_208 = ["Black", "Black", "Red", "Red", "Blue", "Blue"];

// 480 V: Brown, Brown, Orange, Orange, Yellow, Yellow
const COLORS_480 = ["Brown", "Brown", "Orange", "Orange", "Yellow", "Yellow"];

const SYSTEM_COLOR_MAP = {
  208: COLORS_208,
  480: COLORS_480,
};

/**
 * getWireColorForCircuit
 * ----------------------
 * @param {string} system - "208" or "480"
 * @param {number} circuitNumber - positive integer circuit number
 *
 * @returns {object}
 *  - On success:
 *      { ok: true, circuit, color, colorClass }
 *  - On error:
 *      { ok: false, error }
 */
export function getWireColorForCircuit(system, circuitNumber) {
  if (!Number.isInteger(circuitNumber) || circuitNumber <= 0) {
    return {
      ok: false,
      error: "Please enter a valid positive circuit number.",
    };
  }

  const colors = SYSTEM_COLOR_MAP[system];

  if (!colors) {
    return {
      ok: false,
      error: "Please select a valid voltage system.",
    };
  }

  const index = (circuitNumber - 1) % colors.length;
  const color = colors[index];

  return {
    ok: true,
    circuit: circuitNumber,
    color,
    colorClass: `color-${color}`,
  };
}
