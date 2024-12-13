import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import {
  CourseResponse,
  EditCourse,
  NewCourse,
  SkillResponse,
  TrainerResponse,
} from './courses.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/course`;
  private _apiUrlSkill = `${environment.apiUrl}/skill`;
  private _apiUrlTrainer = `${environment.apiUrl}/trainer`;
  private _courseSubject = new BehaviorSubject<CourseResponse[]>([]);
  private _skillSubject = new BehaviorSubject<SkillResponse[]>([]);
  private _triainerSubject = new BehaviorSubject<TrainerResponse[]>([]);

  getAllCourseByBootcampId(bootcampId: number): Observable<CourseResponse[]> {
    return this._http
      .get<CourseResponse[]>(`${this._apiUrl}/${bootcampId}`)
      .pipe(
        tap((course) => this._courseSubject.next(course)),
        catchError((response) => {
          return throwError(() => new Error('gagal mengambil data course'));
        })
      );
  }

  getAllSkill(): Observable<SkillResponse[]> {
    return this._http.get<SkillResponse[]>(`${this._apiUrlSkill}/allSkill`).pipe(
      tap((skill) => this._skillSubject.next(skill)),
      catchError((response) => {
        return throwError(() => new Error('gagal mengambil data skill'));
      })
    );
  }

  getAllTrainerBySkillId(skillId: string): Observable<TrainerResponse[]> {
    return this._http
      .get<TrainerResponse[]>(`${this._apiUrlTrainer}/${skillId}`)
      .pipe(
        tap((trainer) => this._triainerSubject.next(trainer)),
        catchError((response) => {
          return throwError(() => new Error('gagal mengambil data trainer'));
        })
      );
  }

  newCourse(courseFormData: NewCourse) {
    return this._http.post<CourseResponse>(this._apiUrl, courseFormData).pipe(
      tap((course) => {
        this._courseSubject.next([...this._courseSubject.getValue(), course]);
      })
    );
  }

  editCourse(id: string, courseFormData: EditCourse) {
    return this._http.put<CourseResponse>(
      `${this._apiUrl}/${id}`,
      courseFormData
    );
  }
}
