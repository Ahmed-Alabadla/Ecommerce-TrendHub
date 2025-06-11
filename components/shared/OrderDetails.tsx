"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, CircleX, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useOrder } from "@/hooks/useOrder";
import { toast } from "sonner";
import { OrderStatus } from "@/types/order";
import { Skeleton } from "../ui/skeleton";

interface OrderDetailsProps {
  orderId: string;
}

export default function OrderDetails({ orderId }: OrderDetailsProps) {
  const { data: order, isPending, error } = useOrder(orderId);
  if (isPending) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        {/* Order Summary skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Product items skeleton */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-16 w-16 rounded" />
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
              <Separator className="my-4" />
              {/* Price details skeleton */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Shipping Information skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Skeleton className="h-5 w-16 mb-2" />
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div>
                <Skeleton className="h-5 w-16 mb-2" />
                <Skeleton className="h-4 w-48 mb-1" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  if (error) {
    toast.error(error.message);
  }

  if (!order) {
    return (
      <Alert variant="destructive" className="mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Order Not Found</AlertTitle>
        <AlertDescription>
          We couldn&apos;t find an order with the ID: {orderId}.
        </AlertDescription>
      </Alert>
    );
  }

  const statusIcons = {
    pending: <AlertCircle className="h-4 w-4 text-yellow-500" />,
    paid: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    failed: <CircleX className="h-4 w-4 text-red-500" />,
    cancelled: <CircleX className="h-4 w-4 text-red-500" />,
    delivered: <Truck className="h-4 w-4 text-purple-500" />,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Order #{order.orderNumber}
          </h2>
          <p className="text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-4 justify-between">
          {order.isDelivered && (
            <div className="flex items-center gap-2">
              {statusIcons.delivered}
              <span className="font-medium capitalize">Delivering</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            {statusIcons[order.status as OrderStatus]}
            <span className="font-medium capitalize">{order.status}</span>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.imageCover || "/product.png"}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="font-medium">
                      $
                      {item.product.priceAfterDiscount &&
                      Number(item.product.priceAfterDiscount) > 0
                        ? (
                            Number(item.product.priceAfterDiscount) *
                            Number(item.quantity)
                          ).toFixed(2)
                        : (
                            Number(item.product.price) * Number(item.quantity)
                          ).toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    $
                    {item.product.priceAfterDiscount &&
                    Number(item.product.priceAfterDiscount) > 0
                      ? item.product.priceAfterDiscount
                      : item.product.price}{" "}
                    × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
            <Separator className="my-4" />

            <div className="flex justify-between">
              <span className="font-semibold">Shipping Price : </span>
              <span className="font-bold">${order.shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Tax : </span>
              <span className="font-bold">${order.taxPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Total : </span>
              <span className="font-bold">${order.totalOrderPrice}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Contact</h4>
              <p className="text-sm">{order.user.name}</p>
              <p className="text-sm">{order.user.email}</p>
              {order.user.phone && (
                <p className="text-sm">{order.user.phone}</p>
              )}
            </div>
            <div>
              <h4 className="font-medium mb-2">Address</h4>
              <p className="text-sm">{order.shippingAddress.street}</p>
              <p className="text-sm">
                {order.shippingAddress.city}, {order.shippingAddress.country}{" "}
                {order.shippingAddress.postalCode}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
