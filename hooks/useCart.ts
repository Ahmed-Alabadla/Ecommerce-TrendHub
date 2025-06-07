import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiCreateCart,
  apiDeleteCart,
  apiGetMyCart,
  apiApplyCoupon,
  apiRemoveCoupon,
  apiRemoveItemFromCart,
} from "@/lib/queries/cart";
import { ICartForm } from "@/types/cart";
import { queryClient } from "@/lib/react-query/client";
import { toast } from "sonner";
import { getCookie } from "cookies-next/client";

// Query key constants
export const CART_QUERY_KEY = ["cart"] as const;

// Get cart hook
export const useCart = () => {
  const token = getCookie("access_token");
  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: apiGetMyCart,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!token,
  });
};

// Add to cart hook
export const useAddToCart = () => {
  return useMutation({
    mutationFn: ({
      productId,
      values,
    }: {
      productId: number;
      values?: ICartForm;
    }) => apiCreateCart(productId, values),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      toast.success("Product added to cart!", {
        description: "The item has been added to your cart successfully.",
      });
    },
    onError: (error) => {
      toast.error("Failed to add to cart", {
        description:
          error.message ||
          "There was an error adding the item to your cart. Please try again.",
      });
      console.error("Failed to add to cart:", error);
    },
  });
};

// Delete cart hook
export const useDeleteCart = () => {
  return useMutation({
    mutationFn: () => apiDeleteCart(),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      toast.success("Cart cleared successfully!", {
        description: "All items have been removed from your cart.",
      });
    },
    onError: (error) => {
      toast.error("Failed to clear cart", {
        description:
          error.message ||
          "There was an error clearing your cart. Please try again.",
      });
      console.error("Failed to clear cart:", error);
    },
  });
};

// Apply coupon hook
export const useApplyCoupon = () => {
  return useMutation({
    mutationFn: (code: string) => apiApplyCoupon(code),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      toast.success("Coupon applied successfully!", {
        description: "Your discount has been applied to the cart.",
      });
    },
    onError: (error) => {
      toast.error("Failed to apply coupon", {
        description:
          error.message ||
          "The coupon code is invalid or expired. Please try again.",
      });
      console.error("Failed to apply coupon:", error);
    },
  });
};

// ...existing code...

// Remove item from cart hook
export const useRemoveItemFromCart = () => {
  return useMutation({
    mutationFn: (productId: number) => apiRemoveItemFromCart(productId),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      toast.success("Item removed from cart!", {
        description: "The item has been removed from your cart successfully.",
      });
    },
    onError: (error) => {
      toast.error("Failed to remove item", {
        description:
          error.message ||
          "There was an error removing the item from your cart. Please try again.",
      });
      console.error("Failed to remove item from cart:", error);
    },
  });
};

// ...existing code...

// Remove coupon hook
export const useRemoveCoupon = () => {
  return useMutation({
    mutationFn: () => apiRemoveCoupon(),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      toast.success("Coupon removed successfully!", {
        description: "The discount has been removed from your cart.",
      });
    },
    onError: (error) => {
      toast.error("Failed to remove coupon", {
        description:
          error.message ||
          "There was an error removing the coupon. Please try again.",
      });
      console.error("Failed to remove coupon:", error);
    },
  });
};

// Usage examples:
// In a component
// const { data: cart, isLoading, error } = useCart();
// const addToCart = useAddToCart();
// const deleteCart = useDeleteCart();
// const applyCoupon = useApplyCoupon();
// const removeItem = useRemoveItemFromCart();
// const removeCoupon = useRemoveCoupon();
