import Product from "@/components/pages/Product";
import React from "react";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    throw new Error("Product ID is required");
  }
  return <Product id={id} />;
}
