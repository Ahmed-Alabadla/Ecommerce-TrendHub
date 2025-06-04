import { apiBrands } from "@/lib/queries/brands";
import { useQuery } from "@tanstack/react-query";

// Query key constants
export const BRANDS_QUERY_KEY = ["brands"] as const;

// Get all brands hook
export const useBrands = () => {
  return useQuery({
    queryKey: BRANDS_QUERY_KEY,
    queryFn: apiBrands,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1,
  });
};

// In a component
// const { data: brands, isLoading: brandsLoading, error: brandsError } = useBrands();
