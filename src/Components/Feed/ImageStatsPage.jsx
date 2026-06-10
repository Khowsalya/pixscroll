// import PageLoader from "../PageLoader/PageLoader";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { fetchImageStats } from "../../services/fetchImageStats";
// import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
// import { Line } from 'react-chartjs-2';
// Chart.register(
//   CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// function ImageStatsPage({ id }) {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["ImageStats", id],
//     queryFn: () => fetchImageStats(id),
//     retry: 2,
//     retryDelay: 1000,
//     staleTime: 1000 * 60 * 5,
//     gcTime: 1000 * 60 * 10,
//   });
//   useEffect(() => {
//     if (data) {
//       console.log("data", data);
//     }
//   }, [data]);
//   if (isLoading) return <PageLoader />;
//   if (isError) return <div>Failed to load</div>;

//   const historicalViewValues = Array.isArray(data?.views?.historical?.values)
//     ? data.views.historical.values
//     : [];

//   const historicalDownloadValues = Array.isArray(data?.downloads?.historical?.values)
//     ? data.downloads.historical.values
//     : [];

//   const totalViews =
//     typeof data?.views?.historical?.change === "number"
//       ? data.views.historical.change
//       : historicalViewValues.reduce((sum, item) => sum + (Number(item?.value) || 0), 0);

//   const totalDownloads =
//     typeof data?.downloads?.historical?.change === "number"
//       ? data.downloads.historical.change
//       : historicalDownloadValues.reduce((sum, item) => sum + (Number(item?.value) || 0), 0);

//   const labels = historicalViewValues
//     .map((item) =>
//       item?.date
//         ? new Date(item.date).toLocaleDateString("en-IN", {
//           day: "2-digit",
//           month: "short",
//         })
//         : ""
//     )
//     .filter(Boolean);

//   const chartViewsData = historicalViewValues.map((item) => Number(item?.value) || 0);
//   const chartDownloadsData = historicalDownloadValues.map((item) => Number(item?.value) || 0);
//   const maxValue = Math.max(...chartViewsData, ...chartDownloadsData);

//   // Calculate dynamic step size
//   const rawStep = maxValue / 5;

//   // Round nicely (1000, 5000, 10000, etc.)
//   const magnitude = Math.pow(
//     10,
//     Math.floor(Math.log10(rawStep))
//   );

//   const stepSize =
//     Math.ceil(rawStep / magnitude) * magnitude;

//   // Round max to nearest step
//   const roundedMax =
//     Math.ceil(maxValue / stepSize) * stepSize;

//   const historicData = {
//     labels,
//     datasets: [
//       {
//         label: "Views (30 days)",
//         data: chartViewsData,
//         borderColor: "#ff6384",
//         backgroundColor: "rgba(255,99,132,0.2)",
//         tension: 0.4,
//         fill: true,
//         pointRadius: 4,
//         pointHoverRadius: 6,
//       },
//       {
//         label: "Downloads (30 days)",
//         data: chartDownloadsData,
//         borderColor: "#36a2eb",
//         backgroundColor: "rgba(54,162,235,0.2)",
//         tension: 0.4,
//         fill: true,
//         pointRadius: 4,
//         pointHoverRadius: 6,
//       }
//     ],
//   };

//   return (
//     <div className="w-full p-4 md:p-6">
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">

//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Image Statistics
//             </h1>

//             <p className="text-sm text-gray-500 mt-1">
//               Last 30 days performance
//             </p>
//           </div>

//           <div className="flex mt-4 md:mt-0">
//             <div className="bg-pink-50 px-4 py-2 rounded-xl">
//               <p className="text-sm text-gray-500">Total Views</p>

//               <h2 className="text-xl font-bold text-pink-600">
//                 {totalViews.toLocaleString()}
//               </h2>
//             </div>
//             <div className="bg-blue-50 px-4 py-2 rounded-xl ml-4">
//               <p className="text-sm text-gray-500">Total Downloads</p>

//               <h2 className="text-xl font-bold text-blue-600">
//                 {totalDownloads.toLocaleString()}
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* Chart */}
//         <div className="flex justify-center">

//           <div className="w-full md:w-[85%] lg:w-[75%] h-[350px]">
//             <Line data={historicData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,

//                 plugins: {
//                   legend: {
//                     position: "top",
//                     labels: {
//                       boxWidth: 18,
//                       usePointStyle: true,
//                     },
//                   },

//                   tooltip: {
//                     mode: "index",
//                     intersect: false,
//                   },
//                 },

//                 interaction: {
//                   mode: "nearest",
//                   axis: "x",
//                   intersect: false,
//                 },

//                 scales: {
//                   x: {
//                     ticks: {
//                       maxRotation: 0,
//                       minRotation: 0,
//                       autoSkip: true,
//                       maxTicksLimit: 6,
//                     },

//                     grid: {
//                       display: false,
//                     },
//                   },

//                   y: {
//                     beginAtZero: true,
//                     // IMPORTANT
//                     max: roundedMax,

//                     ticks: {
//                       stepSize: stepSize,
//                       callback: function (value) {
//                         return value.toLocaleString();
//                       },
//                     },
//                   },
//                 },
//               }
//               } />
//           </div>
//         </div>
//       </div>
//     </div>
//   );


// }

// export default ImageStatsPage;

// orchestartion component:
// Components/Feed/ImageStatsPage.jsx — Orchestrator
// Wires hook + helpers + UI. Registers Chart.js once at module level.

import {
  Chart, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler,
} from "chart.js";

Chart.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
);

import { UseImageStats }                  from "../../hooks/UseImageStats";
import { StatsPageHeader, ChartSection }  from "./ImageStatsUi";
import { statsStyles }                    from "./ImageStatsStyle";
import {
  extractHistoricalValues,
  computeTotal,
  buildChartSeries,
  computeYAxisScale,
  buildChartData,
  buildChartOptions,
} from "./ImageSatsFunction";
import PageLoader from "../PageLoader/PageLoader";

function ImageStatsPage({ id }) {
  // 1. Fetch
  const { data, isLoading, isError } = UseImageStats(id);

  if (isLoading) return <PageLoader />;
  if (isError)   return <p className={statsStyles.errorText}>Failed to load statistics.</p>;

  // 2. Extract raw series
  const viewValues     = extractHistoricalValues(data, "views");
  const downloadValues = extractHistoricalValues(data, "downloads");

  // 3. Compute KPIs
  const totalViews     = computeTotal(data, "views",     viewValues);
  const totalDownloads = computeTotal(data, "downloads", downloadValues);

  // 4. Build chart config
  const { labels, chartViewsData, chartDownloadsData } =
    buildChartSeries(viewValues, downloadValues);

  const yScale       = computeYAxisScale([...chartViewsData, ...chartDownloadsData]);
  const chartData    = buildChartData(labels, chartViewsData, chartDownloadsData);
  const chartOptions = buildChartOptions(yScale);

  // 5. Render
  return (
    <div className={statsStyles.pageWrapper}>
      <div className={statsStyles.card}>
        <StatsPageHeader
          totalViews={totalViews}
          totalDownloads={totalDownloads}
        />
        <ChartSection chartData={chartData} chartOptions={chartOptions} />
      </div>
    </div>
  );
}

export default ImageStatsPage;