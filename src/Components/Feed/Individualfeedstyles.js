// Components/Feed/individualFeedStyle.js
// Tailwind className constants for IndividualFeed.jsx only.

export const IndividualFeedStyles = {
  // Page grid
  pageGrid:
    "grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 p-4 md:h-screen md:overflow-hidden bg-gray-50",

  // Column bases
  column:
    "bg-white rounded-[25px] border border-gray-100 p-5 flex flex-col gap-3 md:h-screen md:overflow-y-auto",
  centerColumn:
    "bg-white rounded-[25px] border border-gray-100 overflow-hidden flex flex-col md:h-screen md:overflow-y-auto",

  // Column order
  leftOrder: "order-2 md:order-1",
  centerOrder: "order-1 md:order-2",
  rightOrder: "order-3",

  // Section label
  sectionLabel: "text-[11px] uppercase tracking-widest text-gray-400",

  // Photographer avatar
  avatarRow: "flex items-center gap-3",
  avatarCircle:
    "w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-sm font-medium text-teal-700 shrink-0",
  avatarName: "text-sm font-medium text-gray-900",
  avatarHandle: "text-xs text-gray-500",

  // Shared meta field
  fieldGroup: "border-t border-gray-100 pt-3 flex flex-col gap-3",
  fieldLabel: "text-[11px] uppercase tracking-wide text-gray-400 mb-0.5",
  fieldValue: "text-sm font-medium text-gray-800",
  fieldMuted: "text-sm text-gray-600 leading-relaxed",

  // Center / hero image
  heroImg: "w-full h-56 md:h-80 object-cover",
  heroPadding: "p-5 flex-1",
  heroTitle: "text-base font-medium text-gray-900 mb-2",
  heroSubtitle: "text-sm text-gray-500 leading-relaxed",
  heroMeta: "border-t border-gray-100 pt-4 mt-4 flex flex-col gap-3",

  // Camera detail row
  cameraRow: "border-b border-gray-50 pb-3 last:border-0",

  // Tags
  tagsWrap: "flex flex-wrap gap-2",
  tag: "text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full",
  noTags: "text-sm text-gray-400",

  // Guard states
  guardCenter: "flex justify-center mt-10",
};
