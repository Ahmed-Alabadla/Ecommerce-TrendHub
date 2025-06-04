import { ICategory } from "@/types/category";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiCategories = async (): Promise<ICategory[]> => {
  const res = await fetch(`${API_URL}/categories`, {
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

export const apiCategory = async (slug: string): Promise<ICategory> => {
  const res = await fetch(`${API_URL}/categories/${slug}`, {
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
