import {Component} from '@angular/core';
import {User} from "../../entities/user";
import {RegistrationService} from "../../services/registration.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User;
  message: any;
  status: any;

  constructor(private registrationService: RegistrationService,
              private authService: AuthService,
              private router: Router) {
    this.user = new User();
  }

  registerUser(): void {
    let response = this.registrationService.register(this.user);
    response.subscribe(
      data => {
        this.message = data;
        this.status = data.status;
      });

    if (this.status == 200) {
      this.router.navigate(['auth/authenticate']);
    }

  }
}
