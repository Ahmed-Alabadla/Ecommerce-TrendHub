import {
  IProduct,
  ProductsQueryParams,
  ProductsResponse,
} from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiProducts = async (
  params?: ProductsQueryParams
): Promise<ProductsResponse> => {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
  }

  const queryString = searchParams.toString();
  const url = `${API_URL}/products${queryString ? `?${queryString}` : ""}`;
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

export const apiProduct = async (id: string): Promise<IProduct> => {
  const res = await fetch(`${API_URL}/products/${id}`, {
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
