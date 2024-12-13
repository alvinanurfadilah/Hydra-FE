import { Router, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { BootcampsComponent } from './bootcamps/bootcamps.component';
import { LoginComponent } from './auth/login/login.component';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { map } from 'rxjs';
import { CoursesComponent } from './courses/courses.component';
import { CategoriesComponent } from './categories/categories.component';
import { SkillsComponent } from './skills/skills.component';
import { TrainersComponent } from './trainers/trainers.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  {
    path: 'login',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).isAuthenticated$.pipe(
          map((isAuthenticated) => {
            if (isAuthenticated) {
              router.navigate(['dashboard']);
              return false;
            } else {
              return true;
            }
          })
        );
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).isAuthenticated$.pipe(
          map((isAuthenticated) => {
            if (!isAuthenticated) {
              router.navigate(['']);
              return false;
            } else {
              return true;
            }
          })
        );
      },
    ],
  },
  {
    path: 'candidate',
    component: CandidatesComponent,
    loadChildren: () =>
      import('./candidates/candidates.routes').then(
        (mod) => mod.candidateRoutes
      ),
  },
  {
    path: 'bootcamp',
    component: BootcampsComponent,
    loadChildren: () =>
      import('./bootcamps/bootcamps.routes').then((mod) => mod.bootcampRoutes),
  },
  {
    path: 'bootcamp/subpage',
    component: BootcampsComponent,
    loadChildren: () =>
      import('./bootcamps/bootcamps-subpage.routes').then(
        (mod) => mod.bootcampSubPageRoutes
      ),
  },
  {
    path: 'category',
    component: CategoriesComponent,
    loadChildren: () =>
      import('./categories/categories.routes').then(
        (mod) => mod.categoryRoutes
      ),
  },
  {
    path: 'skill',
    component: SkillsComponent,
    loadChildren: () =>
      import('./skills/skills.routes').then((mod) => mod.skillRoutes),
  },
  {
    path: 'trainer',
    component: TrainersComponent,
    loadChildren: () =>
      import('./trainers/trainers.routes').then((mod) => mod.trainerRotes),
  },
  {
    path: 'user',
    component: UsersComponent,
    loadChildren: () =>
      import('./users/users.routes').then((mod) => mod.userRoutes),
  },
];
