import { Routes } from "@angular/router";
import { BootcampListComponent } from "./bootcamp-list/bootcamp-list.component";
import { BootcampFormComponent } from "./bootcamp-form/bootcamp-form.component";
import { CourseFormComponent } from "../courses/course-form/course-form.component";
import { BootcampDetailComponent } from "./bootcamp-detail/bootcamp-detail.component";
import { CourseComponent } from "../courses/course-list/course/course.component";
import { CoursesComponent } from "../courses/courses.component";

export const bootcampRoutes: Routes = [
    {
        path: '',
        component: BootcampListComponent
    },
    {
        path: 'add',
        component: BootcampFormComponent
    },
    {
        path: 'edit/:id',
        component: BootcampFormComponent
    },
    {
        path: 'detail/:id',
        component: BootcampDetailComponent
    },
]