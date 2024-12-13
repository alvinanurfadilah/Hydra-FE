import { Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { UserFormComponent } from "./user-form/user-form.component";

export const userRoutes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'add',
        component: UserFormComponent
    },
    {
        path: 'edit/:username',
        component: UserFormComponent
    }
]