import { Component, inject, OnInit } from '@angular/core';
import { CandidateService } from '../candidates.service';
import { ResponseCandidate } from '../candidates.model';
import { CandidateComponent } from './candidate/candidate.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [CandidateComponent, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css',
})
export class CandidateListComponent implements OnInit {
  private _candidateService = inject(CandidateService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  private _authService = inject(AuthService);
  isLoading: boolean = true;
  candidates: ResponseCandidate[] = [];
  totalPages!: number;
  totalData!: number;
  errorMessage?: string;
  hasAdmin?: boolean;

  filterForm = new FormGroup({
    fullName: new FormControl<string | null>(null),
    bootcampId: new FormControl<string | null>(null),
    pageNumber: new FormControl<number>(1),
    pageSize: new FormControl<number>(5),
  });

  ngOnInit(): void {
    this.loadCandidateWithParams();
    this._authService.hasAdmin$.subscribe({
      next: (result) => {
        this.hasAdmin = result;
        console.log(result);
      },
      error: (err) => {
        console.log('Error: ', err);
      },
    });
    // this.loadOnFilterChange();
  }

  onSubmit() {
    const queryParams = {
      fullName: this.filterForm.value.fullName?.trim() || null,
      bootcampId: this.filterForm.value.bootcampId,
      // dibuat seperti ini agar jika pencarian dilakukan di pagenumber berapapun tetap bisa karena dia kembali ke pagenumber 1
      pageNumber: 1,
      // pageNumber: this.filterForm.value.pageNumber || 1,
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

  private loadCandidate() {
    this.isLoading = true;
    const queryParams = this.route.snapshot.queryParams;
    console.log(queryParams);
    
    this._candidateService
      .getAllCandidate(queryParams)
      .subscribe((candidate) => {
        this.candidates = candidate.data;
        this.totalPages = candidate.pagination.totalPage;
        this.totalData = candidate.pagination.totalData;
        this.isLoading = false;
      });
  }

  private loadCandidateWithParams() {
    this.route.queryParams.subscribe((params) => {
      this.filterForm.patchValue(
        {
          fullName: params['fullName'] || null,
          bootcampId: params['bootcampId'] || null,
          pageNumber: +params['pageNumber'] || 1,
          pageSize: +params['pageSize'] || 5,
        },
        { emitEvent: false }
      );
      this.loadCandidate();
    });
  }

  // dikarenakan pencarian menggunakan button maka tidak perlu menggunakan ini, langsung di onsubmitnya saja, jika tidak menggukana button maka menggunakan ini dan taro di oninit
  // loadOnFilterChange() {
  //   this.isLoading = true;
  //   this.filterForm.valueChanges
  //     .pipe(
  //       debounceTime(1000),
  //       distinctUntilChanged(),
  //       tap((formValue) => {
  //         const queryParams = {
  //           fullName: formValue.fullName?.trim() || null,
  //           bootcampId: formValue.bootcampId,
  //           pageNumber: formValue.pageNumber || 1,
  //           pageSize: formValue.pageSize || 5,
  //         };

  //         this.router.navigate([], {
  //           relativeTo: this.route,
  //           queryParams: queryParams,
  //           queryParamsHandling: 'merge',
  //         });
  //       }),
  //       switchMap((formValue) => {
  //         const filters = {
  //           fullName: formValue.fullName?.trim() || null,
  //           bootcampId: formValue.bootcampId,
  //           pageNumber: formValue.pageNumber,
  //           pageSize: formValue.pageSize,
  //         };

  //         return this._candidateService.getAllCandidate(filters);
  //       })
  //     )
  //     .subscribe({
  //       next: (candidatePage) => {
  //         this.candidates = candidatePage.data;
  //         this.totalPages = candidatePage.pagination.totalPage;
  //         this.isLoading = false;
  //       },
  //       error: (err) => {
  //         console.log("error")
  //         console.log(err)
  //       }
  //     });
  // }

  // onPageChange() {
  //   const pageSize = this.filterForm.value.pageSize;
  //   if (!pageSize || pageSize <= 0 || pageSize >= 6) {
  //     this.filterForm.controls.pageSize.setValue(5);
  //   }
  // }
}
