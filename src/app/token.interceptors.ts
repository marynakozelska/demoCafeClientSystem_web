import {Injectable} from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS, HttpHeaders,
} from "@angular/common/http";
import {AuthService} from './services/auth.service';
import {Observable, throwError, BehaviorSubject} from "rxjs";
import {catchError, filter, take, switchMap} from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    console.log('Interceptor called');

    let httpRequest = request;
    const token = this.authService.getAccessToken();
    if (token != null) {
      httpRequest = this.addTokenHeader(request, token);
    }

    return next
      .handle(httpRequest)
      .pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          return this.handle401Error(httpRequest, next);
        }

        return throwError(error);
      }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.authService.getAccessToken();

      if (token)
        return this.authService
          .refreshToken()
          .pipe(
            switchMap((token: any) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(token.token);

              return next.handle(this.addTokenHeader(request, token.token));
            }),
            catchError((err) => {
              console.log(err)

              this.isRefreshing = false;
              this.authService.logout();
              return throwError(err);
            })
          );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('isRefreshToken', 'true');

    return request.clone({headers: headers});
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
];
