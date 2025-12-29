export interface ReviewReadDto {
  reviewID: number;
  comm: string;
  rating: number;
  userName: string;
}

export interface ReviewCreateDto {
  comm: string;
  rating: number;
  productId: number;
}