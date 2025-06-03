import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, CheckCircle2, CircleX, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import Image from "next/image";

interface OrderDetailsProps {
  orderId: string;
}

export default function OrderDetails({ orderId }: OrderDetailsProps) {
  console.log("order ", orderId);

  const order = {
    id: 126,
    orderNumber: "ORD-20250518-00000126",
    taxPrice: "226.80",
    shippingPrice: "108.00",
    totalOrderPrice: "2494.78",
    paymentMethodType: "cash",
    isPaid: true,
    paidAt: "2025-05-18",
    isDelivered: true,
    deliveredAt: "2025-05-18",
    shippingAddress: {
      street: "Salah ALDeen",
      country: "PS",
      city: "Gaza",
      postalCode: 12345,
    },
    stripeCheckoutId: null,
    status: "paid",
    createdAt: "2025-05-18T14:44:28.142Z",
    updatedAt: "2025-05-18T16:25:24.384Z",
    user: {
      id: 9,
      name: "Sami",
      email: "sami@gmail.com",
      role: "customer",
      isAccountVerified: true,
      avatar: "",
      birth_date: "2002-03-11",
      phone: "+12025550123",
      address: null,
      isActive: true,
      gender: "male",
      createdAt: "2025-04-20T13:37:58.821Z",
      updatedAt: "2025-04-21T13:56:54.900Z",
    },
    orderItems: [
      {
        id: 135,
        quantity: 2,
        createdAt: "2025-05-18T14:44:28.136Z",
        updatedAt: "2025-05-18T14:44:28.142Z",
        product: {
          id: 23,
          name: "iPhone 16 Pro Max ",
          description: "this is iPhone 16 Pro Max ",
          quantity: 88,
          price: "1199.99",
          priceAfterDiscount: "NaN",
          imageCover:
            "https://res.cloudinary.com/dquxld87w/image/upload/v1747566561/ecommerce/tvimr1x6o3fa7bxd0tod.jpg",
          images: [
            "https://res.cloudinary.com/dquxld87w/image/upload/v1747566562/ecommerce/tnqg50o8cea6nkll3vcn.jpg",
            "https://res.cloudinary.com/dquxld87w/image/upload/v1747566562/ecommerce/rftzcdnm9glxryjiau1x.jpg",
          ],
          sold: 12,
          ratingsAverage: "0.0",
          ratingsQuantity: 0,
          status: "Active",
          warranty: null,
          weight: "NaN",
          dimensions: {},
          createdAt: "2025-05-18T11:09:21.422Z",
          updatedAt: "2025-05-18T16:25:24.376Z",
        },
      },
    ],
  };

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
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const statusIcons = {
    pending: <AlertCircle className="h-4 w-4 text-yellow-500" />,
    paid: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    failed: <CircleX className="h-4 w-4 text-red-500" />,
    cancelled: <CircleX className="h-4 w-4 text-red-500" />,
    delivered: <Truck className="h-4 w-4 text-purple-500" />,
  };
  enum OrderStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed",
    CANCELLED = "cancelled",
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Order #{order.orderNumber}
          </h2>
          <p className="text-muted-foreground">
            Placed on {formatDate(order.createdAt)}
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
                    src={item.product.imageCover}
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
