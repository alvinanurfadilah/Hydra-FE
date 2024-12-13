import { Component, inject, Input } from '@angular/core';
import { BootcampService } from '../bootcamps.service';
import { Router } from '@angular/router';
import { Bootcamp, ResponseBootcamp } from '../bootcamps.model';

@Component({
  selector: 'app-bootcamp-detail',
  standalone: true,
  imports: [],
  templateUrl: './bootcamp-detail.component.html',
  styleUrl: './bootcamp-detail.component.css',
})
export class BootcampDetailComponent {
  private _bootcampService = inject(BootcampService);
  private _router = inject(Router);
  @Input({ required: true }) id!: number;

  detailBootcamp: ResponseBootcamp = {
    id: this.id,
    description: '',
    startDate: '',
    endDate: '',
    progress: '',

    totalCandidate: 0,
    trainerName: '',
    skillName: ''
  };

  ngOnInit() {
    if (this.id) {
      this._bootcampService.getByIdBootcamp(this.id).subscribe({
        next: (bootcamp) => {
          this.detailBootcamp.description = bootcamp.data.description;
          this.detailBootcamp.startDate = bootcamp.data.startDate.toString()
          .split('T')[0];
          this.detailBootcamp.endDate = bootcamp.data.endDate.toString()
          .split('T')[0];
          this.detailBootcamp.progress = bootcamp.data.progress;

          console.log(bootcamp);
        },
      });
    }
  }

  onBack() {
    this._router.navigate(['bootcamp']);
  }
}
