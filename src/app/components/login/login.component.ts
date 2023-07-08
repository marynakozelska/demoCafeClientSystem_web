import {Component} from '@angular/core';
import {User} from "../../entities/user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User;
  message: string;

  constructor(private authService: AuthService, public router: Router) {
    if (!authService.isAuthenticated()) {
      this.user = new User();
    } else {
      this.router.navigate(['/profile']);
    }
  }

  public authenticateUser(): void {
    this.authService.login(this.user);
  }

}
