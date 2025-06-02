import { useWishlistStore } from "@/stores/wishlistStore";

export const useWishlist = () => {
  const {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  } = useWishlistStore();

  return {
    wishlistItems: items,
    wishlistCount: items.length,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };
};
