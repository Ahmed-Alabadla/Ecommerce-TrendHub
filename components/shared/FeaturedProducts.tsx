import React from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "/product.png",
    rating: 4.8,
    reviews: 124,
    brand: "TechSound",
    isOnSale: true,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/logo.png",
    rating: 4.6,
    reviews: 89,
    brand: "FitTech",
    isOnSale: false,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Designer Backpack",
    price: 89.99,
    originalPrice: 129.99,
    image: "/product.png",
    rating: 4.7,
    reviews: 156,
    brand: "UrbanStyle",
    isOnSale: true,
    category: "Fashion",
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: 49.99,
    image: "/logo.png",
    rating: 4.5,
    reviews: 67,
    brand: "ChargeTech",
    isOnSale: false,
    category: "Electronics",
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    price: 79.99,
    image: "/product.png",
    rating: 4.9,
    reviews: 203,
    brand: "LightCraft",
    isOnSale: false,
    category: "Home & Garden",
  },
  {
    id: 6,
    name: "Professional Laptop",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "/product.png",
    rating: 4.8,
    reviews: 301,
    brand: "TechPro",
    isOnSale: true,
    category: "Electronics",
  },
];

export default function FeaturedProducts() {
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
          {featuredProducts.map((product) => (
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
