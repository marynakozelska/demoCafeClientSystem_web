import {MenuItem} from "./menu-item";

export class CartItem {
  item: MenuItem;
  itemCount: number;

  constructor(item: MenuItem, itemCount: number) {
    this.item = item;
    this.itemCount = itemCount;
  }
}
