"use server";

import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "@/schema";
import { cookies } from "next/headers";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (!res.ok) {
    if (typeof response.message === "string") {
      return { error: response.message };
    }

    const err = response.message[0];
    return { error: err };
  }
  // if (res.ok && response?.message) {
  //   return { success: response.message };
  // }
  const { access_token, refresh_token } = response;

  // Set secure cookie
  const cookieStore = await cookies();
  cookieStore.set("access_token", access_token, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12, // 12 hours
    path: "/",
    sameSite: "lax",
  });
  cookieStore.set("refresh_token", refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
  });

  return { success: "Login successful!" };
};

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const data = {
    name: values.name,
    email: values.email,
    password: values.password,
  };
  const res = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (!res.ok) {
    if (typeof response.message === "string") {
      return { error: response.message };
    }

    const err = response.message[0];
    return { error: err };
  }

  if (res.ok && response?.message) {
    return { success: response.message };
  }
};

export const forgotPassword = async (
  values: z.infer<typeof ForgotPasswordSchema>
) => {
  const res = await fetch(`${process.env.API_URL}/auth/forgot-password`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (!res.ok) {
    if (typeof response.message === "string") {
      return { error: response.message };
    }

    const err = response.message[0];
    return { error: err };
  }

  if (res.ok && response?.message) {
    return { success: response.message };
  }
};

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  resetToken: string,
  userId: string
) => {
  const data = {
    userId: parseInt(userId),
    token: resetToken,
    newPassword: values.newPassword,
  };
  const res = await fetch(`${process.env.API_URL}/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (!res.ok) {
    if (typeof response.message === "object") {
      return { error: response.message[0] };
    }

    const err = response.message;
    return { error: err };
  }

  if (res.ok && response?.message) {
    return { success: response.message };
  }
};

export const logout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  return { success: "Logout successful!" };
};

export const refreshAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  const res = await fetch(
    `${process.env.API_URL}/auth/refresh-token/${refreshToken}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const response = await res.json();

  if (!res.ok) {
    if (typeof response.message === "string") {
      return { error: response.message };
    }

    const err = response.message[0];
    return { error: err };
  }

  const { access_token, refresh_token } = response;

  // Set secure cookie
  cookieStore.set("access_token", access_token, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12, // 12 hours
    path: "/",
    sameSite: "lax",
  });
  cookieStore.set("refresh_token", refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
  });

  return { success: "Access Token refreshed successfully" };
};
