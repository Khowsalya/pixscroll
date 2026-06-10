// Components/Feed/feedStyle.js
// Tailwind className constants for Feed.jsx only.

export const FeedStyles = {
  // Empty-state block
  emptyWrapper:
    "flex flex-col items-center justify-center mt-20 gap-2 text-gray-400",
  emptyIcon: "text-4xl",
  emptyHeading: "text-lg font-medium",
  emptySubtext: "text-sm",

  // Search result banner
  searchBanner: "text-center text-sm text-gray-400 py-2",

  // Photo card
  cardOuter: "flex justify-center py-3",
  card: "w-[300px] rounded-[25px] overflow-hidden shadow-md bg-white cursor-pointer hover:shadow-xl transition-shadow",
  cardImage: "w-full h-[150px] object-cover",
  cardBody: "p-3 flex flex-col gap-1 text-left",
  cardTitle: "text-sm font-semibold line-clamp-2",
  cardUsername: "text-xs text-gray-600",
  cardBio: "text-xs text-gray-500 line-clamp-2",

  // Infinite scroll footer
  loadingMore: "text-center mt-4",
  noMore: "text-center mt-4 text-gray-500",
};
