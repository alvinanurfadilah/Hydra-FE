import { Component, inject, Input, OnInit } from '@angular/core';
import { SkillsService } from '../skills.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SkillInsert, SkillUpdate } from '../skills.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../categories/categories.service';
import { CategoryResponse } from '../../categories/categories.model';

@Component({
  selector: 'app-skill-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './skill-form.component.html',
  styleUrl: './skill-form.component.css',
})
export class SkillFormComponent implements OnInit {
  @Input({ required: true }) id!: string;
  private _skillService = inject(SkillsService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _categoryService = inject(CategoriesService);
  categoryDropdown!: CategoryResponse[];

  form = new FormGroup({
    id: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    name: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    categoryId: new FormControl<number>(0, {
      validators: [Validators.required],
    }),
  });

  skillFormData: SkillUpdate = {
    id: this.id,
    name: '',
    description: '',
    categoryId: 0,
  };

  ngOnInit(): void {
    if (this.id) {
      this._skillService.getByIdSkill(this.id).subscribe({
        next: (skill) => {
          this.form.controls.id.setValue(skill.data.id);
          this.form.controls.name.setValue(skill.data.name);
          this.form.controls.description.setValue(skill.data.description);
          this.form.controls.categoryId.setValue(skill.data.categoryId);
        },
      });
    }

    this._categoryService.getCategory().subscribe({
      next: (cat) => {
        this.categoryDropdown = cat;
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        this.skillFormData.id = this.id;
        this.skillFormData.name = this.form.value.name!;
        this.skillFormData.description = this.form.value.description!;
        this.skillFormData.categoryId = this.form.value.categoryId!;

        this._skillService.updateSkill(this.id, this.skillFormData).subscribe({
          next: (skill) => {
            this._router.navigate(['../../'], { relativeTo: this._route });
          },
        });
      } else {
        this._skillService
          .insertSkill(this.form.value as SkillInsert)
          .subscribe({
            next: () => {
              this._router.navigate(['../'], { relativeTo: this._route });
            },
          });
      }
    }
  }
}
