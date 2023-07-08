import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../entities/user";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseURL = "http://localhost:8080/auth/register";

  constructor(private http: HttpClient) {
  }

  register(user: User) {
    console.log("Service register...")
    return this.http.post(`${this.baseURL}`, user, {responseType: 'text' as 'json'});
  }
}
