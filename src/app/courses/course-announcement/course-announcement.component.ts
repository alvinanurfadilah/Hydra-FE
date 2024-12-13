import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseService } from '../courses.service';
import { CourseResponse, EditCourse } from '../courses.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BootcampService } from '../../bootcamps/bootcamps.service';
import {
  UpdateBootcamp,
  UpdateBootcampPlan,
} from '../../bootcamps/bootcamps.model';

@Component({
  selector: 'app-course-announcement',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './course-announcement.component.html',
  styleUrl: './course-announcement.component.css',
})
export class CourseAnnouncementComponent implements OnInit {
  private _courseService = inject(CourseService);
  private _bootcampService = inject(BootcampService);
  private _router = inject(Router);
  courses!: CourseResponse[];
  queryParams!: number;
  endBootcamp!: boolean;

  constructor(private route: ActivatedRoute) {}

  form = new FormGroup({
    id: new FormControl<number>(0, {
      validators: [Validators.required],
    }),
    progress: new FormControl<number>(0),
    endDate: new FormControl<Date>(new Date(), {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.parent?.params['id'];

    this._courseService
      .getAllCourseByBootcampId(this.queryParams)
      .subscribe((course) => {
        this.courses = course;

        this.checkBootcampStatus();
      });
  }

  checkBootcampStatus(): void {
    const allCoursesComplete = this.courses.every(
      (course) => course.progress.toString() === 'Active'
    );
    this.endBootcamp = allCoursesComplete;
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.value.id = this.queryParams;
      this.form.value.progress = 3;
      this._bootcampService
        .updateBootcampPlan(this.queryParams, this.form.value as UpdateBootcamp)
        .subscribe({
          next: (course) => {
            this._router.navigate(['../../'], {
              relativeTo: this.route,
            });
          },
        });
    }
  }
}
