import { Routes } from "@angular/router";
import { BootcampListComponent } from "./bootcamp-list/bootcamp-list.component";
import { CourseFormComponent } from "../courses/course-form/course-form.component";
import { CourseListComponent } from "../courses/course-list/course-list.component";
import { CoursesComponent } from "../courses/courses.component";

export const bootcampSubPageRoutes: Routes = [
    {
        path: '',
        component: BootcampListComponent
    },
    {
        path: 'course/:id',
        component: CoursesComponent,
        loadChildren: () =>
            import('../courses/courses.routes').then((mod) => mod.CourseRoutes)
    }
]