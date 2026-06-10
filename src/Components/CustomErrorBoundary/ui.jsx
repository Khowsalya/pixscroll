// Components/CustomErrorBoundary/ui.jsx
// Presentational fallback — pure props-in → JSX-out.

import { errorBoundaryStyles } from "./style";

export function ErrorFallbackUI({ error, resetErrorBoundary }) {
  return (
    <div className={errorBoundaryStyles.wrapper}>
      <div role="alert" className={errorBoundaryStyles.alertBox}>
        <p>Something went wrong:</p>
        <div>{error?.message}</div>
        <button
          className={errorBoundaryStyles.retryBtn}
          onClick={resetErrorBoundary}
        >
          Try again
        </button>
      </div>
    </div>
  );
}