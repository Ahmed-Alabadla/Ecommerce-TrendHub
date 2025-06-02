"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product";
import WishlistButton from "./WishlistButton";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const { addItem } = useCart();

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

  const discount =
    product.priceAfterDiscount && product.priceAfterDiscount > 0
      ? Math.round(
          ((product.price - product.priceAfterDiscount) / product.price) * 100
        )
      : 0;

  return (
    <Card className="p-0 group cursor-pointer overflow-hidden border shadow-lg dark:shadow-gray-700  hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] ">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={product.imageCover}
            alt={product.name}
            className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-110"
            width={256}
            height={256}
          />

          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {discount}% OFF
            </div>
          )}
        </div>
      </Link>

      <WishlistButton type="ProductCard" product={product} />

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

      <div className="p-6 pt-0">
        {product.brand && (
          <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">
            {product.brand.name}
          </div>
        )}
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
                  i < Math.floor(Number(product.ratingsAverage))
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            {Number(product.ratingsAverage) > 0 ? product.ratingsAverage : 0.0}{" "}
            ({product.ratingsQuantity > 0 ? product.ratingsQuantity : 0})
          </span>
        </div>

        <div className="flex items-center justify-between">
          {product.priceAfterDiscount && product.priceAfterDiscount > 0 ? (
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold ">
                ${product.priceAfterDiscount}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ${product.price}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold ">${product.price}</span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
