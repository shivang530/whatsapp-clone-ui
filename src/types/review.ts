export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  productId: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}