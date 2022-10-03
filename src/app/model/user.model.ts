import { Order } from './order.model';

export interface User {
  uid: string;
  email: string;
  orders?: Order[];
}
