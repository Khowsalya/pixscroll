// Components/Feed/imageStatsUi.jsx
// Presentational components for ImageStatsPage.jsx only.
// Pure props-in → JSX-out. No logic, no data fetching.

import { Line }        from "react-chartjs-2";
import { statsStyles } from "./ImageStatsStyle";

// ── StatCard ──────────────────────────────────────────────────
/** Single KPI chip — label + formatted number. */
export function StatCard({ label, value, cardClass, valueClass }) {
  return (
    <div className={cardClass}>
      <p className={statsStyles.statLabel}>{label}</p>
      <h2 className={valueClass}>{value.toLocaleString()}</h2>
    </div>
  );
}

// ── StatsPageHeader ───────────────────────────────────────────
/** Card header: title + subtitle left, KPI chips right. */
export function StatsPageHeader({ totalViews, totalDownloads }) {
  return (
    <div className={statsStyles.headerRow}>
      <div>
        <h1 className={statsStyles.title}>Image Statistics</h1>
        <p className={statsStyles.subtitle}>Last 30 days performance</p>
      </div>

      <div className={statsStyles.statCardsRow}>
        <StatCard
          label="Total Views"
          value={totalViews}
          cardClass={statsStyles.statCardViews}
          valueClass={statsStyles.statValueViews}
        />
        <StatCard
          label="Total Downloads"
          value={totalDownloads}
          cardClass={statsStyles.statCardDownloads}
          valueClass={statsStyles.statValueDownloads}
        />
      </div>
    </div>
  );
}

// ── ChartSection ──────────────────────────────────────────────
/** Centred fixed-height Line chart wrapper. */
export function ChartSection({ chartData, chartOptions }) {
  return (
    <div className={statsStyles.chartOuter}>
      <div className={statsStyles.chartInner}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}