// src/data/wireColors.js
// -------------------------------------------------------------
// Summary:
// - Provides helper logic for the Wire Color Guide tool.
// - Returns data (no DOM) so React can render results cleanly.
// - Uses stable color keys so UI can translate color names.
// -------------------------------------------------------------

// 208 V: Black, Black, Red, Red, Blue, Blue
const COLORS_208 = ["black", "black", "red", "red", "blue", "blue"];

// 480 V: Brown, Brown, Orange, Orange, Yellow, Yellow
const COLORS_480 = ["brown", "brown", "orange", "orange", "yellow", "yellow"];

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
 *      { ok: true, circuit, colorKey, colorClass }
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
  const colorKey = colors[index];

  // Match your existing CSS pill classes like .color-Black, .color-Red, etc.
  const classNameSuffix = colorKey.charAt(0).toUpperCase() + colorKey.slice(1);

  return {
    ok: true,
    circuit: circuitNumber,
    colorKey,
    colorClass: `color-${classNameSuffix}`,
  };
}
