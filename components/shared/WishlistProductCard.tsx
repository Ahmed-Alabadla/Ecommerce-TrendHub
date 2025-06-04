import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistProductCard({
  product,
}: {
  product: IProduct;
}) {
  const { removeFromWishlist } = useWishlist();

  const handleAddToCart = () => {
    // addItem(product, 1);

    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handleRemove = () => {
    // removeItem(product.id);
    removeFromWishlist(product.id);
    toast.success("Removed from wishlist", {
      description: `${product.name} has been removed from your wishlist.`,
      duration: 3000,
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow border dark:border-primary dark:shadow-primary">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/4 lg:w-1/6">
          <Link href={`/products/${product.id}`} className="block h-full">
            <Image
              src={product.imageCover || "/product.png"}
              alt={product.name}
              className="w-full h-64 sm:h-full object-cover object-center"
              width={256}
              height={256}
            />
          </Link>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              {product.brand && (
                <h3 className="text-sm text-muted-foreground capitalize">
                  {product.brand.name}
                </h3>
              )}
              <Link href={`/products/${product.id}`}>
                <h2 className="text-lg font-semibold hover:text-primary transition-colors">
                  {product.name}
                </h2>
              </Link>
            </div>
            <div>
              {product.priceAfterDiscount && product.priceAfterDiscount > 0 ? (
                <div className="text-right">
                  <span className="font-medium text-red-700 text-lg">
                    ${product.priceAfterDiscount}
                  </span>
                  <div className="text-sm text-muted-foreground line-through">
                    ${product.price}
                  </div>
                </div>
              ) : (
                <span className="font-medium text-lg">${product.price}</span>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <Button
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90"
            >
              <ShoppingCart className="mr-2 size-4" /> Add to Cart
            </Button>

            <Button
              onClick={handleRemove}
              variant="outline"
              className="border-red-500 text-red-500 dark:border-red-500 dark:hover:bg-red-400 hover:bg-red-100"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
