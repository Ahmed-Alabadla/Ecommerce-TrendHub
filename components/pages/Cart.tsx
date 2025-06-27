"use client";
import CheckoutForm from "@/components/shared/CheckoutForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  useAddToCart,
  useApplyCoupon,
  useCart,
  useRemoveCoupon,
  useRemoveItemFromCart,
} from "@/hooks/useCart";
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Cart() {
  const { data: cart, isPending, error } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const addToCart = useAddToCart();
  const applyCoupon = useApplyCoupon();
  const removeCoupon = useRemoveCoupon();
  const removeItem = useRemoveItemFromCart();

  const cartItems = cart?.cartItems || [];
  if (isPending) {
    return (
      <main>
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Loading Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border p-6">
              <div className="space-y-6">
                {/* Loading skeleton for cart items */}
                {[1, 2, 3].map((index) => (
                  <div key={index}>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      {/* Image skeleton */}
                      <Skeleton className="w-20 h-20 rounded-md flex-shrink-0" />

                      {/* Content skeleton */}
                      <div className="flex-grow min-w-0 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-8 w-24" />
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </div>
                    </div>
                    <Separator className="mt-6 dark:bg-gray-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border p-6 sticky top-24">
              <Skeleton className="h-6 w-1/2 mb-4" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/5" />
                  <Skeleton className="h-4 w-14" />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between mb-6">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-20" />
              </div>

              <Skeleton className="h-4 w-1/2 mx-auto mb-6" />

              {/* Coupon section skeleton */}
              <div className="mt-6 pt-6 border-t">
                <Skeleton className="h-5 w-1/3 mb-2" />
                <div className="flex space-x-2">
                  <Skeleton className="flex-grow h-10" />
                  <Skeleton className="h-10 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    toast.error(error.message);
  }

  // Remove coupon
  const handleRemoveCoupon = () => {
    removeCoupon.mutate();
  };

  // Apply coupon
  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      applyCoupon.mutate(couponCode.trim());
      setCouponCode(""); // Clear input after applying
    }
  };

  // Remove item from cart
  const handleRemoveItem = (productId: number) => {
    removeItem.mutate(productId);
  };

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border p-6 flex flex-col gap-4">
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const product = item.product;

                  const price =
                    product.priceAfterDiscount && product.priceAfterDiscount > 0
                      ? product.priceAfterDiscount
                      : product.price;

                  const discount =
                    product.priceAfterDiscount && product.priceAfterDiscount > 0
                      ? Math.round(
                          ((product.price - product.priceAfterDiscount) /
                            product.price) *
                            100
                        )
                      : 0;

                  return (
                    <div key={product.id}>
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        {/* Product Image */}
                        <Link
                          href={`/products/${product.id}`}
                          className="w-20 h-20 flex-shrink-0"
                        >
                          <Image
                            src={product.imageCover || "/product.png"}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover object-center border dark:border-gray-600 rounded-md"
                          />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-grow min-w-0">
                          <Link
                            href={`/products/${product.id}`}
                            className="font-medium hover:text-primary"
                          >
                            {product.name}
                          </Link>
                          {product.brand && (
                            <div className="text-sm text-muted-foreground capitalize mt-1">
                              Brand: {product.brand.name}
                            </div>
                          )}

                          {discount > 0 && (
                            <div className="mt-1">
                              <span className="text-red-500 text-sm font-medium">
                                {discount}% OFF
                              </span>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-4 mt-2">
                            {/* Quantity */}
                            <div className="flex items-center border border-gray-300 dark:border-gray-500 rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  addToCart.mutate({
                                    productId: product.id,
                                    values: {
                                      quantity: Math.max(
                                        1,
                                        Number(item.quantity) - 1
                                      ),
                                    },
                                  })
                                }
                                className=" dark:hover:bg-gray-700"
                                disabled={
                                  item.quantity <= 1 || addToCart.isPending
                                }
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-4 py-1 font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  addToCart.mutate({
                                    productId: product.id,
                                    values: {
                                      quantity: Number(item.quantity) + 1,
                                    },
                                  })
                                }
                                className=" dark:hover:bg-gray-700"
                                disabled={addToCart.isPending}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Price */}
                            <div className="font-medium">${price}</div>

                            {/* Remove button */}
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveItem(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator className="mt-6 dark:bg-gray-600" />
                    </div>
                  );
                })}
              </div>
              {/* Shipping Address */}
              {cart?.totalPriceAfterDiscount &&
              cart.totalPriceAfterDiscount > 0 ? (
                <CheckoutForm totalPrice={cart.totalPriceAfterDiscount} />
              ) : (
                <CheckoutForm totalPrice={cart?.totalPrice || 0} />
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span>${cart?.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Calculated at next step</span>
                </div>
              </div>

              <Separator className="my-4" />

              {cart?.totalPriceAfterDiscount &&
                cart?.totalPriceAfterDiscount > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">
                      Coupon Discount
                    </span>
                    <span className="font-medium">
                      $
                      {(
                        cart?.totalPrice - cart?.totalPriceAfterDiscount
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>
                  $
                  {cart?.totalPriceAfterDiscount &&
                  cart?.totalPriceAfterDiscount > 0
                    ? cart?.totalPriceAfterDiscount
                    : cart?.totalPrice}
                </span>
              </div>

              <div className="mt-4 flex justify-center">
                <Link href="/" className="text-primary  hover:underline ">
                  Continue Shopping
                </Link>
              </div>

              {/* Coupon */}

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Coupon Code</h3>
                {cart?.coupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        {cart.coupon.code}
                      </Badge>
                      <span className="ml-2 text-sm text-green-700 dark:text-green-300">
                        {cart.coupon.type === "percentage"
                          ? `${cart.coupon.discount}% off`
                          : `$${cart.coupon.discount} off`}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveCoupon}
                      className="text-green-600 hover:text-green-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter coupon code (e.g., DISCOUNT10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow border rounded-md px-3 py-2 text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim() || applyCoupon.isPending}
                    >
                      {applyCoupon.isPending ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
