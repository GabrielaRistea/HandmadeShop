export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
  productImage: any;
}

export interface CartDisplay {
  items: CartItem[];
  totalAmount: number;
}

export interface CheckoutResponse {
  redirectToStripe: boolean;
  stripeUrl?: string;
  orderId?: number;
}