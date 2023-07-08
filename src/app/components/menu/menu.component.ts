import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MenuService} from "../../services/menu.service";
import {MenuItem} from "../../entities/menu-item";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menu: MenuItem[];

  constructor(public router: Router,
              private service: MenuService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getFullMenu();
  }

  public getFullMenu(): void {
    this.service.getFullMenu()
      .subscribe((response: MenuItem[]) => {
        this.menu = response;
      });
  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
