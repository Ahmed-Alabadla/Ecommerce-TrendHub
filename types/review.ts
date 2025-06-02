export interface IReview {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface IReviewForm {
  productId: string;
  rating: number;
  comment: string;
}
