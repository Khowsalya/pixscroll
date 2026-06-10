// Components/NavBar/function.js
// Pure helpers — localStorage history management + suggestion building.
// No React, no side-effects, fully unit-testable.

export const HISTORY_KEY = "unsplash_search_history";
export const MAX_HISTORY = 10;

export const KEYWORDS = [
  "abstract",
  "animals",
  "architecture",
  "beach",
  "black and white",
  "buildings",
  "city",
  "dark",
  "flowers",
  "food",
  "forest",
  "landscape",
  "mountains",
  "nature",
  "ocean",
  "people",
  "portrait",
  "sky",
  "space",
  "street",
  "sunset",
  "travel",
  "urban",
  "vintage",
  "wildlife",
  "fashion",
  "fitness",
  "minimal",
  "night",
  "rain",
  "snow",
  "technology",
  "texture",
  "water",
  "wedding",
];

export const COLORS = [
  "black_and_white",
  "black",
  "white",
  "yellow",
  "orange",
  "red",
  "purple",
  "magenta",
  "green",
  "teal",
  "blue",
];

export const FUSE_OPTIONS = {
  threshold: 0.4,
  distance: 100,
  minMatchCharLength: 1,
  keys: ["title"],
};

// ── localStorage helpers ──────────────────────────────────────

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveToHistory(query) {
  const q = query.trim();
  if (!q || q.length < 2) return;
  const history = getHistory();
  const updated = [q, ...history.filter((s) => s !== q)].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function removeFromHistory(query) {
  const updated = getHistory().filter((s) => s !== query);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearAllHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

// ── Suggestion builder ────────────────────────────────────────

/**
 * Builds the merged suggestion list from history + Fuse topic matches.
 * Priority: 1. history matches  2. topic/fuse matches  3. raw fallback
 *
 * NOTE: This is a pure function — it does NOT call setSuggestions/setShowDrop.
 * The caller (NavBar.jsx) is responsible for updating state with the returned value.
 *
 * @param {string} query
 * @param {object} fuseInstance - Fuse.js instance
 * @returns {Array<{ text: string, type: "history"|"keyword"|"raw", thumb: string|null }>}
 */
export function buildSuggestions(query, fuseInstance) {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return getHistory()
      .slice(0, 6)
      .map((s) => ({ text: s, type: "history", thumb: null }));
  }

  // 1. History matches — substring, max 3
  const historyMatches = getHistory()
    .filter((s) => s.toLowerCase().includes(trimmed))
    .slice(0, 3)
    .map((s) => ({ text: s, type: "history", thumb: null }));

  // 2. Fuse topic matches — fuzzy, max 5, no duplicates with history
  const fuseMatches = fuseInstance
    .search(trimmed)
    .map((r) => ({ text: r.item.title, thumb: r.item.thumb }))
    .filter((k) => !historyMatches.find((h) => h.text === k.text))
    .slice(0, 5)
    .map((s) => ({ ...s, type: "keyword" }));

  // 3. Raw fallback — only if nothing matched
  const noMatches = historyMatches.length === 0 && fuseMatches.length === 0;
  const rawFallback = noMatches
    ? [{ text: trimmed, type: "raw", thumb: null }]
    : [];

  return [...historyMatches, ...fuseMatches, ...rawFallback];
}

/**
 * Merges API topics with static KEYWORDS, deduplicating by title.
 * @param {Array<{ title: string, thumb: string|null }>} apiTopics
 * @returns {Array<{ title: string, thumb: string|null }>}
 */
export function mergeTopicsWithKeywords(apiTopics) {
  const staticShaped = KEYWORDS.map((k) => ({ title: k, thumb: null }));
  return [
    ...apiTopics,
    ...staticShaped.filter((s) => !apiTopics.find((t) => t.title === s.title)),
  ];
}
