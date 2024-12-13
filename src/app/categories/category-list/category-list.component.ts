import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { CategoryResponse } from '../categories.model';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryComponent, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  route = inject(ActivatedRoute);
  isLoading: boolean = true;
  private _categoryService = inject(CategoriesService);
  categories: CategoryResponse[] = [];
  totalPages!: number;
  totalData!: number;
  router = inject(Router);
  errorMessage?: string;

  levelList: string[] = ['Basic', 'Intermediate'];

  filterForm = new FormGroup({
    name: new FormControl<string | null>(null),
    level: new FormControl<string | null>(null),
    pageNumber: new FormControl<number>(1),
    pageSize: new FormControl<number>(5),
  });

  ngOnInit(): void {
    this.loadCategoryWithParams();
  }

  onSubmit() {
    const queryParams = {
      name: this.filterForm.value.name?.trim() || null,
      level: this.filterForm.value.level?.trim() || null,
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

  loadCategory() {
    this.isLoading = true;
    const queryParams = this.route.snapshot.queryParams;

    this._categoryService.getAllCategory(queryParams).subscribe((category) => {
      this.categories = category.data;
      this.totalPages = category.pagination.totalPage;
      this.totalData = category.pagination.totalData;
      this.isLoading = false;
    });
  }

  loadCategoryWithParams() {
    this.route.queryParams.subscribe((params) => {
      this.filterForm.patchValue(
        {
          name: params['name'] || null,
          level: params['level'] || null,
          pageNumber: +params['pageNumber'] || 1,
          pageSize: +params['pageSize'] || 5,
        },
        { emitEvent: false }
      );
      this.loadCategory();
    });
  }
}
