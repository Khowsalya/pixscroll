import { axiosInstance } from "../helpers/axiosInstance";

export async function fetchAnImage(id) {
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

  try {
    const response = await axiosInstance.get(`photos/${id}`, {
      params: {
        client_id: ACCESS_KEY,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
