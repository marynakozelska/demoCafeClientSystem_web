import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NavigationEnd, Router} from "@angular/router";
import {AppService} from "./app.service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoCafeClientSystem';

  constructor(private app: AppService,
              private http: HttpClient,
              private router: Router) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const role = localStorage.getItem('role');

        if (role && role !== 'ADMIN' && event.url.includes('/manage')) {
          this.router.navigate(['/']);
        }
      }
    })

  }
}
