import { inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ResponseWithPagination } from '../responseWithPagination.model';
import {
  CategoryInsert,
  CategoryResponse,
  GetCategory,
} from './categories.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/category`;
  private _categorySubject = new BehaviorSubject<CategoryResponse[]>([]);

  getCategory(): Observable<CategoryResponse[]> {
    return this._http
      .get<CategoryResponse[]>(`${this._apiUrl}/allCategory`)
      .pipe(
        tap((cat) => this._categorySubject.next(cat)),
        catchError((response) => {
          return throwError(() => new Error('gagal mengambil data category'));
        })
      );
  }

  getAllCategory(
    params: Params
  ): Observable<ResponseWithPagination<CategoryResponse[]>> {
    const activatedParams = Object.keys(params)
      .filter((key) => params[key] !== null)
      .reduce<Params>((activeParams, paramName) => {
        activeParams[paramName] = params[paramName];
        return activeParams;
      }, {});

    return this._http
      .get<ResponseWithPagination<CategoryResponse[]>>(this._apiUrl, {
        params: activatedParams,
      })
      .pipe(tap((response) => {}));
  }

  getByIdCategory(id: number) {
    return this._http.get<GetCategory>(`${this._apiUrl}/${id}`);
  }

  insertCategory(categoryFormData: CategoryInsert) {
    return this._http
      .post<CategoryResponse>(this._apiUrl, categoryFormData)
      .pipe(
        tap((category) => {
          this._categorySubject.next([
            ...this._categorySubject.getValue(),
            category,
          ]);
        })
      );
  }

  updateCategory(id: number, categoryFormData: CategoryResponse) {
    return this._http.put<CategoryResponse>(
      `${this._apiUrl}/${id}`,
      categoryFormData
    );
  }

  deleteCategory(id: number) {
    return this._http.delete<CategoryResponse>(`${this._apiUrl}/${id}`);
  }
}
