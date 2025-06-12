"use client";

import { ShoppingCart, Trash2, Heart } from "lucide-react";
import { toast } from "sonner";
import WishlistProductCard from "@/components/shared/WishlistProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useWishlist } from "../../../hooks/useWishlist";
import { useAddToCart } from "../../../hooks/useCart";

const WishlistPage = () => {
  const { clearWishlist, wishlistItems } = useWishlist();

  const addToCart = useAddToCart();

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart.mutate({ productId: item.id });
    });

    toast.success("Added to cart", {
      description: `${wishlistItems.length} items have been added to your cart`,
    });

    clearWishlist();
  };

  const handleClearWishlist = () => {
    clearWishlist();

    toast.success("Wishlist cleared", {
      description: "All items have been removed from your wishlist",
    });
  };

  return (
    <section className="py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Heart className="mr-2 text-[#8b5cf6]" fill="#8b5cf6" />
            My Wishlist
          </h1>
          <p className="text-muted-foreground mt-2">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleAddAllToCart}
            disabled={wishlistItems.length === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add All to Cart
          </Button>

          <Button
            onClick={handleClearWishlist}
            variant="outline"
            className="border-primary dark:border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/40"
            disabled={wishlistItems.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Wishlist
          </Button>
        </div>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid gap-4">
          {wishlistItems.map((item) => (
            <WishlistProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Save your favorite items to your wishlist and come back to them
            later.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      )}
    </section>
  );
};

export default WishlistPage;
