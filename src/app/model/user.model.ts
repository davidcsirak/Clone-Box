import { Order } from './order.model';

export class User {
  constructor(
    public uid: string,
    public email: string,
    public orders?: Order[]
  ) {}
}
