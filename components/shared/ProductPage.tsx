"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
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
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ReviewForm from "./ReviewForm";
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
} from "../ui/alert-dialog";
import { toast } from "sonner";
import WishlistButton from "./WishlistButton";
import { IProduct, ProductStatus } from "@/types/product";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
  const product: IProduct = {
    id: 23,
    name: "iPhone 16 Pro Max ",
    description: "this is iPhone 16 Pro Max ",
    quantity: 88,
    price: 1199.99,
    priceAfterDiscount: 0,
    imageCover:
      "https://res.cloudinary.com/dquxld87w/image/upload/v1747566561/ecommerce/tvimr1x6o3fa7bxd0tod.jpg",
    images: [
      "https://res.cloudinary.com/dquxld87w/image/upload/v1747566562/ecommerce/tnqg50o8cea6nkll3vcn.jpg",
      "https://res.cloudinary.com/dquxld87w/image/upload/v1747566562/ecommerce/rftzcdnm9glxryjiau1x.jpg",
    ],
    sold: 12,
    ratingsAverage: "0.0",
    ratingsQuantity: 0,
    status: "Active" as ProductStatus,
    warranty: null,
    weight: null,
    dimensions: null,
    createdAt: new Date("2025-05-18T11:09:21.422Z"),
    updatedAt: new Date("2025-05-18T16:25:24.376Z"),
    category: {
      id: 23,
      name: "Mobiles",
      slug: "mobiles",
    },
    subCategory: null,
    brand: {
      id: 2,
      name: "Apple",
      slug: "apple",
    },
  };
  const productReviews = [
    {
      id: 1,
      user: {
        id: 1,
        name: "John Doe",
      },
      rating: 4,
      comment:
        "Great sound quality and comfortable fit. The noise cancellation works well, but the battery life could be better.",
      createdAt: "2023-10-01T12:00:00Z",
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "Jane Smith",
      },
      rating: 5,
      comment:
        "Absolutely love these headphones! The sound is crystal clear and the design is sleek. Highly recommend!",
      createdAt: "2023-10-02T14:30:00Z",
    },
    {
      id: 3,
      user: {
        id: 3,
        name: "Alice Johnson",
      },
      rating: 3,
      comment:
        "Decent headphones, but I expected more for the price. The sound is good, but the fit is a bit tight for long listening sessions.",
      createdAt: "2023-10-03T09:15:00Z",
    },
    {
      id: 4,
      user: {
        id: 4,
        name: "Bob Brown",
      },
      rating: 2,
      comment:
        "Not impressed. The sound quality is average and the build feels cheap. I expected better from this brand.",
      createdAt: "2023-10-04T16:45:00Z",
    },
    {
      id: 5,
      user: {
        id: 5,
        name: "Charlie Green",
      },
      rating: 4,
      comment:
        "Good headphones overall. The sound is great and the battery life is decent. However, they could be more comfortable for long use.",
      createdAt: "2023-10-05T11:20:00Z",
    },
  ];

  const discount =
    product.priceAfterDiscount && product.priceAfterDiscount > 0
      ? Math.round(
          ((product.price - product.priceAfterDiscount) / product.price) * 100
        )
      : 0;

  const handleDeleteReview = () => {
    // deleteReview(review.id);
    toast.success("Review deleted", {
      description: "Your review has been successfully deleted.",
      duration: 3000,
    });
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
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Number(product.ratingsAverage) > 0
                  ? product.ratingsAverage
                  : 0.0}{" "}
                ({product.ratingsQuantity > 0 ? product.ratingsQuantity : 0})
                reviews
              </span>
            </div>
            {product.brand && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed max-w-2xl truncate">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 dark:border-gray-500 rounded-lg">
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
              {product.status == ProductStatus.OUT_OF_STOCK
                ? "Out of Stock"
                : product.status}
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
              Reviews ({productReviews.length})
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
                        ? product.warranty
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
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 dark:bg-primary/40  rounded-full p-4">
                  <span className="text-2xl font-bold">
                    {productReviews.length > 0
                      ? (
                          productReviews.reduce((sum, r) => sum + r.rating, 0) /
                          productReviews.length
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
                          i < Math.floor(Number(product.ratingsAverage))
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  {/* <p className="text-sm text-gray-500 mt-1">
                    Based on customer reviews
                  </p> */}
                  <p className="text-sm text-gray-500 mt-1">
                    Based on {productReviews.length || "customer"} reviews
                  </p>
                </div>

                <ReviewForm productName={product.name}>
                  <Button className="ml-auto">Write a Review</Button>
                </ReviewForm>
              </div>

              <div className="space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <div key={review.id} className="border-t pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {review.user.name}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Review Actions */}
                        <div className="flex items-center gap-2">
                          <ReviewForm
                            productName={product.name}
                            // existingReview={review}
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
                                  Are you sure you want to delete this review?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteReview}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {review.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">
                      No reviews yet. Be the first to review this product!
                    </p>
                    <ReviewForm productName={product.name}>
                      <Button>Write the First Review</Button>
                    </ReviewForm>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
