import {
  IReview,
  IReviewForm,
  ReviewsQueryParams,
  ReviewsResponse,
} from "@/types/review";
import { getAccessToken } from "./getToken";
import { refreshAccessToken } from "@/actions/auth";
import { getCookie } from "cookies-next/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiReviews = async (
  params?: ReviewsQueryParams
): Promise<ReviewsResponse> => {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
  }

  const queryString = searchParams.toString();
  const url = `${API_URL}/reviews${queryString ? `?${queryString}` : ""}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    const err = await res.json();

    const message =
      typeof err.message === "object" ? err.message[0] : err.message;
    throw new Error(message);
  }

  const response = await res.json();
  return response;
};

export const apiCreateReview = async (
  productId: number,
  values: IReviewForm
): Promise<IReview> => {
  const token = await getAccessToken();

  const url = `${API_URL}/reviews/${productId}`;

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

export const apiUpdateReview = async (
  reviewId: number,
  values: Partial<IReviewForm>
): Promise<IReview> => {
  const token = await getAccessToken();

  const url = `${API_URL}/reviews/${reviewId}`;

  const res = await fetch(url, {
    method: "PATCH",
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
            method: "PATCH",
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

export const apiDeleteReview = async (reviewId: number) => {
  const token = await getAccessToken();
  const url = `${API_URL}/reviews/${reviewId}`;

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
