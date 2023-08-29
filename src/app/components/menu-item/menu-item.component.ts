import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuService} from "../../services/menu.service";
import {MenuItem} from "../../entities/menu-item";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  id: number;
  item: MenuItem;
  categories: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: MenuService) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.id != undefined) this.getItem();

    this.item = new MenuItem();
    this.item.category = '';
    this.fetchCategories();
  }


  private getItem() {
    this.service
      .getMenuItem(this.id)
      .subscribe(
        data => {
          this.item = data;
        });
  }

  saveItem() {
    this.service.saveMenuItem(this.item).subscribe(
      data => {
        this.item = data;
        this.router.navigate(['/menu']);
      },
    )
  }

  fetchCategories() {
    this.service.getCategories().subscribe(
      (data: string[]) => {
        this.categories = data;
      });
  }

  isCreating() {
    return this.id == undefined;
  }

}
