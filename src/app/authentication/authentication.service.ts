import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  private sessionStorageTokenKey = 'voyage.token';

  constructor(private router: Router, private location: Location) { }

  getToken(): string {
    // Attempt to retrieve the token from session storage.
    let token = sessionStorage.getItem(this.sessionStorageTokenKey);
    // If not in session storage, attempt to get it from the URL.
    if (!token) {
      token = this.getTokenFromUrl();
      // If it was in the URL, save it to session storage.
      if (token) {
        sessionStorage.setItem(this.sessionStorageTokenKey, token);
      }
    }
    return token;
  }

  goToOauthLogin(): void {
    const RESPONSE_TYPE = 'token';
    const oauthUrl = `${environment.SERVER_URL}/oauth/authorize?client_id=${environment.OAUTH_CLIENT_ID}
&redirect_uri=${encodeURIComponent(environment.OAUTH_REDIRECT_URL)}
&response_type=${RESPONSE_TYPE}
&scope=email`;
    window.location.href = oauthUrl;
  }

  logout(): void {
    sessionStorage.removeItem(this.sessionStorageTokenKey);
    this.router.navigate(['/authentication/login']);
  }

  private getTokenFromUrl(): string {
    const tokenIndex = window.location.href.indexOf('access_token');
    if (tokenIndex === -1) {
      return null;
    }

    const paramLength = 'access_token='.length;
    const token = window.location.href.substring(tokenIndex + paramLength, window.location.href.indexOf('&'));
    this.location.replaceState('');
    return token;
  }

}
