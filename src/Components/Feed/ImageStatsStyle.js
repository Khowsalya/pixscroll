// Components/Feed/imageStatsStyle.js
// Tailwind className constants for ImageStatsPage.jsx only.

export const statsStyles = {
  // Page / card wrapper
  pageWrapper: "w-full p-4 md:p-6",
  card: "bg-white rounded-2xl shadow-lg border border-gray-100 p-5",

  // Header row
  headerRow:
    "flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3",
  title: "text-2xl font-bold text-gray-800",
  subtitle: "text-sm text-gray-500 mt-1",

  // KPI stat chips
  statCardsRow: "flex mt-4 md:mt-0",
  statCardViews: "bg-pink-50 px-4 py-2 rounded-xl",
  statCardDownloads: "bg-blue-50 px-4 py-2 rounded-xl ml-4",
  statLabel: "text-sm text-gray-500",
  statValueViews: "text-xl font-bold text-pink-600",
  statValueDownloads: "text-xl font-bold text-blue-600",

  // Chart wrapper
  chartOuter: "flex justify-center",
  chartInner: "w-full md:w-[85%] lg:w-[75%] h-[350px]",

  // Error state
  errorText: "text-red-500 p-4",
};
