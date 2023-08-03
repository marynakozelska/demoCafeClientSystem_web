import {Injectable} from '@angular/core';
import {Cart} from "../entities/cart";
import {MenuItem} from "../entities/menu-item";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CartItem} from "../entities/cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseURL = "http://localhost:8080/order";

  constructor(private http: HttpClient) {
  }

  addToCart(item: MenuItem) {
    let cart = this.loadCart();

    const itemIndex = cart.items.findIndex(
      (cartItem) => cartItem.item && cartItem.item.id == item.id
    );

    if (itemIndex !== -1) {
      cart.items[itemIndex].itemCount += 1;
    } else {
      cart.items.push(
        new CartItem(item, 1)
      );
    }

    this.saveCart(cart);
  }

  saveCart(cart: Cart): void {
    localStorage.setItem('cart_items', JSON.stringify(cart));
  }

  loadCart(): Cart {
    return JSON.parse(localStorage.getItem("cart_items") || '{"items": []}');
  }

  cleanCart() {
    localStorage.removeItem('cart_items');
  }

  sendOrder(table: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let cart = this.loadCart();
    const itemIds = cart.items.flatMap((cartItem) => {
      const itemId = cartItem.item.id;
      const itemCount = cartItem.itemCount;
      return Array.from({length: itemCount}, () => itemId);
    });

    const payload = {
      items: itemIds,
      tableNumber: table
    };

    return this.http.post<any>(`${this.baseURL}/add`, payload, {headers});
  }

  addCount(item: CartItem) {
    let cart = this.loadCart();
    const itemIndex = cart.items.findIndex(
      (cartItem) => cartItem.item && cartItem.item.id == item.item.id
    );

    cart.items[itemIndex].itemCount += 1;
    this.saveCart(cart);
  }

  removeCount(item: CartItem) {
    let cart = this.loadCart();
    const itemIndex = cart.items.findIndex(
      (cartItem) => cartItem.item && cartItem.item.id == item.item.id
    );

    if (cart.items[itemIndex].itemCount == 1) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].itemCount -= 1;
    }
    this.saveCart(cart);
  }
}
