import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkillsService } from '../skills.service';
import { SkillResponse } from '../skills.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryResponse } from '../../categories/categories.model';
import { CategoriesService } from '../../categories/categories.service';
import { SkillComponent } from './skill/skill.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [ReactiveFormsModule, SkillComponent, RouterLink, CommonModule],
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.css',
})
export class SkillListComponent implements OnInit {
  route = inject(ActivatedRoute);
  isLoading: boolean = true;
  private _skillService = inject(SkillsService);
  skills: SkillResponse[] = [];
  totalPages!: number;
  totalData!: number;
  router = inject(Router);
  errorMessage?: string;
  categoryDropdown!: CategoryResponse[];
  private _categoryService = inject(CategoriesService);

  filterForm = new FormGroup({
    categoryId: new FormControl<number>(0),
    pageNumber: new FormControl<number>(1),
    pageSize: new FormControl<number>(5),
  });

  ngOnInit(): void {
    this.loadSkillWithParams();

    this._categoryService.getCategory().subscribe({
      next: (cat) => {
        this.categoryDropdown = cat;
      },
    });
  }

  onSubmit() {
    const queryParams = {
      categoryId: this.filterForm.value.categoryId || 0,
      pageNumber: 1,
      pageSize: this.filterForm.value.pageSize || 5,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });

    const pageSize = this.filterForm.value.pageSize;
    if (!pageSize || pageSize <= 0 || pageSize >= 6) {
      this.filterForm.controls.pageSize.setValue(5);
    }
  }

  loadSkill() {
    this.isLoading = true;
    const queryParams = this.route.snapshot.queryParams;

    this._skillService.getAllSkill(queryParams).subscribe((skill) => {
      this.skills = skill.data;
      this.totalPages = skill.pagination.totalPage;
      this.totalData = skill.pagination.totalData;
      this.isLoading = false;
    });
  }

  loadSkillWithParams() {
    this.route.queryParams.subscribe((params) => {
      this.filterForm.patchValue(
        {
          categoryId: params['categoryId'] || 0,
          pageNumber: +params['pageNumber'] || 1,
          pageSize: +params['pageSize'] || 5,
        },
        { emitEvent: false }
      );
      this.loadSkill();
    });
  }
}
