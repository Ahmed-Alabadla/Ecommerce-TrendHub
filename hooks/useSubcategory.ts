import { apiSubcategories } from "@/lib/queries/subcategories";
import { useQuery } from "@tanstack/react-query";

// Query key constants
export const SUBCATEGORIES_QUERY_KEY = ["subcategories"] as const;

// Get all subcategories hook
export const useSubcategories = () => {
  return useQuery({
    queryKey: SUBCATEGORIES_QUERY_KEY,
    queryFn: apiSubcategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1,
  });
};

// In a component
// const { data: subcategories, isLoading: subcategoriesLoading, error: subcategoriesError } = useSubcategories();
