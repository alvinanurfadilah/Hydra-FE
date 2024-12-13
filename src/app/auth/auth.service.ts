import { inject, Injectable } from '@angular/core';
import { DetailUser, Login, User } from './auth.model';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loggedInUserSubject = new BehaviorSubject<User | null>(null);
  private _jwtService = inject(JwtService);
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _apiUrl = environment.apiUrl;

  currentUser$ = this._loggedInUserSubject.asObservable();
  isAuthenticated$ = this.currentUser$.pipe(map((u) => u !== null));
  hasAdmin$ = this.currentUser$.pipe(
    map((u) =>
      u?.roles.some((role) => role.name.toLowerCase() == 'administrator')
    )
  );

  private setAuth(user: User) {
    this._loggedInUserSubject.next(user);
    this._jwtService.setToken(user.token);
    this._jwtService.setUsername(user.username);
  }

  private purgeAuth() {
    this._loggedInUserSubject.next(null);
    this._jwtService.destroyToken();
  }

  login(credentials: Login): Observable<User> {
    return this._http.post<User>(`${this._apiUrl}/auth`, credentials).pipe(
      tap((user) => {
        this.setAuth(user);
      })
    );
  }

  logout() {
    this.purgeAuth();
    this._router.navigate(['login']);
  }

  getCurrentUser() {
    return this._http.get<User>(`${this._apiUrl}/auth`).pipe(
      tap((u) => this.setAuth(u)),
      catchError(() => of(this.logout()))
    );
  }

  getUserByUsername(username: string) {
    return this._http.get<DetailUser>(`${this._apiUrl}/user/${username}`);
  }
}
