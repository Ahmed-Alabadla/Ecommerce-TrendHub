import { IBrand } from "@/types/brand";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiBrands = async (): Promise<IBrand[]> => {
  const res = await fetch(`${API_URL}/brands`, {
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
