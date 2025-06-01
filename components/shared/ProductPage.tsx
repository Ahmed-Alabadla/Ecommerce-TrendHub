"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Minus,
  PackageCheck,
  Plus,
  RefreshCw,
  Share,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { Badge } from "../ui/badge";

export default function ProductPage({ id }: { id: string }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!id) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">
          Sorry, we couldn&apos;t find the product you&apos;re looking for.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
  const product = {
    id: parseInt(id || "1"),
    name: "Wireless Bluetooth Headphones",
    priceAfterDiscount: 99.99,
    price: 149.99,
    brand: "TechAudio",
    rating: 4.5,
    reviews: 324,
    description:
      "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.",
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
      "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?w=500",
    ],
    category: "Electronics",
    subcategory: "Headphones",
  };
  const discount = Math.round(
    ((product.price - product.priceAfterDiscount) / product.price) * 100
  );

  return (
    <div>
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden border dark:border-gray-400">
            <Image
              src={product.images[activeImageIndex] || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              priority
              className="w-full h-full object-contain"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-4 pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    activeImageIndex === index
                      ? "border-primary "
                      : "border-gray-200 dark:border-gray-400"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>

            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Brand:{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}
              </span>
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            {product.priceAfterDiscount && product.priceAfterDiscount > 0 ? (
              <>
                <span className="text-3xl font-bold">
                  ${product.priceAfterDiscount}
                </span>
                <span className="text-xl text-gray-600 dark:text-gray-400 line-through">
                  ${product.price}
                </span>
                <Badge className="bg-red-500">{discount}% OFF</Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">${product.price}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.stock == 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button
              // onClick={handleAddToCart}
              // disabled={!product.inStock}
              className="flex-1"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              // onClick={handleToggleWishlist}
              // className={isInWishlist(product.id) ? 'text-red-500 border-red-500' : ''}
              className="hover:text-red-500 hover:border-red-500"
            >
              <Heart
                // className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`}
                className="size-5"
              />
            </Button>
            <Button
              variant="outline"
              className="hover:text-primary hover:border-primary"
            >
              <Share className="size-5 " />
            </Button>
          </div>

          {/* Shipping & Returns */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 dark:bg-gray-700  p-2 rounded-full">
                <Truck className="size-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 dark:bg-gray-700  p-2 rounded-full">
                <RefreshCw className="size-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-medium">Easy Returns</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  30 day return policy
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 dark:bg-gray-700  p-2 rounded-full">
                <PackageCheck className="size-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-medium">Secure Checkout</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  SSL / Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
