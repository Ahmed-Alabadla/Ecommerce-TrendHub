"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  isOnSale: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const { addItem } = useCart();
  // const {
  //   addItem: addToWishlist,
  //   removeItem: removeFromWishlist,
  //   isInWishlist,
  // } = useWishlist();

  // const handleAddToCart = () => {
  //   addItem({
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //     image: product.image,
  //     quantity: 1,
  //   });
  //   toast({
  //     title: "Added to Cart",
  //     description: `${product.name} has been added to your cart.`,
  //   });
  // };

  // const handleToggleWishlist = () => {
  //   if (isInWishlist(product.id)) {
  //     removeFromWishlist(product.id);
  //     toast({
  //       title: "Removed from Wishlist",
  //       description: `${product.name} has been removed from your wishlist.`,
  //     });
  //   } else {
  //     addToWishlist({
  //       id: product.id,
  //       name: product.name,
  //       price: product.price,
  //       image: product.image,
  //     });
  //     toast({
  //       title: "Added to Wishlist",
  //       description: `${product.name} has been added to your wishlist.`,
  //     });
  //   }
  // };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card className="p-0 group cursor-pointer overflow-hidden border shadow-lg dark:shadow-gray-700  hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] ">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-110"
            width={400}
            height={400}
          />

          {product.isOnSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {discount}% OFF
            </div>
          )}
        </div>
      </Link>

      {/* isInWishlist(product.id)
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-white/80 hover:bg-white text-gray-700" */}
      <Button
        variant="secondary"
        size="icon"
        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 flex items-center justify-center bg-red-500
        `}
        onClick={(e) => {
          e.stopPropagation();
          // handleToggleWishlist();
        }}
      >
        <Heart
          // size={20}
          className="size-5 text-white fill-current"
          // className={`w-4 h-4 ${
          //   isInWishlist(product.id) ? "fill-current" : ""
          // }`}
        />
      </Button>

      <div className="absolute bottom-4 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          className="w-full bg-black/80 hover:bg-black dark:bg-primary/80 dark:hover:bg-primary text-white backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            // handleAddToCart();
          }}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>

      <div className="p-6">
        <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">
          {product.brand}
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-primary dark:hover:text-primary transition-colors max-w-xs truncate">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-300 ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold ">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
