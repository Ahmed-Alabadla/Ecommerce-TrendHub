import { useQuery } from "@tanstack/react-query";
import { apiCategories, apiCategory } from "@/lib/queries/categories";

// Query key constants
export const CATEGORIES_QUERY_KEY = ["categories"] as const;
export const CATEGORY_QUERY_KEY = ["category"] as const;

// Get all categories hook
export const useCategories = () => {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: apiCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1,
  });
};

// Get single category hook
export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: [...CATEGORY_QUERY_KEY, slug],
    queryFn: () => apiCategory(slug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1,
    enabled: !!slug, // Only run query if slug is provided
  });
};

// In a component
// const { data: categories, isLoading, error } = useCategories();
// const { data: category, isLoading: categoryLoading, error: categoryError } = useCategory("electronics");
