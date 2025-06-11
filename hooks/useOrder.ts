import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiCheckoutOrder,
  apiGetAllOrders,
  apiGetOrderById,
} from "@/lib/queries/orders";
import { CheckoutOrderDto } from "@/types/order";
import { queryClient } from "@/lib/react-query/client";
import { toast } from "sonner";
import { getCookie } from "cookies-next/client";
import { CART_QUERY_KEY } from "./useCart";

// Query key constants
export const ORDER_QUERY_KEY = ["orders"] as const;
export const ORDER_BY_ID_QUERY_KEY = (id: string) => ["orders", id] as const;

// Get all orders hook
export const useOrders = () => {
  const token = getCookie("access_token");
  return useQuery({
    queryKey: ORDER_QUERY_KEY,
    queryFn: apiGetAllOrders,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    enabled: !!token,
  });
};

// Get order by ID hook
export const useOrder = (orderId: string) => {
  const token = getCookie("access_token");
  return useQuery({
    queryKey: ORDER_BY_ID_QUERY_KEY(orderId),
    queryFn: () => apiGetOrderById(orderId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    enabled: !!token && !!orderId,
  });
};

// Checkout order with cash payment hook
export const useCheckoutOrderCash = () => {
  return useMutation({
    mutationFn: (data: CheckoutOrderDto) => apiCheckoutOrder("cash", data),
    onSuccess: (response) => {
      // Invalidate orders and cart queries
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });

      toast.success("Order placed successfully!", {
        description: `Your order #${response.orderNumber} has been placed and will be delivered soon.`,
      });
    },
    onError: (error) => {
      toast.error("Failed to place order", {
        description:
          error.message ||
          "There was an error processing your order. Please try again.",
      });
      console.error("Failed to checkout order with cash:", error);
    },
  });
};

// Checkout order with card payment hook
export const useCheckoutOrderCard = () => {
  return useMutation({
    mutationFn: (data: CheckoutOrderDto) => apiCheckoutOrder("card", data),
    onSuccess: (response) => {
      // Invalidate orders and cart queries
      // queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY });
      queryClient.resetQueries({ queryKey: ORDER_QUERY_KEY });
      queryClient.resetQueries({ queryKey: CART_QUERY_KEY });

      // For card payments, the response might contain a checkout URL
      if (response.session_url) {
        toast.success("Redirecting to payment...", {
          description: "You will be redirected to complete your payment.",
          duration: 5000,
        });
        // Redirect to Stripe checkout or payment page
        // window.location.href = response.session_url;
      } else {
        toast.success("Order placed successfully!", {
          description: `Your order #${response.orderNumber} has been placed.`,
        });
      }
    },
    onError: (error) => {
      toast.error("Failed to process payment", {
        description:
          error.message ||
          "There was an error processing your payment. Please try again.",
      });
      console.error("Failed to checkout order with card:", error);
    },
  });
};

// Usage examples:
// In a component
// const { data: orders, isLoading, error } = useOrders();
// const { data: order, isLoading: orderLoading } = useOrder(orderId);
// const checkoutCash = useCheckoutOrderCash();
// const checkoutCard = useCheckoutOrderCard();
//
// // To place an order
// checkoutCash.mutate({
//   shippingAddress: {
//     street: "123 Main St",
//     city: "New York",
//     country: "USA",
//     postalCode: 10001
//   }
// });
