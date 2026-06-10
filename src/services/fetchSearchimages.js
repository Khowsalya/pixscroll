import { axiosInstance } from "../helpers/axiosInstance";

export async function fetchSearchImages(query, page = 1, filters = {}, signal) {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

  // Build params — always include these
  const params = {
    client_id: ACCESS_KEY,
    query,
    page,
    per_page: 12,
    order_by: filters.order_by || "relevant",
    content_filter: filters.content_filter || "low",
  };

  // Only add optional filters if user selected one
  if (filters.color) params.color = filters.color;
  if (filters.orientation) params.orientation = filters.orientation;

  try {
    const response = await axiosInstance.get("search/photos", {
      params,
      signal,
    });
    // /search/photos returns { results, total, total_pages }
    // We return results array so Feed works the same way as browse mode
    return response.data.results;
  } catch (error) {
    // Ignore cancellation errors — they are expected and not real errors
    if (error.name === "CanceledError" || error.name === "AbortError")
      return [];
    console.error("fetchSearchImages error:", error);
    throw error;
  }
}
