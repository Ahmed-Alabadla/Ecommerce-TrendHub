import { IProduct } from "./product";
import { IUser } from "./user";

export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export interface IOrderItem {
  id: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: IProduct;
  order: IOrder;
}

export interface IOrder {
  id: number;
  orderNumber: string;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  shippingAddress: {
    street: string;
    country: string;
    city: string;
    postalCode: number;
  };
  stripeCheckoutId: string | null;
  status: OrderStatus;

  createdAt: Date;
  updatedAt: Date;

  orderItems: IOrderItem[];
  user: IUser;
}

export interface CheckoutOrderDto {
  shippingAddress: {
    street: string;
    country: string;
    city: string;
    postalCode: number;
  };
}

export interface ResponseCheckoutOrderCard {
  session_url: string;
  order: IOrder;
}
