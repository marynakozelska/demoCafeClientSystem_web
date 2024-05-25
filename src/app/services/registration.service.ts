import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../entities/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseURL = environment.baseUrl + "/auth/register";

  constructor(private http: HttpClient) {
  }

  register(user: User) {
    console.log("Service register...")
    return this.http.post(`${this.baseURL}`, user, {observe: 'response'});
  }
}
