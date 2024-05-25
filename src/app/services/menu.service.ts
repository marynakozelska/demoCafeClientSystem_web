import {Injectable} from '@angular/core';
import {MenuItem} from "../entities/menu-item";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseURL = environment.baseUrl + "/menu";

  constructor(private http: HttpClient) {
  }

  public getFullMenu(): Observable<{ [category: string]: MenuItem[] }> {
    return this.http.get<{ [category: string]: MenuItem[] }>(`${this.baseURL}`);
  }

  public getMenuItem(id: number): Observable<MenuItem> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<MenuItem>(`${this.baseURL}/${id}`, {headers});
  }

  public saveMenuItem(item: MenuItem) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<MenuItem>(`${this.baseURL}/manage/add`, item, {headers});
  }

  public getCategories() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<string[]>(`${environment.baseUrl}/categories`, {headers});
  }

  public getTopDishes() {
    return this.http.get<MenuItem[]>(`${this.baseURL}/popular`);
  }
}
