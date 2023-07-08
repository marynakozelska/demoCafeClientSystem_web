import {Injectable} from '@angular/core';
import {MenuItem} from "../entities/menu-item";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseURL = "http://localhost:8080/menu";

  constructor(private http: HttpClient) {
  }

  public getFullMenu(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseURL}`);
  }
}
