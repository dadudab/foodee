import { User } from 'src/app/auth/user';

export interface Order {
  _id: string;
  user: User;
  products: OrderedProduct[];
  totalPrice: number;
  totalQuantity: number;
  timestamp: Date;
}

export interface OrderedProduct {
  productId: string;
  price: number;
  quantity: number;
  name: string;
}
