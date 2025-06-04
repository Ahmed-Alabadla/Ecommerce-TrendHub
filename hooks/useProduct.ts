import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiProducts, apiProduct } from "@/lib/queries/products";
import { ProductsQueryParams, ProductsResponse } from "@/types/product";

// Query key constants
export const PRODUCTS_QUERY_KEY = ["products"] as const;
export const PRODUCT_QUERY_KEY = ["product"] as const;

// Get all products hook
export const useProducts = (params?: ProductsQueryParams) => {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, params],
    queryFn: () => apiProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1,
  });
};

// Infinite scroll products hook
export const useInfiniteProducts = (
  params?: Omit<ProductsQueryParams, "page">
) => {
  return useInfiniteQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, "infinite", params],
    queryFn: ({ pageParam = 1 }) => apiProducts({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ProductsResponse) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};

// Get single product hook
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [...PRODUCT_QUERY_KEY, id],
    queryFn: () => apiProduct(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1,
    enabled: !!id, // Only run query if id is provided
  });
};

// In a component
// const { data: productsResponse, isLoading, error } = useProducts({ page: 1, limit: 10, category: "electronics", sortBy: "price" });
// const products = productsResponse?.data;
// const pagination = productsResponse?.meta;

// const {
//   data,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
//   isLoading,
//   error
// } = useInfiniteProducts({ category: "electronics", limit: 10 });
// const allProducts = data?.pages.flatMap(page => page.data) ?? [];

// const { data: product, isLoading: productLoading, error: productError } = useProduct("123");
