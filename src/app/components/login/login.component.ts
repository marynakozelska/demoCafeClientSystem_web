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
  isWrongData: boolean;

  constructor(private authService: AuthService, public router: Router) {
    if (!authService.isAuthenticated()) {
      this.user = new User();
    } else {
      this.router.navigate(['/profile']);
    }
  }

  public authenticateUser(): void {
    this.authService.login(this.user).subscribe(
      () => {
        this.isWrongData = false;
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Login error:', error);
        this.isWrongData = true;
      })
  }

}
