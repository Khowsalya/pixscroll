// hooks/useIndividualImage.js
// Owns the single-image detail query.

import { useQuery } from "@tanstack/react-query";
import { fetchAnImage } from "../services/fetchAnImage";

/**
 * @param {string} id - Unsplash photo ID
 */
export function UseIndividualImage(id) {
  return useQuery({
    queryKey: ["photos", id],
    queryFn: () => fetchAnImage(id),
    enabled: Boolean(id),
    retry: 2,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
