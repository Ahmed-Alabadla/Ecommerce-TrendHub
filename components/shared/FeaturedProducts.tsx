"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProduct";
import { toast } from "sonner";
import CardSkeleton from "./CardSkeleton";

export default function FeaturedProducts() {
  const {
    data: productsResponse,
    isPending,
    error,
  } = useProducts({
    page: 1,
    limit: 10,
    sortBy: "ratingsAverage",
    sortOrder: "DESC",
  });

  if (error) {
    toast.error("Failed to load featured products", {
      description: error.message,
    });
  }

  if (isPending) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products at
              unbeatable prices
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>
    );
  }
  const products = productsResponse?.data;

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products at unbeatable
            prices
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
