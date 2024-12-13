import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  setToken(token: string): void {
    window.localStorage['jwtToken'] = token;
  }

  getUsername(): string {
    return window.localStorage['username'];
  }

  setUsername(username: string): void {
    window.localStorage['username'] = username;
  }

  destroyToken(): void {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('username');
  }
}
