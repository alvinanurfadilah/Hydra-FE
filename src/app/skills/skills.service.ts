import { inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { ResponseWithPagination } from '../responseWithPagination.model';
import {
  GetSkill,
  SkillInsert,
  SkillResponse,
  SkillUpdate,
} from './skills.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';
import { CategoryResponse } from '../categories/categories.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/skill`;
  private _skillSubject = new BehaviorSubject<SkillResponse[]>([]);

  getAllSkill(
    params: Params
  ): Observable<ResponseWithPagination<SkillResponse[]>> {
    const activatedParams = Object.keys(params)
      .filter((key) => params[key] !== null)
      .reduce<Params>((activeParams, paramName) => {
        activeParams[paramName] = params[paramName];
        return activeParams;
      }, {});

    return this._http.get<ResponseWithPagination<SkillResponse[]>>(
      this._apiUrl,
      {
        params: activatedParams,
      }
    );
  }

  getSkill()
  {
    return this._http.get<SkillResponse[]>(`${this._apiUrl}/allSkill`);
  }

  getByIdSkill(id: string) {
    return this._http.get<GetSkill>(`${this._apiUrl}/${id}`);
  }

  insertSkill(skillFormData: SkillInsert) {
    return this._http.post<SkillResponse>(this._apiUrl, skillFormData).pipe(
      tap((skill) => {
        this._skillSubject.next([...this._skillSubject.getValue(), skill]);
      })
    );
  }

  updateSkill(id: string, skillFormData: SkillUpdate) {
    return this._http.put<SkillResponse>(
      `${this._apiUrl}/${id}`,
      skillFormData
    );
  }

  deleteSkill(id: string) {
    return this._http.delete<SkillResponse>(`${this._apiUrl}/${id}`);
  }
}
