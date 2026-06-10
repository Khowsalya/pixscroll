// Components/Feed/individualFeedFunction.js
// Pure helpers for IndividualFeed.jsx only.
// No React, no side-effects — fully unit-testable.

/**
 * Formats an ISO date string to "Month Day, Year" (en-US locale).
 * @param {string|undefined} dateStr
 * @returns {string}
 */
export function formatPublishedDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Returns "W × H" string, or "—" if either dimension is missing.
 * @param {number|undefined} width
 * @param {number|undefined} height
 * @returns {string}
 */
export function formatDimensions(width, height) {
  return width && height ? `${width} × ${height}` : "—";
}

/**
 * Builds the EXIF rows array for the camera details panel.
 * Centralised here so the UI component receives a clean typed array,
 * not raw API data.
 * @param {object|undefined} exif
 * @returns {Array<{ label: string, value: string|undefined }>}
 */
export function buildExifRows(exif) {
  return [
    { label: "Make", value: exif?.make },
    { label: "Model", value: exif?.model },
    { label: "Aperture", value: exif?.aperture?.toString() },
    { label: "Shutter speed", value: exif?.exposure_time?.toString() },
    { label: "ISO", value: exif?.iso?.toString() },
    { label: "Focal length", value: exif?.focal_length?.toString() },
  ];
}
