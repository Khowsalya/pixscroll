// Components/Feed/feedUi.jsx
// Presentational components for Feed.jsx only.
// Pure props-in → JSX-out. No logic, no data fetching.

import { FeedStyles } from "./Feedstyles";
import {useState} from 'react';

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
export function PhotoCard({ img,likes,saved,comments, onClick, onActionClick,onAddComment }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
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
          <div className={FeedStyles.cardactionBar} >
            <button className="btn btn-sm" onClick={(e) => onActionClick?.(e, "like")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                 {likes} Like
            </button>

            <button className="btn btn-sm" onClick={(e) => onActionClick?.(e, "save")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                    {saved ? "Unsave" : "Save"}
            </button>

            <button className="btn btn-sm" onClick={(e) => {
              e.stopPropagation();
              setIsCommentOpen(!isCommentOpen);
            }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        />
                      </svg>
                      Comment
            </button>
          </div>
          
                {isCommentOpen && (
          <div
            className="mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="input input-bordered input-sm flex-1"
            />

            <button className="btn btn-sm"
            onClick={() => {
             if (!commentText.trim()) return; // Prevent empty comments
             onAddComment?.({ id: img.id, comment: commentText });
             setCommentText(""); // Clear input after posting
            }}>
              Post
            </button>
          {/* Display comments */}
        <div className="flex flex-col gap-1">
      {comments.map((comment, index) => (
        <p key={index} className="text-sm">
          {comment}
        </p>
      ))}
    </div>
          </div>


        )}
          <p className={FeedStyles.cardTitle}>{img.alt_description}</p>
          <p className={FeedStyles.cardUsername}>{img.user.username}</p>
          <p className={FeedStyles.cardBio}>{img.user.bio}</p>
        </div>
      </div>
    </div>
  );
}