import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{
  route = inject(ActivatedRoute);
  router = inject(Router);
  hasAdmin?: boolean;
  progress!: number;

  bootcampId!: number;

  setProgress(progress: number) {
    this.router.navigate(['../../'], {
      relativeTo: this.route,
      queryParams: {progress: progress},
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    var queryParams = this.route.snapshot.params['id'];
    this.bootcampId = queryParams;
  }
}
