import { IProduct } from "./product";
import { IUser } from "./user";

export interface IReview {
  id: number;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  product: IProduct;
  user: IUser;
}

export interface IReviewForm {
  rating: number;
  comment?: string;
}

export interface ReviewsQueryParams {
  productId?: number;
  page?: number;
  limit?: number;
}

export interface ReviewsResponse {
  data: IReview[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}
