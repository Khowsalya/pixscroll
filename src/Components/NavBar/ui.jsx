// Components/NavBar/ui.jsx
// Presentational components — pure props-in → JSX-out.
// No state, no side-effects, no business logic.

import { navStyles } from "./style";
import { COLORS }    from "./function";

// ─────────────────────────────────────────────────────────────
// SearchInput
// ─────────────────────────────────────────────────────────────
export function SearchInput({ value, onChange, onKeyDown, onFocus, onClear }) {
  return (
    <div className={navStyles.inputRow}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder="Search photos..."
        autoComplete="off"
        className={navStyles.input}
      />
      {value && (
        <button
          onMouseDown={onClear}
          className={navStyles.clearBtn}
          type="button"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SuggestionDropdown
// ─────────────────────────────────────────────────────────────
export function SuggestionDropdown({
  suggestions,
  activeIdx,
  topicsReady,
  onPick,
  onDeleteHistory,
  onClearAllHistory,
}) {
  if (!suggestions.length) return null;

  const hasHistoryItems = suggestions.some((s) => s.type === "history");
  const hasKeywordItems = suggestions.some((s) => s.type === "keyword");
  const showDivider     = hasHistoryItems && hasKeywordItems;

  return (
    <ul className={navStyles.dropdown}>
      {/* Recent searches header row */}
      {hasHistoryItems && (
        <li className={navStyles.dropdownHistHdr}>
          <span className={navStyles.dropdownSectionLbl}>Recent searches</span>
          <button onMouseDown={onClearAllHistory} className={navStyles.dropdownClearAll}>
            Clear all
          </button>
        </li>
      )}

      {suggestions.map((s, i) => (
        <li key={i}>
          {/* Divider + "Topics" label between history and keyword sections */}
          {showDivider &&
            s.type === "keyword" &&
            suggestions[i - 1]?.type === "history" && (
              <div className={navStyles.dropdownDivider}>
                <span className={navStyles.dropdownSectionLbl}>
                  {topicsReady ? "Unsplash topics" : "Suggestions"}
                </span>
              </div>
            )}

          <div
            onMouseDown={() => onPick(s.text)}
            className={activeIdx === i ? navStyles.dropdownItemActive : navStyles.dropdownItemIdle}
          >
            {/* Thumbnail for topic items; icon for history/raw */}
            {s.type === "keyword" && s.thumb ? (
              <img src={s.thumb} alt={s.text} className={navStyles.dropdownThumb} />
            ) : (
              <span className={navStyles.dropdownIconWrap}>
                {s.type === "history" ? "🕐" : s.type === "raw" ? "🔎" : "🔍"}
              </span>
            )}

            <span className="flex-1">{s.text}</span>

            {/* × delete button — history items only */}
            {s.type === "history" && (
              <button
                onMouseDown={(e) => onDeleteHistory(e, s.text)}
                className={navStyles.dropdownDeleteBtn}
                aria-label={`Remove "${s.text}" from history`}
              >
                ×
              </button>
            )}

            {/* "Search" label for raw fallback */}
            {s.type === "raw" && (
              <span className={navStyles.dropdownRawLabel}>Search</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────
// AvatarMenu
// ─────────────────────────────────────────────────────────────
export function AvatarMenu() {
  return (
    <div className={navStyles.avatarWrapper}>
      <div tabIndex={0} role="button" className={navStyles.avatarBtn}>
        <div className={navStyles.avatarImgWrap}>
          <img
            alt="avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <ul tabIndex="-1" className={navStyles.avatarMenu}>
        <li>
          <a className="justify-between">
            Profile <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FilterBar
// ─────────────────────────────────────────────────────────────
export function FilterBar({ filters, searchQuery, onFilterChange, onClear }) {
  return (
    <div className={navStyles.filterBar}>
      {/* Color */}
      <select
        className={navStyles.filterSelect}
        value={filters.color}
        onChange={(e) => onFilterChange("color", e.target.value)}
      >
        <option value="">Any color</option>
        {COLORS.map((c) => (
          <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
        ))}
      </select>

      {/* Orientation */}
      <select
        className={navStyles.filterSelect}
        value={filters.orientation}
        onChange={(e) => onFilterChange("orientation", e.target.value)}
      >
        <option value="">Any orientation</option>
        <option value="landscape">Landscape</option>
        <option value="portrait">Portrait</option>
        <option value="squarish">Square</option>
      </select>

      {/* Sort order */}
      <select
        className={navStyles.filterSelect}
        value={filters.order_by}
        onChange={(e) => onFilterChange("order_by", e.target.value)}
      >
        <option value="relevant">Most relevant</option>
        <option value="latest">Latest</option>
      </select>

      {/* Safety */}
      <select
        className={navStyles.filterSelect}
        value={filters.content_filter}
        onChange={(e) => onFilterChange("content_filter", e.target.value)}
      >
        <option value="low">Standard</option>
        <option value="high">Safe mode</option>
      </select>

      {/* Active query display + clear */}
      <div className={navStyles.filterQueryRow}>
        <span className={navStyles.filterQueryText}>
          "<strong>{searchQuery}</strong>"
        </span>
        <button onClick={onClear} className={navStyles.filterClearBtn}>
          Clear ×
        </button>
      </div>
    </div>
  );
}