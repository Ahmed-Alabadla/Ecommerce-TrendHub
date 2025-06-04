import { IBrand } from "./brand";
import { ICategory } from "./category";
import { ISubcategory } from "./subcategory";

export enum ProductStatus {
  ACTIVE = "Active",
  OUT_OF_STOCK = "OutOfStock",
  DISCONTINUED = "Discontinued",
}
export interface IDimensions {
  length: number | null;
  width: number | null;
  height: number | null;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount: number | null;
  imageCover: string;
  images: string[];
  sold: number;
  ratingsAverage: string;
  ratingsQuantity: number;
  status: ProductStatus;
  warranty: string | null;
  weight: number | null;
  dimensions: IDimensions | null;
  createdAt: Date;
  updatedAt: Date;
  category: ICategory;
  subCategory: ISubcategory | null;
  brand: IBrand | null;
  // reviews: Review[];
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  subcategories?: string[];
  brands?: string[];
  price_gt?: number;
  price_gte?: number;
  price_lt?: number;
  price_lte?: number;
  sortBy?: "price" | "ratingsAverage" | "createdAt";
  sortOrder?: "ASC" | "DESC";
}
export interface ProductsResponse {
  data: IProduct[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}
