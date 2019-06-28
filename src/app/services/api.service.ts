import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const InterceptorSkipHeader = 'X-Skip-Interceptor';

const API_URL = environment.apiURL;
const client_id = environment.applicationId;
const client_secret = environment.applicationSecret;
const headers = new HttpHeaders().set(InterceptorSkipHeader, '');

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getCountries(): Observable<any> {
    return this.http
      .get(API_URL + '/api/v1/countries', {})
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleError)
      )
  }

  public login(username, password): Observable<any> {
    return this.http
      .post(API_URL + '/oauth/token?grant_type=password', {
        'username': username,
        'password': password,
        'client_id': client_id,
        'client_secret': client_secret
      }, { headers })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleError)
      )
  }

  public refreshAuthToken(refreshToken): Observable<any> {
    return this.http
      .post(API_URL + '/oauth/token?grant_type=refresh_token', {
        'refresh_token': refreshToken,
        'client_id': client_id,
        'client_secret': client_secret
      }, { headers })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          this.handleError(error);
          return Observable.throw(error);
        })
      )
  }

  public register(user): Observable<any> {
    return this.http
      .post(API_URL + '/api/v1/users', {
        'user': {
          "email": user.email,
          "password": user.password
        }
      })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleError)
      )
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    window.alert(error.statusText);
    return Observable.throw(error);
  }
}
