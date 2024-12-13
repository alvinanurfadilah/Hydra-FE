import { Component, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { CourseResponse, EditCourse } from '../../courses.model';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tr[app-course]',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit {
  @Input({ required: true }) course!: CourseResponse;
  private _courseService = inject(CourseService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  dateFormat = 'MMM, dd yyyy';
  evaluationDate!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  form = new FormGroup({
    id: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    progress: new FormControl<number>(0),
    evaluationDate: new FormControl<Date>(new Date()),
  });

  ngOnInit() {
    if (this.course.evaluationDate != null) {
      this.evaluationDate = this.course.evaluationDate;
    } else {
      this.evaluationDate = 'N/A';
    }
  }

  openModal() {
    const modal = this.el.nativeElement.querySelector('.modal');
    this.renderer.setStyle(modal, 'display', 'flex');
  }

  onSubmit() {
    this.form.value.id = this.course.id;
    var id = this.course.id.replaceAll('/', '%2F');

    this._courseService.editCourse(id, this.form.value as EditCourse).subscribe({
      next: () => {
        this._router.navigate(['../'], { relativeTo: this._route }); 
      }
    })
  }
}
