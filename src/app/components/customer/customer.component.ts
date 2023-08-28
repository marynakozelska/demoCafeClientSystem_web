import {Component} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {User} from "../../entities/user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Order} from "../../entities/order";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  message: string;
  userData: User = {firstName: '', email: '', password: '', role: ''};
  activeOrders: Order[];
  previousOrders: Order[];

  constructor(public router: Router,
              private service: CustomerService,
              private authService: AuthService) {
    if (!authService.isAuthenticated()) {
      this.router.navigate(['auth/authenticate']);
    }
  }

  ngOnInit() {
    this.getInfo();
    this.getActiveOrders();
    this.getPreviousOrders();
  }

  public getInfo(): void {
    this.service.getUser()
      .subscribe((response: User) => {
        this.userData = response;
      });
  }

  public logout(): void {
    this.authService.logout();
  }

  public getActiveOrders(): void {
    this.authService.getActiveCustomerOrders()
      .subscribe((response: Order[]) => {
        this.activeOrders = response;
      });
  }

  public getPreviousOrders(): void {
    this.authService.getPreviousOrders()
      .subscribe((response: Order[]) => {
        this.previousOrders = response;
      });
  }

  public isActiveOrdersEmpty(): boolean {
    return this.activeOrders.length === 0;
  }

  public isPreviousOrdersEmpty(): boolean {
    return this.previousOrders.length === 0;
  }
}
