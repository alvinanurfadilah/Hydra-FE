import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  Candidate,
  GetCandidate,
  NewCandidate,
  ResponseCandidate,
} from './candidates.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';
import { Params } from '@angular/router';
import { ResponseWithPagination } from '../responseWithPagination.model';

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private _candidateSubject = new BehaviorSubject<ResponseCandidate[]>([]);
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/candidate`;

  getAllCandidate(
    params: Params
  ): Observable<ResponseWithPagination<ResponseCandidate[]>> {
    const activatedParams = Object.keys(params)
      .filter((key) => params[key] !== null)
      .reduce<Params>((activeParams, paramName) => {
        activeParams[paramName] = params[paramName];
        return activeParams;
      }, {});

    return this._http
      .get<ResponseWithPagination<ResponseCandidate[]>>(this._apiUrl, {
        params: activatedParams,
      })
      .pipe(
        tap((response) => {
          console.log(response);
        })
      );
  }

  getByIdCandidate(id: number) {
    return this._http.get<GetCandidate>(`${this._apiUrl}/${id}`);
  }

  newCandidate(candidateFormData: NewCandidate) {
    return this._http
      .post<ResponseCandidate>(this._apiUrl, candidateFormData)
      .pipe(
        tap((candidate) => {
          this._candidateSubject.next([
            ...this._candidateSubject.getValue(),
            candidate,
          ]);
        })
      );
  }

  editCanidate(id: number, candidateFormData: Candidate) {
    return this._http.put<Candidate>(
      `${this._apiUrl}/${id}`,
      candidateFormData
    );
  }
}
