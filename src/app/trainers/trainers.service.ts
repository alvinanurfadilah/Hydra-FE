import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../app.config';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import {
  GetTrainer,
  TrainerInsert,
  TrainerResponse,
  TrainerUpdate,
  User,
} from './trainers.model';
import { Params } from '@angular/router';
import { ResponseWithPagination } from '../responseWithPagination.model';

@Injectable({
  providedIn: 'root',
})
export class TrainersService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/trainer`;
  private _apiUrlUser = `${environment.apiUrl}/user/all`;
  private _trainerSubject = new BehaviorSubject<TrainerResponse[]>([]);
  private _userSubject = new BehaviorSubject<User[]>([]);

  getAllTrainer(
    params: Params
  ): Observable<ResponseWithPagination<TrainerResponse[]>> {
    const activatedParams = Object.keys(params)
      .filter((key) => params[key] !== null)
      .reduce<Params>((activeParams, paramName) => {
        activeParams[paramName] = params[paramName];
        return activeParams;
      }, {});

    return this._http.get<ResponseWithPagination<TrainerResponse[]>>(
      this._apiUrl,
      {
        params: activatedParams,
      }
    );
  }

  getByIdTrainer(id: number) {
    return this._http.get<GetTrainer>(`${this._apiUrl}/getById/${id}`);
  }

  insertTrainer(trainerFormData: TrainerInsert) {
    return this._http.post<TrainerResponse>(this._apiUrl, trainerFormData).pipe(
      tap((trainer) => {
        this._trainerSubject.next([
          ...this._trainerSubject.getValue(),
          trainer,
        ]);
      })
    );
  }

  updateTrainer(id: number, trainerFormData: TrainerUpdate) {
    return this._http.put<TrainerResponse>(
      `${this._apiUrl}/${id}`,
      trainerFormData
    );
  }

  deleteTrainer(id: number) {
    return this._http.delete<TrainerResponse>(`${this._apiUrl}/${id}`);
  }

  getAllUser(): Observable<User[]> {
    return this._http.get<User[]>(`${this._apiUrlUser}`).pipe(
      tap((user) => this._userSubject.next(user)),
      catchError((response) => {
        return throwError(() => new Error('gagal mengambil data user'));
      })
    );
  }
}
