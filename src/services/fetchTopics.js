import { axiosInstance } from "../helpers/axiosInstance";

const CACHE_KEY = "unsplash_topics";

export async function fetchTopics() {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

  // Return cached topics if already fetched this session
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) return JSON.parse(cached);
  } catch {}

  try {
    // Fetch 2 pages to get up to 60 topics
    const [page1, page2] = await Promise.all([
      axiosInstance.get("topics", {
        params: {
          client_id: ACCESS_KEY,
          per_page: 30,
          order_by: "featured",
          page: 1,
        },
      }),
      axiosInstance.get("topics", {
        params: {
          client_id: ACCESS_KEY,
          per_page: 30,
          order_by: "featured",
          page: 2,
        },
      }),
    ]);

    // Combine both pages, map to { title, thumb }
    const topics = [...page1.data, ...page2.data].map((t) => ({
      title: t.title.toLowerCase(),
      thumb: t.cover_photo?.urls?.thumb ?? null,
    }));

    // Cache in sessionStorage — only fetched once per browser session
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(topics));

    return topics;
  } catch (error) {
    console.error("fetchTopics failed, falling back to static list:", error);
    return []; // NavBar handles fallback to KEYWORDS
  }
}
