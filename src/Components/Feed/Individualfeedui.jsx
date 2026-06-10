// Components/Feed/individualFeedUi.jsx
// Presentational components for IndividualFeed.jsx only.
// Pure props-in → JSX-out. No logic, no data fetching.

import Button                    from "../Button/Button";
import { IndividualFeedStyles }  from "./Individualfeedstyles";

// ── MetaField ─────────────────────────────────────────────────
/** Reusable labelled metadata row: label above, value below. */
export function MetaField({ label, value }) {
  return (
    <div>
      <p className={IndividualFeedStyles.fieldLabel}>{label}</p>
      <p className={IndividualFeedStyles.fieldValue}>{value ?? "—"}</p>
    </div>
  );
}

// ── PhotographerPanel ─────────────────────────────────────────
/** Left column — avatar, username, bio, social, location. */
export function PhotographerPanel({ data }) {
  return (
    <div className={`${IndividualFeedStyles.leftOrder} ${IndividualFeedStyles.column}`}>
      <p className={IndividualFeedStyles.sectionLabel}>Photographer</p>

      <div className={IndividualFeedStyles.avatarRow}>
        <div className={IndividualFeedStyles.avatarCircle}>
          {data?.user?.username?.[0]?.toUpperCase()}
        </div>
        <div>
          <p className={IndividualFeedStyles.avatarName}>{data?.user?.name}</p>
          <p className={IndividualFeedStyles.avatarHandle}>@{data?.user?.username}</p>
        </div>
      </div>

      <div className={IndividualFeedStyles.fieldGroup}>
        <MetaField
          label="Instagram"
          value={
            data?.user?.instagram_username
              ? `@${data.user.instagram_username}`
              : "Not available"
          }
        />
        <MetaField label="Location"     value={data?.location?.city} />
        <MetaField label="Country"      value={data?.location?.country} />

        <div>
          <p className={IndividualFeedStyles.fieldLabel}>Bio</p>
          <p className={IndividualFeedStyles.fieldMuted}>
            {data?.user?.bio ?? "No bio available"}
          </p>
        </div>

        <MetaField label="Total photos" value={data?.user?.total_photos} />
        <MetaField label="Total likes"  value={data?.user?.total_likes} />
      </div>
    </div>
  );
}

// ── ImagePanel ────────────────────────────────────────────────
/** Centre column — hero image, description, meta, CTA button. */
export function ImagePanel({ data, isRedirecting, onViewStats, formattedDate, dimensions }) {
  return (
    <div className={`${IndividualFeedStyles.centerOrder} ${IndividualFeedStyles.centerColumn}`}>
      <img
        src={data?.urls?.regular}
        alt={data?.alt_description}
        className={IndividualFeedStyles.heroImg}
      />

      <div className={IndividualFeedStyles.heroPadding}>
        <p className={IndividualFeedStyles.heroTitle}>
          {data?.description ?? data?.alt_description ?? "No description"}
        </p>
        <p className={IndividualFeedStyles.heroSubtitle}>
          {data?.alt_description}
        </p>

        <div className={IndividualFeedStyles.heroMeta}>
          <MetaField label="Likes"      value={data?.likes} />
          <MetaField label="Published"  value={formattedDate} />
          <MetaField label="Dimensions" value={dimensions} />
          <div>
            <Button
              buttonText={isRedirecting ? "Loading Stats..." : "View Statistics"}
              onClick={onViewStats}
              disabled={isRedirecting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CameraPanel ───────────────────────────────────────────────
/** Right column — EXIF camera rows + tags. */
export function CameraPanel({ exifRows, tags }) {
  return (
    <div className={`${IndividualFeedStyles.rightOrder} ${IndividualFeedStyles.column}`}>
      <p className={IndividualFeedStyles.sectionLabel}>Camera details</p>

      <div className="flex flex-col gap-3">
        {exifRows.map(({ label, value }) => (
          <div key={label} className={IndividualFeedStyles.cameraRow}>
            <p className={IndividualFeedStyles.fieldLabel}>{label}</p>
            <p className={IndividualFeedStyles.fieldValue}>{value ?? "Unknown"}</p>
          </div>
        ))}
      </div>

      <div className={IndividualFeedStyles.fieldGroup}>
        <p className={IndividualFeedStyles.sectionLabel}>Tags</p>
        <div className={IndividualFeedStyles.tagsWrap}>
          {tags?.length > 0
            ? tags.map((tag) => (
                <span key={tag.title} className={IndividualFeedStyles.tag}>
                  {tag.title}
                </span>
              ))
            : <p className={IndividualFeedStyles.noTags}>No tags</p>
          }
        </div>
      </div>
    </div>
  );
}