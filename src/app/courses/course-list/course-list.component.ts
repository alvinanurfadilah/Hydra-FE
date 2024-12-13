import { Component, inject, Input, OnInit } from '@angular/core';
import { CourseService } from '../courses.service';
import { CourseResponse } from '../courses.model';
import { CourseComponent } from './course/course.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  isLoading: boolean = true;
  private _courseService = inject(CourseService);
  courses!: CourseResponse[];
  queryParams!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.parent?.params['id'];

    this.isLoading = true;
    this._courseService.getAllCourseByBootcampId(this.queryParams).subscribe((course) => {
      this.courses = course;
    });
  }
}
