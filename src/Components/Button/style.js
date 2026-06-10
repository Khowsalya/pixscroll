// Components/Button/style.js

/**
 * Returns the correct Tailwind className string based on disabled state.
 * @param {boolean} disabled
 * @returns {string}
 */
export function getButtonClass(disabled) {
  return `px-4 py-2 rounded ${
    disabled
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-500 hover:bg-blue-600 text-white"
  }`;
}
