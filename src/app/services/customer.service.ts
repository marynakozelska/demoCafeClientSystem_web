import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../entities/user";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseURL = "http://localhost:8080/profile";

  user: User;

  constructor(private http: HttpClient) {
  }

  getUser() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(token);

    return this.http.get<User>(`${this.baseURL}`, {headers});
  }

}
