import { Component, inject, Input, OnInit } from '@angular/core';
import { CourseService } from '../courses.service';
import { NewCourse, SkillResponse, TrainerResponse } from '../courses.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent implements OnInit {
  private _courseService = inject(CourseService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  skills!: SkillResponse[];
  trainers!: TrainerResponse[];
  skillId!: string;

  bootcampId!: number;

  form = new FormGroup({
    bootcampId: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    skillId: new FormControl<string | null>('', {
      validators: [Validators.required],
    }),
    trainerId: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    startDate: new FormControl<Date>(new Date, {
      validators: [Validators.required],
    }),
    endDate: new FormControl<Date>(new Date, {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this._courseService.getAllSkill().subscribe({
      next: (skill) => {
        this.skills = skill;
      },
    });

    var queryParams = this._route.snapshot.parent?.params['id'];
    this.bootcampId = queryParams;

    this.form.patchValue({ bootcampId: this.bootcampId });
  }

  onChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.skillId = selectElement.value;

    this._courseService.getAllTrainerBySkillId(this.skillId).subscribe({
      next: (trainer) => {
        this.trainers = trainer;
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.valid);
      
      this._courseService.newCourse(this.form.value as NewCourse).subscribe({
        next: (course) => {
          console.log(course);
          this._router.navigate(['../jadwal'], { relativeTo: this._route });
        },
      });
    }
  }
}
