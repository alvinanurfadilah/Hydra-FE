import { Routes } from '@angular/router';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillFormComponent } from './skill-form/skill-form.component';

export const skillRoutes: Routes = [
  {
    path: '',
    component: SkillListComponent,
  },
  {
    path: 'add',
    component: SkillFormComponent,
  },
  {
    path: 'edit/:id',
    component: SkillFormComponent,
  },
];
