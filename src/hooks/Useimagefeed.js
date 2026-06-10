// hooks/useImageFeed.js
// Owns the infinite-scroll query for both browse and search mode.

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImages } from "../services/fetchImages";
import { fetchSearchImages } from "../services/fetchSearchimages";

/**
 * @param {string} searchQuery      - live search string from context
 * @param {object} debouncedFilters - debounced filter object from context
 */
export function useImageFeed(searchQuery, debouncedFilters) {
  const isSearchMode = searchQuery.trim().length > 0;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      // queryKey change → React Query auto-resets + refetches
      queryKey: isSearchMode
        ? ["search", searchQuery, debouncedFilters]
        : ["images"],

      queryFn: ({ pageParam = 1, signal }) =>
        isSearchMode
          ? fetchSearchImages(searchQuery, pageParam, debouncedFilters, signal)
          : fetchImages(pageParam, signal),

      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,

      retry: 2,
      retryDelay: 1000,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const images = data?.pages.flat() ?? [];

  return {
    images,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSearchMode,
  };
}
