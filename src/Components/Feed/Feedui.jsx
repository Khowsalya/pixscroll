// Components/Feed/feedUi.jsx
// Presentational components for Feed.jsx only.
// Pure props-in → JSX-out. No logic, no data fetching.

import { FeedStyles } from "./FeedStyles";

// ── EmptySearchState ──────────────────────────────────────────
/** Shown when a search returns zero results. */
export function EmptySearchState({ searchQuery }) {
  return (
    <div className={FeedStyles.emptyWrapper}>
      <span className={FeedStyles.emptyIcon}>🔍</span>
      <p className={FeedStyles.emptyHeading}>No photos found for "{searchQuery}"</p>
      <p className={FeedStyles.emptySubtext}>Try a different keyword or remove filters</p>
    </div>
  );
}

// ── SearchBanner ──────────────────────────────────────────────
/** "Showing results for …" strip above search results. */
export function SearchBanner({ searchQuery }) {
  return (
    <p className={FeedStyles.searchBanner}>
      Showing results for <strong>"{searchQuery}"</strong>
    </p>
  );
}

// ── PhotoCard ─────────────────────────────────────────────────
/** Single photo card rendered inside the Virtuoso list. */
export function PhotoCard({ img, onClick }) {
  return (
    <div className={FeedStyles.cardOuter}>
      <div onClick={onClick} className={FeedStyles.card}>
        <img
          src={img.urls.small}
          alt={img.alt_description || "image"}
          loading="lazy"
          className={FeedStyles.cardImage}
        />
        <div className={FeedStyles.cardBody}>
          <p className={FeedStyles.cardTitle}>{img.alt_description}</p>
          <p className={FeedStyles.cardUsername}>{img.user.username}</p>
          <p className={FeedStyles.cardBio}>{img.user.bio}</p>
        </div>
      </div>
    </div>
  );
}