import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MenuService} from "../../services/menu.service";
import {MenuItem} from "../../entities/menu-item";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menu: { category: string; items: MenuItem[] }[] = [];

  constructor(public router: Router,
              private service: MenuService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getFullMenu();

    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) {
            element.scrollIntoView();
          }
        }
      }
    });

  }

  public getFullMenu(): void {
    this.service.getFullMenu()
      .subscribe(response => {

        // Iterate over the categories in the response
        for (const category in response) {
          if (response.hasOwnProperty(category)) {
            this.menu.push({category, items: response[category]});
          }
        }

      });
  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
