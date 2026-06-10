import { axiosInstance } from "../helpers/axiosInstance";

export async function fetchImages(page, signal) {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

  try {
    const response = await axiosInstance.get("photos", {
      params: {
        client_id: ACCESS_KEY,
        page,
      },
      signal,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (error.name === "CanceledError" || error.name === "AbortError")
      return [];
    console.error(error);
    throw error;
  }
}
