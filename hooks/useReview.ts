import {
  apiCreateReview,
  apiDeleteReview,
  apiReviews,
  apiUpdateReview,
} from "@/lib/queries/reviews";
import { queryClient } from "@/lib/react-query/client";
import {
  IReviewForm,
  ReviewsQueryParams,
  ReviewsResponse,
} from "@/types/review";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Query key constants
export const REVIEWS_QUERY_KEY = ["reviews"] as const;

// Infinite scroll products hook
export const useInfiniteReviews = (
  params?: Omit<ReviewsQueryParams, "page">
) => {
  return useInfiniteQuery({
    queryKey: [...REVIEWS_QUERY_KEY, "infinite", params],
    queryFn: ({ pageParam = 1 }) => apiReviews({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ReviewsResponse) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};

// Create review
export const useCreateReview = () => {
  return useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: number;
      data: IReviewForm;
    }) => apiCreateReview(productId, data),
    onSuccess: (data, variables) => {
      toast.success("Review created successfully!", {
        description:
          "Thank you for your feedback. Your review has been submitted for approval.",
      });

      // Invalidate and refetch reviews queries to show the new review
      queryClient.invalidateQueries({
        queryKey: [...REVIEWS_QUERY_KEY],
      });

      // Optionally invalidate specific product reviews
      if (variables.productId) {
        queryClient.invalidateQueries({
          queryKey: [
            ...REVIEWS_QUERY_KEY,
            "infinite",
            { productId: variables.productId },
          ],
        });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create review");
    },
  });
};

// Update review
export const useUpdateReview = () => {
  return useMutation({
    mutationFn: ({
      reviewId,
      data,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      productId,
    }: {
      reviewId: number;
      data: Partial<IReviewForm>;
      productId?: number;
    }) => apiUpdateReview(reviewId, data),

    onSuccess: (data, variables) => {
      toast.success("Review updated successfully!", {
        description: "Your review has been successfully updated.",
      });

      // Invalidate and refetch reviews queries to show the updated review
      queryClient.invalidateQueries({
        queryKey: [...REVIEWS_QUERY_KEY],
      });

      // Optionally invalidate specific product reviews
      if (variables.productId) {
        queryClient.invalidateQueries({
          queryKey: [
            ...REVIEWS_QUERY_KEY,
            "infinite",
            { productId: variables.productId },
          ],
        });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update review");
    },
  });
};

// Delete review
export const useDeleteReview = () => {
  return useMutation({
    mutationFn: (reviewId: number) => apiDeleteReview(reviewId),
    onSuccess: () => {
      toast.success("Review deleted successfully!", {
        description: "Your review has been successfully deleted.",
      });

      // Invalidate and refetch all reviews queries
      queryClient.invalidateQueries({
        queryKey: [...REVIEWS_QUERY_KEY],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete review");
    },
  });
};
