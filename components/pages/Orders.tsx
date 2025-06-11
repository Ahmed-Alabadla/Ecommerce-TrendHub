"use client";
import { useOrders } from "@/hooks/useOrder";
import React from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle2,
  CircleX,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { OrderStatus } from "@/types/order";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function Orders() {
  const { data: orders, isPending, error } = useOrders();
  if (error) {
    toast.error(error.message);
  }

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="p-0">
              <CardHeader className="bg-muted/50 p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-2 md:mb-0">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-12 mb-1" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-12 mb-1" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                    {Array.from({ length: 4 }).map((_, itemIndex) => (
                      <div key={itemIndex} className="flex flex-col">
                        <Skeleton className="h-16 w-16 rounded mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Skeleton className="h-8 w-32" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">No Orders Found</h1>
          <p className="text-muted-foreground mb-6">
            You haven&apos;t placed any orders yet. Start shopping to create
            your first order.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const statusIcons = {
    pending: <AlertCircle className="h-4 w-4 text-yellow-500" />,
    paid: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    failed: <CircleX className="h-4 w-4 text-red-500" />,
    cancelled: <CircleX className="h-4 w-4 text-red-500" />,
    shipped: <Package className="h-4 w-4 text-blue-500" />,
    delivered: <Truck className="h-4 w-4 text-purple-500" />,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="p-0">
            <CardHeader className="bg-muted/50 flex flex-col md:flex-row md:items-center md:justify-between p-4">
              <div className="mb-2 md:mb-0">
                <p className="font-medium">Order #{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">
                  Order placed on {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              {order.isDelivered && (
                <div className="flex items-center gap-2">
                  {statusIcons.delivered}
                  <span className="text-sm">Delivering</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                {statusIcons[order.status as OrderStatus]}
                <span className="text-sm">{order.status}</span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">
                    Items
                  </span>
                  <span className="font-medium">
                    {order.orderItems.length} items
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">
                    Ship to
                  </span>
                  <span className="font-medium">{order.user.name}</span>
                  <span className="text-sm truncate">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">
                    Total
                  </span>
                  <span className="font-bold">${order.totalOrderPrice}</span>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <h3 className="font-medium">Items in this order</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                  {order.orderItems.map((item) => (
                    <div key={item.product.id} className="flex flex-col">
                      <div className="h-16 w-16 rounded overflow-hidden mb-2">
                        <Image
                          src={item.product.imageCover || "/product.png"}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                          width={64}
                          height={64}
                        />
                      </div>
                      <p className="text-sm font-medium line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button asChild variant="outline" size="sm">
                <Link href={`/orders/${order.id}`}>View Order Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
