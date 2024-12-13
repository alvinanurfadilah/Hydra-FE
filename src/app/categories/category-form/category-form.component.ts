import { Component, inject, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryInsert, CategoryResponse } from '../categories.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent implements OnInit {
  @Input({ required: true }) id!: number;
  private _categoryService = inject(CategoriesService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    level: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });

  categoryFormData: CategoryResponse = {
    id: this.id,
    name: '',
    level: '',
    description: '',
  };

  levelList: string[] = ['Basic', 'Intermediate'];

  ngOnInit(): void {
    if (this.id) {
      this._categoryService.getByIdCategory(this.id).subscribe({
        next: (category) => {
          console.log(category)
          this.form.controls.name.setValue(category.data.name);
          this.form.controls.level.setValue(category.data.level);
          this.form.controls.description.setValue(category.data.description);
        },
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        this.categoryFormData.id = this.id;
        this.categoryFormData.name = this.form.value.name!;
        this.categoryFormData.level = this.form.value.level!;
        this.categoryFormData.description = this.form.value.description!;

        this._categoryService
          .updateCategory(this.id, this.categoryFormData)
          .subscribe({
            next: (category) => {
              this._router.navigate(['../../'], { relativeTo: this._route });
            },
          });
      } else {
        this._categoryService
          .insertCategory(this.form.value as CategoryInsert)
          .subscribe({
            next: () => {
              this._router.navigate(['../'], { relativeTo: this._route });
            },
          });
      }
    }
  }
}
