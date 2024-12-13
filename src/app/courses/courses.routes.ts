import { Routes } from "@angular/router";
import { CourseFormComponent } from "./course-form/course-form.component";
import { CourseListComponent } from "./course-list/course-list.component";
import { CourseAnnouncementComponent } from "./course-announcement/course-announcement.component";

export const CourseRoutes: Routes = [
    {
        path: '',
        component: CourseFormComponent
    },
    {
        path: 'materi',
        component: CourseFormComponent
    },
    {
        path: 'jadwal',
        component: CourseListComponent
    },
    {
        path: 'selesai',
        component: CourseAnnouncementComponent
    }
]