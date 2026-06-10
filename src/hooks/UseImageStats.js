// hooks/useImageStats.js
// Owns the image statistics query.

import { useQuery } from "@tanstack/react-query";
import { fetchImageStats } from "../services/fetchImageStats";

/**
 * @param {string} id - Unsplash photo ID
 */
export function UseImageStats(id) {
  return useQuery({
    queryKey: ["ImageStats", id],
    queryFn: () => fetchImageStats(id),
    enabled: Boolean(id),
    retry: 2,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
