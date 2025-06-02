"us client";
import { useWishlist } from "@/hooks/useWishlist";
import React from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistIndicator() {
  const { wishlistCount } = useWishlist();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative hover:text-primary dark:hover:bg-gray-700"
      asChild
    >
      <Link href="/wishlist">
        <Heart className="size-5" />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
