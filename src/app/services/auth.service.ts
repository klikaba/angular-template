import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refreshToken: string;
  authToken: string;
  loggedInUser: any;
  constructor(
    private api: ApiService
  ) {
    try {
      const sessionStored = JSON.parse(localStorage.getItem('session'));
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (sessionStored !== null) {
        this.refreshToken = sessionStored.refreshToken;
        this.authToken = sessionStored.authToken;
      }

      if (loggedInUser !== null) {
        this.loggedInUser = loggedInUser;
      }
    } catch (exception) {
      console.warn('no session token stored');
    }
  }

  public isLoggedIn(): boolean {
    return this.authToken && this.authToken.length > 0;
  }

  public refreshAuthToken(): Observable<any> {
    return this.api.refreshAuthToken(this.refreshToken);
  }

  public getToken(): string {
    return this.authToken;
  }

  public signInUser(response) {
    this.authToken = response.access_token;
    this.refreshToken = response.refresh_token;
    this.loggedInUser = response.user_id;
    try {
      localStorage.setItem('session', JSON.stringify({refreshToken: this.refreshToken, authToken: this.authToken}));
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    } catch (exception) {}
  }

  public signOutUser() {
    this.authToken = '';
    this.refreshToken = '';
    this.loggedInUser = null;
    try {
      localStorage.removeItem('session');
      localStorage.removeItem('loggedInUser');
    } catch (exception) {}
  }
}
