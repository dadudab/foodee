import { CartItem } from './cart-item';

export interface Cart {
  products: CartItem[];
  totalPrice: number;
  totalQuantity: number;
}
