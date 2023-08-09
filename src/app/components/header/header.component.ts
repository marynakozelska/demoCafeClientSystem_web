import {Component, Renderer2} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  subscriptionRoute: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.isYellow();
  }

  public isYellow() {
    this.subscriptionRoute = this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {

          if (event.url == '/') {
            this.renderer.setStyle(document.getElementById("header"), 'background-color', '#f8b63b');
          }
        }
      });
  }


  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
