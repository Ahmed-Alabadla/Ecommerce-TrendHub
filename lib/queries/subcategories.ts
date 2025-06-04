import { ISubcategory } from "@/types/subcategory";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiSubcategories = async (): Promise<ISubcategory[]> => {
  const res = await fetch(`${API_URL}/sub-categories`, {
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
