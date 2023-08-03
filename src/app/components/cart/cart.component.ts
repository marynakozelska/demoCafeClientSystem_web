import {Component} from '@angular/core';
import {Cart} from "../../entities/cart";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../entities/cart-item";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Cart;
  table: number;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cart = this.cartService.loadCart();
  }

  clean(): void {
    this.cartService.cleanCart();
    window.location.reload();
  }

  sendOrder(): void {
    this.cartService.sendOrder(this.table)
      .subscribe(
        (response) => {
          console.log('Order sent successfully!', response);
          this.clean();
        },
        (error) => {
          console.error('Error sending order:', error);
        }
      )
  }

  isEmpty(): boolean {
    return this.cart.items.length == 0;
  }

  countTotal(): number {
    return this.cart
      .items
      .reduce(
        (total, cartItem) => {
          return total + cartItem.item.price * cartItem.itemCount
        }, 0
      );

  }

  addCount(item: CartItem) {
    this.cartService.addCount(item);
    window.location.reload();
  }

  removeCount(item: CartItem) {
    this.cartService.removeCount(item);
    window.location.reload();
  }
}
