import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BootcampService } from '../bootcamps.service';
import { ResponseBootcamp } from '../bootcamps.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { BootcampComponent } from './bootcamp/bootcamp.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-bootcamp-list',
  standalone: true,
  imports: [ReactiveFormsModule, BootcampComponent, RouterLink, CommonModule],
  templateUrl: './bootcamp-list.component.html',
  styleUrl: './bootcamp-list.component.css',
})
export class BootcampListComponent implements OnInit {
  private _bootcampService = inject(BootcampService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  private _authService = inject(AuthService);
  isLoading: boolean = true;
  bootcamps: ResponseBootcamp[] = [];
  totalPages!: number;
  totalData!: number;
  errorMessage?: string;
  hasAdmin?: boolean;
  progress!: number;

  filterForm = new FormGroup({
    bacthBootcamp: new FormControl<string | null>(null),
    pageNumber: new FormControl<number>(1),
    pageSize: new FormControl<number>(5),
  });

  setProgress(progress: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {progress: progress},
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this._authService.hasAdmin$.subscribe({
      next: (result) => {
        this.hasAdmin = result;
      },
      error: (err) => {
        console.log('Error: ', err);
      },
    });
    this.loadBootcampWithParams();
    // this.loadOnFilterChange();
  }

  onSubmit() {
    const queryParams = {
      id: this.filterForm.value.bacthBootcamp,
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

  private loadBootcamp() {
    this.isLoading = true;
    const queryParams = this.route.snapshot.queryParams;

    var withoutSubpage =
      this._bootcampService.getAllBootcampWithParams(queryParams);

    var withSubpage = this._bootcampService.getBootcampByProgress(
      queryParams
    );

    if (this.hasAdmin == false) {
      withSubpage.subscribe((bootcamp) => {
        this.bootcamps = bootcamp.data;
        this.totalPages = bootcamp.pagination.totalPage;
        this.totalData = bootcamp.pagination.totalData;
        this.isLoading = false;
      });
    } else {
      withoutSubpage.subscribe((bootcamp) => {
        this.bootcamps = bootcamp.data;
        this.totalPages = bootcamp.pagination.totalPage;
        this.totalData = bootcamp.pagination.totalData;
        this.isLoading = false;
      });
    }
  }

  private loadBootcampWithParams() {
    this.route.queryParams.subscribe((params) => {
      this.progress = +params['progress'] || 1;
      this.filterForm.patchValue(
        {
          bacthBootcamp: params['id'] || null,
          pageNumber: +params['pageNumber'] || 1,
          pageSize: +params['pageSize'] || 5,
        },
        { emitEvent: false }
      );
      this.loadBootcamp();
    });
  }

  getColspan(progress: number): number {
    switch (progress) {
      case 1:
        return 6;
        break;
      case 2:
        return 7;
        break;
      case 3:
        return 5;
        break;
      default:
        return 5;
        break;
    }
  }

  // loadOnFilterChange() {
  //   this.isLoading = true;
  //   this.filterForm.valueChanges
  //     .pipe(
  //       debounceTime(1000),
  //       distinctUntilChanged(),
  //       tap((formValue) => {
  //         const queryParams = {
  //           id: formValue.bacthBootcamp,
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
  //           batchBootcamp: formValue.bacthBootcamp,
  //           pageNumber: formValue.pageNumber,
  //           pageSize: formValue.pageSize,
  //         };

  //         return this._bootcampService.getAllBootcampWithParams(filters);
  //       })
  //     )
  //     .subscribe({
  //       next: (bootcampPage) => {
  //         this.bootcamps = bootcampPage.data;
  //         this.totalPages = bootcampPage.pagination.totalPage;
  //         this.isLoading = false;
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  // }

  // onPageChange() {
  //   const pageSize = this.filterForm.value.pageSize;
  //   if (!pageSize || pageSize <= 0 || pageSize >= 6) {
  //     this.filterForm.controls.pageSize.setValue(5);
  //   }
  // }
}
