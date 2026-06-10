// Components/Button/function.js
// Pure helper for Button — event delegation guard.

/**
 * Safely calls onClick only if it is a function.
 * Keeps Button.jsx free of defensive inline checks.
 * @param {Function|undefined} onClick
 */
export function handleButtonClick(onClick) {
  if (typeof onClick === "function") onClick();
}
