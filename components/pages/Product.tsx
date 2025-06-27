"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Edit,
  Minus,
  PackageCheck,
  Plus,
  RefreshCw,
  Share,
  ShoppingCart,
  Star,
  Trash2,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewForm from "../shared/ReviewForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import WishlistButton from "../shared/WishlistButton";
import { ProductStatus } from "@/types/product";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProduct, useProducts } from "@/hooks/useProduct";
import { useDeleteReview, useInfiniteReviews } from "@/hooks/useReview";
import { useProfile } from "@/hooks/useProfile";
import ProductGrid from "../shared/ProductGrid";
import { Skeleton } from "../ui/skeleton";
import { useAddToCart } from "@/hooks/useCart";

export default function Product({ id }: { id: string }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCart();

  // Fetch product data using useProduct hook
  const { data: product, isLoading, error } = useProduct(id);

  const deleteReviewMutation = useDeleteReview();

  // ============ Reviews =============
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: loadingReviews,
  } = useInfiniteReviews({ limit: 10, productId: product?.id });
  const reviews = data?.pages.flatMap((page) => page.data) ?? [];
  const totalCount = data?.pages[0]?.meta.total ?? 0;

  // ============ Related Products =============

  const {
    data: relatedProducts,
    isPending: isRelatedProductsLoading,
    error: relatedProductsError,
  } = useProducts({
    page: 1,
    limit: 10,
    categories: product?.category.id ? [product.category.id.toString()] : [],
    subcategories:
      product?.subCategory && product?.subCategory.id
        ? [product.subCategory.id.toString()]
        : [],
    sortOrder: "DESC",
  });

  if (relatedProductsError) {
    toast.error("Failed to load related products. Please try again later.", {
      description: relatedProductsError.message,
      duration: 3000,
    });
  }

  //  =============== user ================
  const { data: user } = useProfile();

  if (!id || error || !product) {
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
  // Loading state
  if (isLoading) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <p>Please wait while we fetch the product details.</p>
      </div>
    );
  }

  const discount =
    product.priceAfterDiscount && product.priceAfterDiscount > 0
      ? Math.round(
          ((product.price - product.priceAfterDiscount) / product.price) * 100
        )
      : 0;

  const handleDeleteReview = (reviewId: number) => {
    deleteReviewMutation.mutate(reviewId);
  };
  const productImages = [product.imageCover, ...product.images];

  const handleClickShareButton = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        // Optionally show a toast or alert
        toast.success("Product URL copied to clipboard!", {
          description: "You can now share this product easily.",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err);
      });
  };

  // Handle quantity changes with stock validation
  const handleQuantityDecrease = () => {
    setQuantity(Math.max(1, quantity - 1));
  };
  const handleQuantityIncrease = () => {
    const maxQuantity = product.quantity || 0;
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const isOutOfStock =
    product.status === ProductStatus.OUT_OF_STOCK ||
    (product.quantity || 0) <= 0;
  const maxQuantityReached = quantity >= (product.quantity || 0);

  return (
    <div>
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden border dark:border-gray-400">
            <Image
              src={productImages[activeImageIndex]}
              alt={product.name}
              width={500}
              height={500}
              priority
              className="w-full h-full object-contain"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-4 pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 ${
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
              {product.category.name}
            </Badge>

            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-5 ${
                      i < Math.floor(Number(product.ratingsAverage))
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {Number(product.ratingsAverage) > 0
                  ? product.ratingsAverage
                  : 0.0}{" "}
                ({product.ratingsQuantity > 0 ? product.ratingsQuantity : 0})
                reviews
              </span>
            </div>
            {product.brand && (
              <p className="text-sm text-muted-foreground mt-1">
                Brand:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                  {product.brand.name}
                </span>
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            {product.priceAfterDiscount && product.priceAfterDiscount > 0 ? (
              <>
                <span className="text-3xl font-bold">
                  ${product.priceAfterDiscount}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.price}
                </span>
                <Badge className="bg-red-500">{discount}% OFF</Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">${product.price}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed max-w-2xl truncate">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 dark:border-gray-500 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleQuantityDecrease}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleQuantityIncrease}
                disabled={isOutOfStock || maxQuantityReached}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-col">
              <span className="text-sm  text-muted-foreground">
                {isOutOfStock ? (
                  "Out of Stock"
                ) : (
                  <p>
                    <span className="text-foreground font-semibold">
                      {product.quantity || 0}
                    </span>
                    <span> in stock</span>
                  </p>
                )}
              </span>
              {maxQuantityReached && !isOutOfStock && (
                <span className="text-xs text-orange-500">
                  Maximum quantity reached
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button
              onClick={() => {
                addToCart.mutate({
                  productId: product.id,
                  values: {
                    quantity: 1,
                  },
                });
              }}
              disabled={isOutOfStock}
              className="flex-1"
            >
              <ShoppingCart className="size-5 mr-2" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>

            <WishlistButton type="ProductPage" product={product} />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:text-primary hover:border-primary"
                  onClick={handleClickShareButton}
                >
                  <Share className="size-5 " />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Shipping & Returns */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 dark:bg-gray-700  p-2 rounded-full">
                <Truck className="size-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
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
                <p className="text-sm text-muted-foreground dark:text-gray-400">
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
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  SSL / Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="mb-4 grid grid-cols-3 gap-4 w-full h-auto">
            <TabsTrigger
              value="description"
              className="dark:data-[state=active]:bg-primary/90 data-[state=active]:bg-primary/90 py-2 px-6 text-md hover:bg-primary/50 hover:text-white data-[state=active]:text-white cursor-pointer"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="dark:data-[state=active]:bg-primary/90 data-[state=active]:bg-primary/90 py-2 px-6 text-md hover:bg-primary/50 hover:text-white data-[state=active]:text-white cursor-pointer"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="dark:data-[state=active]:bg-primary/90 data-[state=active]:bg-primary/90 py-2 px-6 text-md hover:bg-primary/50 hover:text-white data-[state=active]:text-white cursor-pointer"
            >
              Reviews ({totalCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="max-w-none text-gray-800 dark:text-gray-200">
              <p>{product.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h4 className="font-medium mb-2">Product Specifications</h4>
                <ul className="space-y-2">
                  {product.brand && (
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Brand
                      </span>
                      <span className="capitalize">{product.brand.name}</span>
                    </li>
                  )}
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Model
                    </span>
                    <span>{product.name}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Category
                    </span>
                    <span className="capitalize">{product.category.name}</span>
                  </li>
                  {product.subCategory && (
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Subcategory
                      </span>
                      <span className="capitalize">
                        {product.subCategory.name}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h4 className="font-medium mb-2">Additional Information</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Weight
                    </span>
                    <span>
                      {product.weight && product.weight > 0
                        ? product.weight
                        : "0.00"}{" "}
                      kg
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Dimensions
                    </span>
                    <span>
                      {product.dimensions?.length
                        ? product.dimensions?.length
                        : "N/A"}{" "}
                      ×{" "}
                      {product.dimensions?.width
                        ? product.dimensions?.width
                        : "N/A"}{" "}
                      ×{" "}
                      {product.dimensions?.height
                        ? product.dimensions?.height
                        : "N/A"}{" "}
                      cm
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Warranty
                    </span>
                    <span>{product.warranty ? product.warranty : "N/A"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            {loadingReviews ? (
              <>Loading...</>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 dark:bg-primary/40  rounded-full p-4">
                    <span className="text-2xl font-bold">
                      {reviews.length > 0
                        ? (
                            reviews.reduce((sum, r) => sum + r.rating, 0) /
                            reviews.length
                          ).toFixed(1)
                        : product.ratingsAverage}
                    </span>
                  </div>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i <
                            Math.floor(
                              Number(
                                reviews.reduce((sum, r) => sum + r.rating, 0) /
                                  reviews.length
                              )
                            )
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">
                      Based on {totalCount || "customer"} reviews
                    </p>
                  </div>

                  {user ? (
                    <ReviewForm
                      productName={product.name}
                      productId={product.id}
                    >
                      <Button className="ml-auto">Write a Review</Button>
                    </ReviewForm>
                  ) : (
                    <Button className="ml-auto" disabled>
                      Write a Review
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="border-t pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">
                                {review.user.name}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`size-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Review Actions - Only show if user is logged in and owns the review */}
                          {user && user.id === review.user.id && (
                            <div className="flex items-center gap-2">
                              <ReviewForm
                                productId={product.id}
                                productName={product.name}
                                existingReview={review}
                                mode="edit"
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="border"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </ReviewForm>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 border"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Review
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      review? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteReview(review.id)
                                      }
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        No reviews yet. Be the first to review this product!
                      </p>
                      {user ? (
                        <ReviewForm
                          productName={product.name}
                          productId={product.id}
                        >
                          <Button>Write the First Review</Button>
                        </ReviewForm>
                      ) : (
                        <p className="text-sm text-gray-400">
                          Please log in to write a review.
                        </p>
                      )}
                    </div>
                  )}
                  {hasNextPage && (
                    <div className="text-center mt-8">
                      <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        variant="outline"
                        size="lg"
                        className="dark:border-primary dark:text-primary text-lg"
                      >
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        {isRelatedProductsLoading ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-4 w-72 mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-4 border rounded-lg p-4">
                  <Skeleton className="aspect-square w-full rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ProductGrid
            products={relatedProducts?.data || []}
            title="You May Also Like"
            subtitle="Similar products you might be interested in"
          />
        )}
      </div>
    </div>
  );
}
