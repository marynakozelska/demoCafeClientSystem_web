import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../entities/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:8080";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
              public router: Router) {
  }

  public getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User[]>(`${this.baseURL}/users/manage`, {headers});
  }

}
