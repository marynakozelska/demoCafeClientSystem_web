import {User} from "./user";
import {OrderItem} from "./order-item";

export class Order {
  id: number;
  menuItems: OrderItem[];
  user: User;
  tableNumber: number;
  status: string;
}
