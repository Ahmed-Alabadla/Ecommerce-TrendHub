"use client";
import { IProduct } from "@/types/product";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
interface WishlistButtonProps {
  type: "ProductPage" | "ProductCard";
  product: IProduct;
}

export default function WishlistButton({ type, product }: WishlistButtonProps) {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from Wishlist", {
        duration: 3000,
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast.success("Added to Wishlist", {
        duration: 3000,
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  if (!isMounted) {
    return (
      <Button
        variant={type === "ProductPage" ? "outline" : "secondary"}
        size={type === "ProductPage" ? "default" : "icon"}
        className={cn(
          "p-2 rounded-full bg-white/80 text-gray-700",
          type === "ProductCard"
            ? "absolute top-3 right-3 rounded-full"
            : "rounded-md"
        )}
        disabled
      >
        <Heart className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      variant={type === "ProductPage" ? "outline" : "secondary"}
      size={type === "ProductPage" ? "default" : "icon"}
      className={cn(
        type === "ProductCard"
          ? "absolute top-3 right-3 rounded-full"
          : "rounded-md",
        "p-2  transition-all duration-300 flex items-center justify-center",
        isInWishlist(product.id)
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-white/80 hover:bg-white text-gray-700"
      )}
      onClick={(e) => {
        e.stopPropagation();
        handleToggleWishlist();
      }}
    >
      <Heart
        className={`size-5 ${isInWishlist(product.id) ? "fill-current" : ""}`}
      />
    </Button>
  );
}
