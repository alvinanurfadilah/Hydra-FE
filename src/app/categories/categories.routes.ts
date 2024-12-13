import { Routes } from "@angular/router";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryFormComponent } from "./category-form/category-form.component";

export const categoryRoutes: Routes = [
    {
        path: '',
        component: CategoryListComponent
    },
    {
        path: 'add',
        component: CategoryFormComponent
    },
    {
        path: 'edit/:id',
        component: CategoryFormComponent
    }
]