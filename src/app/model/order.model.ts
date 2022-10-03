import { User } from './user.model';
import { Item } from './item.model';

export interface Order {
  user: User;
  companyName: string;
  telephone: string;
  address: string;
  items: Item[];
}
