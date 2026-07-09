import { expect, test, beforeEach, describe } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useImageFeed } from "../hooks/useImageFeed";
import { axiosInstance } from "../helpers/axiosInstance";
import { fetchSearchImages } from "../services/fetchSearchimages";

// ─── Step 1: Mock axiosInstance ───────────────────────────────
jest.mock("../helpers/axiosInstance", () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

jest.mock("../services/fetchSearchimages", () => ({
  fetchSearchImages: jest.fn(),
}));

// ─── Step 2: Fresh QueryClient wrapper per test ───────────────
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// ─── Step 3: Reset mocks between tests ────────────────────────
beforeEach(() => {
  jest.clearAllMocks();
});

// ─── Fake data matching your Unsplash shape ───────────────────
const fakePhoto = {
  id: "1",
  urls: { small: "photo1.jpg" },
  alt_description: "mountains",
  user: { username: "john", bio: "photographer" },
};

// ─── Test 1:browse mode ─────────────────────────
test("returns images in browse mode", async () => {
  // ARRANGE
  axiosInstance.get.mockResolvedValue({ data: [fakePhoto] });

  // ACT
  const { result } = renderHook(() => useImageFeed("", {}), {
    wrapper: createWrapper(),
  });

  // ASSERT
  await waitFor(() => {
    expect(result.current.images).toHaveLength(1);
  });

  expect(result.current.isSearchMode).toBe(false);
  expect(result.current.images[0].id).toBe("1");
});

// ─── Test 2: Loading state ─────────────────────────────────────
test("isLoading is true while fetching", () => {
  // ARRANGE — never resolves = stuck in loading forever
  axiosInstance.get.mockReturnValue(new Promise(() => {}));

  // ACT
  const { result } = renderHook(() => useImageFeed("", {}), {
    wrapper: createWrapper(),
  });

  // ASSERT — check immediately, no await needed
  expect(result.current.isLoading).toBe(true);
  expect(result.current.images).toHaveLength(0);
});

// ─── Test 3: Search mode ───────────────────────────────────────
test("switches to search mode when query is provided", async () => {
  // ARRANGE
  //   axiosInstance.get.mockResolvedValue({ data: [fakePhoto] });
  fetchSearchImages.mockResolvedValue([fakePhoto]);
  // ACT
  const { result } = renderHook(() => useImageFeed("mountains", {}), {
    wrapper: createWrapper(),
  });

  // ASSERT — isSearchMode flips instantly (sync)
  expect(result.current.isSearchMode).toBe(true);

  // then wait for async data
  await waitFor(() => {
    expect(result.current.images).toHaveLength(1);
  });
});

// ─── Test 4: API failure ───────────────────────────────────────
test("images stays empty when API fails", async () => {
  // ARRANGE
  axiosInstance.get.mockRejectedValue(new Error("Network Error"));

  // ACT
  const { result } = renderHook(() => useImageFeed("", {}), {
    wrapper: createWrapper(),
  });

  // ASSERT — wait for loading to finish then check images empty
  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });

  expect(result.current.images).toHaveLength(0);
});
