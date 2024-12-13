import { Routes } from "@angular/router";
import { CandidateListComponent } from "./candidate-list/candidate-list.component";
import { CandidateFormComponent } from "./candidate-form/candidate-form.component";
import { CandidateDetailComponent } from "./candidate-detail/candidate-detail.component";

export const candidateRoutes: Routes = [
    {
        path: '',
        component: CandidateListComponent
    },
    {
        path: 'add',
        component: CandidateFormComponent
    },
    {
        path: 'edit/:id',
        component: CandidateFormComponent
    },
    {
        path: 'detail/:id',
        component: CandidateDetailComponent
    }
]