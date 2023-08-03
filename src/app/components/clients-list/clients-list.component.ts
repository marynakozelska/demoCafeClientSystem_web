import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../entities/user";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent {
  clients: User[];

  constructor(private service: UserService) {

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers() {
    this.service
      .getAllUsers()
      .subscribe(response => {
        this.clients = response;
      });
  }

}
