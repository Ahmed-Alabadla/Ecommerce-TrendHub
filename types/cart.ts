import { IProduct } from "./product";
import { IUser } from "./user";

export interface ICartItem {
  id: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: IProduct;
  cart: ICart;
}

export interface ICart {
  id: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  coupon: ICoupon | null;
  user: IUser;
  cartItems: ICartItem[];

  createdAt: Date;
  updatedAt: Date;
}

export interface ICoupon {
  id: number;
  code: string;
  discount: number;
  expirationDate: Date;
  type: string;
  maxUsage: number;
  currentUsage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartForm {
  quantity?: number;
}
