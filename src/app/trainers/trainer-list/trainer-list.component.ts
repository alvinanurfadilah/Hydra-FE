import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TrainersService } from '../trainers.service';
import { TrainerResponse } from '../trainers.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TrainerComponent } from './trainer/trainer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trainer-list',
  standalone: true,
  imports: [ReactiveFormsModule, TrainerComponent, RouterLink, CommonModule],
  templateUrl: './trainer-list.component.html',
  styleUrl: './trainer-list.component.css',
})
export class TrainerListComponent implements OnInit{
  route = inject(ActivatedRoute);
  isLoading: boolean = true;
  private _trianerService = inject(TrainersService);
  trainers: TrainerResponse[] = [];
  totalPages!: number;
  totalData!: number;
  router = inject(Router);
  errorMessage?: string;

  filterForm = new FormGroup({
    fullName: new FormControl<string>(''),
    pageNumber: new FormControl<number>(1),
    pageSize: new FormControl<number>(5),
  });

  ngOnInit(): void {
    this.loadSkillWithParams();
  }

  onSubmit() {
    const queryParams = {
      fullName: this.filterForm.value.fullName || null,
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

  loadTrainer() {
    this.isLoading = true;
    const queryParams = this.route.snapshot.queryParams;

    this._trianerService.getAllTrainer(queryParams).subscribe((trainer) => {
      this.trainers = trainer.data;
      this.totalPages = trainer.pagination.totalPage;
      this.totalData = trainer.pagination.totalData;
      this.isLoading = false;
    });
  }

  loadSkillWithParams() {
    this.route.queryParams.subscribe((params) => {
      this.filterForm.patchValue(
        {
          fullName: params['fullName'] || null,
          pageNumber: +params['pageNumber'] || 1,
          pageSize: +params['pageSize'] || 5,
        },
        { emitEvent: false }
      );
      this.loadTrainer();
    });
  }
}
