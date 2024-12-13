import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-bootcamps',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './bootcamps.component.html',
  styleUrl: './bootcamps.component.css',
})
export class BootcampsComponent {}
