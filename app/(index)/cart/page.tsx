"use client";
import CheckoutForm from "@/components/shared/CheckoutForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IProduct, ProductStatus } from "@/types/product";
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function CartPage() {
  const items: IProduct[] = [
    {
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
    },
  ];
  const [quantity, setQuantity] = useState(1);

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {items.length <= 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border p-6 flex flex-col gap-4">
              <div className="space-y-6">
                {items.map((product) => {
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
                            src={product.imageCover}
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
                                  setQuantity(Math.max(1, quantity - 1))
                                }
                                className=" dark:hover:bg-gray-700"
                                disabled={quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-4 py-1 font-semibold">
                                {quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setQuantity(quantity + 1)}
                                className=" dark:hover:bg-gray-700"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Price */}
                            <div className="font-medium">
                              ${price.toFixed(2)}
                            </div>

                            {/* Remove button */}
                            <Button
                              variant="destructive"
                              size="sm"
                              // onClick={() => removeItem(product.id)}
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
              <CheckoutForm totalPrice={3025} />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {/* Subtotal ({totalItems()} items) */}
                    Subtotal (3 items)
                  </span>
                  <span>${items[0].price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(items[0].price * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${(items[0].price * 1.1).toFixed(2)}</span>
              </div>

              <div className="mt-4 flex justify-center">
                <Link href="/" className="text-primary  hover:underline ">
                  Continue Shopping
                </Link>
              </div>

              {/* Coupon */}

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Coupon Code</h3>
                {false ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        {/* {appliedCoupon.code} */}
                        AH30
                      </Badge>
                      <span className="ml-2 text-sm text-green-700 dark:text-green-300">
                        {/* {appliedCoupon.discount}% off */}
                        30% off
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={handleRemoveCoupon}
                      className="text-green-600 hover:text-green-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      // value={couponCode}
                      // onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow border rounded-md px-3 py-2 text-sm"
                    />
                    <Button
                      variant="outline"
                      // onClick={handleApplyCoupon}
                      // disabled={!couponCode.trim() || isApplyingCoupon}
                    >
                      Apply
                      {/* {isApplyingCoupon ? 'Applying...' : 'Apply'} */}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
