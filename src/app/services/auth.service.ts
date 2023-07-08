import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../entities/user";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";

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

  public login(user: User) {
    this.auth(user).subscribe(
      (response) => {
        this.setAccessToken(response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.log("AUTH ERROR: " + error);
        // Обробити помилку аутентифікації
      }
    );
  }

  public logout(): void {
    this.removeAccessToken();
    localStorage.removeItem('role');

    console.log("Logout successful! Token: " + this.getAccessToken());
    this.router.navigateByUrl('auth/authenticate');
  }

  private getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  public isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }
}
