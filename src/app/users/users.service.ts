import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../app.config';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GetUser, UserInsert, UserResponse, UserUpdate } from './users.model';
import { ResponseWithPagination } from '../responseWithPagination.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/user`;
  private _userSubject = new BehaviorSubject<UserResponse[]>([]);

  getAllUser(
    params: Params
  ): Observable<ResponseWithPagination<UserResponse[]>> {
    const activtedParams = Object.keys(params)
      .filter((key) => params[key] !== null)
      .reduce<Params>((activeParams, paramName) => {
        activeParams[paramName] = params[paramName];
        return activeParams;
      }, {});

    return this._http.get<ResponseWithPagination<UserResponse[]>>(
      this._apiUrl,
      { params: activtedParams }
    );
  }

  getByUsernameUser(username: string) {
    return this._http.get<GetUser>(`${this._apiUrl}/username`);
  }

  insertUser(userFormData: UserInsert) {
    return this._http.post<UserResponse>(this._apiUrl, userFormData).pipe(
      tap((user) => {
        this._userSubject.next([
          ...this._userSubject.getValue(),
          user,
        ]);
      })
    );
  }

  updateUser(username: string, userFormData: UserUpdate) {
    return this._http.put<UserResponse>(
      `${this._apiUrl}/${username}`,
      userFormData
    );
  }

  deleteUser(username: string) {
    return this._http.delete<UserResponse>(`${this._apiUrl}/${username}`);
  }
}
