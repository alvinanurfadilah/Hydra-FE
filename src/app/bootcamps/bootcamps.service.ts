import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import {
  Bootcamp,
  GetBootcamp,
  GetBootcampById,
  NewBootcamp,
  ResponseBootcamp,
  UpdateBootcamp,
  UpdateBootcampPlan,
} from './bootcamps.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';
import { ResponseWithPagination } from '../responseWithPagination.model';
import { Params } from '@angular/router';
import { EditCourse } from '../courses/courses.model';

@Injectable({ providedIn: 'root' })
export class BootcampService {
  private _bootcampSubject = new BehaviorSubject<Bootcamp[]>([]);
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/bootcamp`;

  getAllBootcamps(): Observable<Bootcamp[]> {
    return this._http.get<Bootcamp[]>(`${this._apiUrl}/allBootcamp`).pipe(
      tap((bootcamps) => this._bootcampSubject.next(bootcamps)),
      catchError((reponse) => {
        return throwError(() => new Error('gagal mengambil data bootcamp'));
      })
    );
  }

  getAllBootcampWithParams(
    params: Params
  ): Observable<ResponseWithPagination<ResponseBootcamp[]>> {
    const activatedParams = Object.keys(params)
      .filter((key) => params[key] !== null)
      .reduce<Params>((activeParams, paramName) => {
        activeParams[paramName] = params[paramName];
        return activeParams;
      }, {});

    return this._http.get<ResponseWithPagination<ResponseBootcamp[]>>(
      this._apiUrl,
      {
        params: activatedParams,
      }
    );
  }

  getByIdBootcamp(id: number) {
    return this._http.get<GetBootcampById>(`${this._apiUrl}/${id}`);
  }

  newBootcamp(bootcampFormData: NewBootcamp) {
    return this._http
      .post<ResponseBootcamp>(this._apiUrl, bootcampFormData)
      .pipe(
        tap((bootcamp) => {
          this._bootcampSubject.next([
            ...this._bootcampSubject.getValue(),
            bootcamp,
          ]);
        })
      );
  }

  editBootcamp(id: number, bootcampFormData: Bootcamp) {
    return this._http.put<Bootcamp>(`${this._apiUrl}/${id}`, bootcampFormData);
  }

  getBootcampByProgress(
    params: Params
  ): Observable<ResponseWithPagination<ResponseBootcamp[]>> {
    const activatedParams = Object.keys(params)
      .filter((key) => params[key] !== null)
      .reduce<Params>((activeParams, paramName) => {
        activeParams[paramName] = params[paramName];
        return activeParams;
      }, {});

    return this._http.get<ResponseWithPagination<ResponseBootcamp[]>>(
      `${this._apiUrl}/subpage`,
      {
        params: activatedParams,
      }
    );
  }

  updateBootcampPlan(id: number, updateBootcampPlan: UpdateBootcampPlan)
  {
    return this._http.put<Bootcamp>(`${this._apiUrl}/plan/${id}`, updateBootcampPlan);
  }

  updateBootcamp(id: number, updateBootcampPlan: UpdateBootcamp)
  {
    return this._http.put<Bootcamp>(`${this._apiUrl}/plan/${id}`, updateBootcampPlan);
  }

  updateCourseBootcamp(id: number, updateFormData: EditCourse)
  {
    return this._http.put<Bootcamp>(`${this._apiUrl}/plan/${id}`, updateFormData);
  }
}
