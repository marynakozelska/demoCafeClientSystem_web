import {Component} from '@angular/core';
import {MenuItem} from "../../entities/menu-item";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  topDishes: MenuItem[];

  constructor(private service: MenuService) {
  }

  ngOnInit() {
    this.getTopDishes();
  }

  private getTopDishes() {
    this.service.getTopDishes().subscribe(
      (data: MenuItem[]) => {
        this.topDishes = data;
      });
  }

}
