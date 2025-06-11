import { refreshAccessToken } from "@/actions/auth";
import { getCookie } from "cookies-next/client";
import { getAccessToken } from "./getToken";
import { CheckoutOrderDto, IOrder } from "@/types/order";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiCheckoutOrder = async (
  type: "cash" | "card",
  data: CheckoutOrderDto
) => {
  const token = await getAccessToken();
  const url = `${API_URL}/order/checkout/${type}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();

    if (res.status === 401) {
      // Token might be expired, try to refresh and retry
      const refreshResult = await refreshAccessToken();
      if (refreshResult.success) {
        const newToken = getCookie("access_token");
        if (newToken) {
          // Retry the request with new token
          const retryRes = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${newToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (retryRes.ok) {
            return await retryRes.json();
          }
        }
      }
    }

    const message =
      typeof err.message === "object" ? err.message[0] : err.message;
    throw new Error(message);
  }

  const response = await res.json();

  return response;
};

export const apiGetAllOrders = async (): Promise<IOrder[]> => {
  const token = await getAccessToken();
  const url = `${API_URL}/order/checkout/user`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json();

    if (res.status === 401) {
      // Token might be expired, try to refresh and retry
      const refreshResult = await refreshAccessToken();
      if (refreshResult.success) {
        const newToken = getCookie("access_token");
        if (newToken) {
          // Retry the request with new token
          const retryRes = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${newToken}`,
              "Content-Type": "application/json",
            },
          });

          if (retryRes.ok) {
            return await retryRes.json();
          }
        }
      }
    }

    const message =
      typeof err.message === "object" ? err.message[0] : err.message;
    throw new Error(message);
  }

  const response = await res.json();

  return response;
};

export const apiGetOrderById = async (orderId: string): Promise<IOrder> => {
  const token = await getAccessToken();
  const url = `${API_URL}/order/checkout/${orderId}/user`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json();

    if (res.status === 401) {
      // Token might be expired, try to refresh and retry
      const refreshResult = await refreshAccessToken();
      if (refreshResult.success) {
        const newToken = getCookie("access_token");
        if (newToken) {
          // Retry the request with new token
          const retryRes = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${newToken}`,
              "Content-Type": "application/json",
            },
          });

          if (retryRes.ok) {
            return await retryRes.json();
          }
        }
      }
    }

    const message =
      typeof err.message === "object" ? err.message[0] : err.message;
    throw new Error(message);
  }

  const response = await res.json();

  return response;
};
