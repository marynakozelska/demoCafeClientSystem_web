import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../entities/user";
import {Router} from "@angular/router";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {Order} from "../entities/order";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = "http://localhost:8080";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
              public router: Router) {
  }

  public auth(user: User) {
    return this.http.post<any>(`${this.baseURL}/auth/authenticate`, user);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public setAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public removeAccessToken(): void {
    localStorage.removeItem('access_token');
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  public login(user: User): Observable<any> {
    return this.auth(user).pipe(
      map((response) => {
        this.setAccessToken(response.token);
        localStorage.setItem('role', response.role);
        return response;
      }),
      catchError(() => {
        return throwError("Authentication failed");
      })
    );
  }

  public refreshToken() {
    console.log("Refreshing...")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.getAccessToken())
      .set('isRefreshToken', 'true');

    return this.http.post<any>(
      `${this.baseURL}/auth/refresh-token`,
      {},
      {headers: headers}
    ).pipe(
      tap((token) => {
        this.setAccessToken(token.token);
      }),
      catchError(() => {
        this.logout();
        return throwError("Authentication failed");
      })
    );
  }

  public logout(): void {
    this.removeAccessToken();
    localStorage.removeItem('role');

    console.log("Logout successful!");
    this.router.navigateByUrl('auth/authenticate');
  }

  private getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  public isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  public getActiveCustomerOrders() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Order[]>(`http://localhost:8080/order`, {headers});
  }

  public getPreviousOrders() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Order[]>(`http://localhost:8080/order/previous`, {headers});

  }
}
