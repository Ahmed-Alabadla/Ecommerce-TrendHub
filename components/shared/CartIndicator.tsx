import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function CartIndicator() {
  const { data: cart } = useCart();
  const cartItems = cart?.cartItems || [];

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative hover:text-primary dark:hover:bg-gray-700"
      asChild
    >
      <Link href="/cart">
        <ShoppingCart className="size-5" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </Link>
    </Button>
  );
}
