import { getAccessToken } from "./getToken";
import { refreshAccessToken } from "@/actions/auth";
import { getCookie } from "cookies-next/client";
import { ICart, ICartForm } from "@/types/cart";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiCreateCart = async (
  productId: number,
  values?: ICartForm
): Promise<ICart> => {
  const token = await getAccessToken();

  const url = `${API_URL}/cart/${productId}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
    cache: "no-cache",
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
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
            body: JSON.stringify(values),
            cache: "no-cache",
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

export const apiDeleteCart = async () => {
  const token = await getAccessToken();
  const url = `${API_URL}/cart`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
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
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            cache: "no-cache",
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

export const apiGetMyCart = async (): Promise<ICart> => {
  const token = await getAccessToken();
  const url = `${API_URL}/cart`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
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
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            cache: "no-cache",
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

export const apiApplyCoupon = async (code: string) => {
  const token = await getAccessToken();

  const url = `${API_URL}/cart/apply-coupon/${code}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
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
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
            cache: "no-cache",
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

export const apiRemoveItemFromCart = async (productId: number) => {
  const token = await getAccessToken();

  const url = `${API_URL}/cart/item/${productId}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
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
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
            cache: "no-cache",
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

export const apiRemoveCoupon = async () => {
  const token = await getAccessToken();

  const url = `${API_URL}/cart/remove-coupon`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
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
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
            cache: "no-cache",
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
