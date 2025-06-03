import { refreshAccessToken } from "@/actions/auth";
import { ChangePasswordDto, UpdateProfileDto } from "@/types/user";
import { getCookie } from "cookies-next/client";
import { getAccessToken } from "./getToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiProfile = async () => {
  const token = await getAccessToken();

  const res = await fetch(`${API_URL}/users/profile`, {
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
          const retryRes = await fetch(`${API_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
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

export const apiUpdateProfile = async (data: UpdateProfileDto) => {
  const token = await getAccessToken();

  const formData = new FormData();
  const { name, phone, avatar, address, birth_date, gender } = data;

  if (name) formData.append("name", name);
  if (phone) formData.append("phone", phone);
  if (avatar) formData.append("avatar", avatar);
  if (address) formData.append("address", address);
  if (gender) formData.append("gender", gender);

  if (birth_date) {
    const date = new Date(birth_date);
    // date.setDate(date.getDate() + 1); // Add one day
    const formattedExpireDate = date.toLocaleString();
    formData.append("birth_date", formattedExpireDate);
  }

  const res = await fetch(`${API_URL}/users/profile`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      // "Content-Type": "application/json",
    },
    body: formData,
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
          const retryRes = await fetch(`${API_URL}/users/profile`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${newToken}`,
              Accept: "application/json",
              // "Content-Type": "application/json",
            },
            body: formData,
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

export const apiChangePassword = async (data: ChangePasswordDto) => {
  const token = await getAccessToken();

  const res = await fetch(`${API_URL}/auth/change-password`, {
    method: "PATCH",
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
          const retryRes = await fetch(`${API_URL}/auth/change-password`, {
            method: "PATCH",
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

export const apiDeleteProfile = async () => {
  const token = await getAccessToken();

  const res = await fetch(`${API_URL}/users/profile`, {
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
          const retryRes = await fetch(`${API_URL}/users/profile`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${newToken}`,
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
