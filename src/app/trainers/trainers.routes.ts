import { Routes } from '@angular/router';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { TrainerFormComponent } from './trainer-form/trainer-form.component';

export const trainerRotes: Routes = [
  {
    path: '',
    component: TrainerListComponent,
  },
  {
    path: 'add',
    component: TrainerFormComponent,
  },
  {
    path: 'edit/:id',
    component: TrainerFormComponent,
  },
];
