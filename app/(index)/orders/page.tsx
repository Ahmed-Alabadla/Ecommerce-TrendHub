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
import Image from "next/image";
import Link from "next/link";
import React from "react";

const statusIcons = {
  pending: <AlertCircle className="h-4 w-4 text-yellow-500" />,
  paid: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  failed: <CircleX className="h-4 w-4 text-red-500" />,
  cancelled: <CircleX className="h-4 w-4 text-red-500" />,
  shipped: <Package className="h-4 w-4 text-blue-500" />,
  delivered: <Truck className="h-4 w-4 text-purple-500" />,
};
export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export default function OrdersPage() {
  const orders = [
    {
      id: 126,
      orderNumber: "ORD-20250518-00000126",
      taxPrice: "226.80",
      shippingPrice: "108.00",
      totalOrderPrice: "2494.78",
      paymentMethodType: "cash",
      isPaid: true,
      paidAt: "2025-05-18",
      isDelivered: false,
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
    },
    {
      id: 125,
      orderNumber: "ORD-20250518-00000125",
      taxPrice: "252.00",
      shippingPrice: "120.00",
      totalOrderPrice: "2771.98",
      paymentMethodType: "cash",
      isPaid: true,
      paidAt: "2025-05-18",
      isDelivered: false,
      deliveredAt: "2025-05-18",
      shippingAddress: {
        street: "Salah ALDeen",
        country: "PS",
        city: "Gaza",
        postalCode: 12345,
      },
      stripeCheckoutId: null,
      status: "paid",
      createdAt: "2025-05-18T14:41:10.885Z",
      updatedAt: "2025-05-18T16:22:12.403Z",
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
          id: 134,
          quantity: 2,
          createdAt: "2025-05-18T14:41:10.870Z",
          updatedAt: "2025-05-18T14:41:10.885Z",
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
    },
    {
      id: 124,
      orderNumber: "ORD-20250518-00000124",
      taxPrice: "252.00",
      shippingPrice: "120.00",
      totalOrderPrice: "2771.98",
      paymentMethodType: "cash",
      isPaid: false,
      paidAt: "2025-05-18",
      isDelivered: false,
      deliveredAt: "2025-05-18",
      shippingAddress: {
        street: "Salah ALDeen",
        country: "PS",
        city: "Gaza",
        postalCode: 12345,
      },
      stripeCheckoutId: null,
      status: "cancelled",
      createdAt: "2025-05-18T14:34:19.222Z",
      updatedAt: "2025-05-23T13:19:19.485Z",
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
          id: 133,
          quantity: 2,
          createdAt: "2025-05-18T14:34:19.210Z",
          updatedAt: "2025-05-18T14:34:19.222Z",
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
    },
    {
      id: 121,
      orderNumber: "ORD-20250518-00000121",
      taxPrice: "246.75",
      shippingPrice: "117.50",
      totalOrderPrice: "2714.23",
      paymentMethodType: "card",
      isPaid: false,
      paidAt: null,
      isDelivered: true,
      deliveredAt: null,
      shippingAddress: {
        street: "Salah ALDeen",
        country: "PS",
        city: "Gaza",
        postalCode: 12345,
      },
      stripeCheckoutId:
        "cs_test_a1ifXCDLAqUgvzVv0v5EeJpVeZQauo1SQsLdkSibQveIDk0XUrDlleOd2b",
      status: "pending",
      createdAt: "2025-05-18T11:52:00.224Z",
      updatedAt: "2025-05-18T11:52:02.459Z",
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
          id: 130,
          quantity: 2,
          createdAt: "2025-05-18T11:52:00.208Z",
          updatedAt: "2025-05-18T11:52:00.224Z",
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
        {
          id: 130,
          quantity: 2,
          createdAt: "2025-05-18T11:52:00.208Z",
          updatedAt: "2025-05-18T11:52:00.224Z",
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
        {
          id: 130,
          quantity: 2,
          createdAt: "2025-05-18T11:52:00.208Z",
          updatedAt: "2025-05-18T11:52:00.224Z",
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
        {
          id: 130,
          quantity: 2,
          createdAt: "2025-05-18T11:52:00.208Z",
          updatedAt: "2025-05-18T11:52:00.224Z",
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
        {
          id: 130,
          quantity: 2,
          createdAt: "2025-05-18T11:52:00.208Z",
          updatedAt: "2025-05-18T11:52:00.224Z",
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
        {
          id: 130,
          quantity: 2,
          createdAt: "2025-05-18T11:52:00.208Z",
          updatedAt: "2025-05-18T11:52:00.224Z",
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
        {
          id: 130,
          quantity: 2,
          createdAt: "2025-05-18T11:52:00.208Z",
          updatedAt: "2025-05-18T11:52:00.224Z",
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
    },
  ];
  if (orders.length === 0) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
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
                  Order placed on {formatDate(order.createdAt)}
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
                          src={item.product.imageCover}
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
