import { User } from './user.model';
import { Item } from './item.model';

export class Order {
  constructor(
    public user: User,
    public companyName: string,
    public telephone: string,
    public address: string,
    public items: Item[]
  ) {}
}
