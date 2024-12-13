import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';
import { UserResponse } from '../users.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { UserComponent } from './user/user.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ReactiveFormsModule, UserComponent, RouterLink, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  route = inject(ActivatedRoute);
  isLoading: boolean = true;
  private _userService = inject(UsersService);
  users: UserResponse[] = [];
  totalPages!: number;
  totalData!: number;
  router = inject(Router);
  errorMessage?: string;

  filterForm = new FormGroup({
    username: new FormControl<string>(''),
    pageNumber: new FormControl<number>(1),
    pageSize: new FormControl<number>(5),
  });

  ngOnInit(): void {
    this.loadUserWithParams();
  }

  onSubmit() {
    const queryParams = {
      username: this.filterForm.value.username || null,
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

  loadUser() {
    this.isLoading = true;
    const queryParams = this.route.snapshot.queryParams;

    this._userService.getAllUser(queryParams).subscribe((user) => {
      this.users = user.data;
      this.totalPages = user.pagination.totalPage;
      this.totalData = user.pagination.totalData;
      this.isLoading = false;
    });
  }

  loadUserWithParams() {
    this.route.queryParams.subscribe((params) => {
      this.filterForm.patchValue(
        {
          username: params['username'] || null,
          pageNumber: +params['pageNumber'] || 1,
          pageSize: +params['pageSize'] || 5,
        },
        { emitEvent: false }
      );
      this.loadUser();
    });
  }
}
