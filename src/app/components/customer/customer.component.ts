import {Component} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {User} from "../../entities/user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  message: string;
  userData: User;

  constructor(public router: Router,
              private service: CustomerService,
              private authService: AuthService) {
    if (!authService.isAuthenticated()) {
      this.router.navigate(['auth/authenticate']);
    }
    this.getInfo();
  }

  public getInfo(): void {
    this.service.getUser()
      .subscribe((response: User) => {
        this.userData = response;
        console.log(this.userData);
      });
  }

  public logout(): void {
    this.authService.logout();
  }
}
