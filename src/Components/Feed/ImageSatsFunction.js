// Components/Feed/imageStatsFunction.js
// Pure helpers for ImageStatsPage.jsx only.
// No React, no side-effects — fully unit-testable.

/**
 * Safely extracts the historical values array from the stats API response.
 * @param {object} data
 * @param {"views"|"downloads"} field
 * @returns {Array<{ date: string, value: number }>}
 */
export function extractHistoricalValues(data, field) {
  const values = data?.[field]?.historical?.values;
  return Array.isArray(values) ? values : [];
}

/**
 * Returns the pre-computed change total when available;
 * otherwise sums all daily values.
 * @param {object} data
 * @param {"views"|"downloads"} field
 * @param {Array} historicalValues
 * @returns {number}
 */
export function computeTotal(data, field, historicalValues) {
  const change = data?.[field]?.historical?.change;
  if (typeof change === "number") return change;
  return historicalValues.reduce(
    (sum, item) => sum + (Number(item?.value) || 0),
    0,
  );
}

/**
 * Converts a raw date string to a short "dd Mon" label (en-IN locale).
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDateLabel(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

/**
 * Builds the labels and numeric series arrays needed by Chart.js.
 * @param {Array} viewValues
 * @param {Array} downloadValues
 * @returns {{ labels: string[], chartViewsData: number[], chartDownloadsData: number[] }}
 */
export function buildChartSeries(viewValues, downloadValues) {
  const labels = viewValues
    .map((item) => formatDateLabel(item?.date))
    .filter(Boolean);
  const chartViewsData = viewValues.map((item) => Number(item?.value) || 0);
  const chartDownloadsData = downloadValues.map(
    (item) => Number(item?.value) || 0,
  );
  return { labels, chartViewsData, chartDownloadsData };
}

/**
 * Calculates a clean Y-axis max and stepSize.
 * Rounds step to nearest order-of-magnitude multiple (1 000, 5 000, 10 000 …).
 * Handles maxValue === 0 safely — original would call log10(0) = -Infinity.
 * @param {number[]} allValues
 * @returns {{ stepSize: number, roundedMax: number }}
 */
export function computeYAxisScale(allValues) {
  const maxValue = Math.max(...allValues, 0);
  if (maxValue === 0) return { stepSize: 1, roundedMax: 5 };
  const rawStep = maxValue / 5;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const stepSize = Math.ceil(rawStep / magnitude) * magnitude;
  const roundedMax = Math.ceil(maxValue / stepSize) * stepSize;
  return { stepSize, roundedMax };
}

/**
 * Assembles the full Chart.js `data` object.
 * @param {string[]} labels
 * @param {number[]} chartViewsData
 * @param {number[]} chartDownloadsData
 * @returns {object}
 */
export function buildChartData(labels, chartViewsData, chartDownloadsData) {
  return {
    labels,
    datasets: [
      {
        label: "Views (30 days)",
        data: chartViewsData,
        borderColor: "#ff6384",
        backgroundColor: "rgba(255,99,132,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Downloads (30 days)",
        data: chartDownloadsData,
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
}

/**
 * Assembles the full Chart.js `options` object.
 * @param {{ stepSize: number, roundedMax: number }} yScale
 * @returns {object}
 */
export function buildChartOptions({ stepSize, roundedMax }) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { boxWidth: 18, usePointStyle: true },
      },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: roundedMax,
        ticks: {
          stepSize,
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };
}
