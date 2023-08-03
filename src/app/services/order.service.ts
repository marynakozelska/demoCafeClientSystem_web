import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../entities/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseURL = "http://localhost:8080/order";

  constructor(private http: HttpClient) {
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public getAllOrders(): Observable<Order[]> {
    const headers = this.getHeaders();
    return this.http.get<Order[]>(`${this.baseURL}/manage`, {headers});
  }

  public getNewOrders(): Observable<Order[]> {
    const headers = this.getHeaders();
    return this.http.get<Order[]>(`${this.baseURL}/manage/active/new`, {headers});
  }

  public getInProcessOrders(): Observable<Order[]> {
    const headers = this.getHeaders();
    return this.http.get<Order[]>(`${this.baseURL}/manage/active/process`, {headers});
  }

  public getWaitingPaymentOrders(): Observable<Order[]> {
    const headers = this.getHeaders();
    return this.http.get<Order[]>(`${this.baseURL}/manage/active/waiting-payment`, {headers});
  }

  public update(id: number, status: string): Observable<Order> {
    const headers = this.getHeaders();
    return this.http.post<Order>(`${this.baseURL}/manage/active/${id}`, status, {headers});
  }
}
