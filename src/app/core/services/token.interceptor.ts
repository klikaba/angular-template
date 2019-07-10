import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { finalize, switchMap, filter, take, catchError } from 'rxjs/operators';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  refreshingTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = this.getNewRequest(request);
    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    }
    return next.handle(req)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>error).status) {
              case 400:
                return this.handle400Error(error);
              case 401:
                return this.handle401Error(req, next);
            }
          } else {
            return Observable.throw(error);
          }
        })
      )
  }

  getNewRequest(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.auth.getToken()
      }
    });
  }

  handle400Error(error) {
    return Observable.throw(error);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.refreshingTokenSubject.next(null);
      return this.auth.refreshAuthToken()
        .pipe(
          switchMap((newToken: any) => {
            if (newToken.access_token) {
              this.auth.signInUser(newToken);
              this.refreshingTokenSubject.next(newToken.access_token);
              return next.handle(this.getNewRequest(req));
            }
            return this.logoutUser();
          }),
          catchError(error => {
            return this.logoutUser();
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        )
    } else {
      return this.refreshingTokenSubject
        .pipe(
          filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.getNewRequest(req));
          })
        )
    }
  }

  logoutUser() {
    this.auth.signOutUser();
    return Observable.throw('');
  }
}
