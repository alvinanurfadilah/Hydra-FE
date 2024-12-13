import { Component, inject, Input } from '@angular/core';
import { CandidateService } from '../candidates.service';
import { Candidate } from '../candidates.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-candidate-detail',
  standalone: true,
  imports: [],
  templateUrl: './candidate-detail.component.html',
  styleUrl: './candidate-detail.component.css'
})
export class CandidateDetailComponent {
  private _candidateService = inject(CandidateService);
  private _router = inject(Router);
  @Input({ required: true }) id!: number;

  detailCandidate: Candidate = {
    id: this.id,
    bootcampClassId: 0,
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    phoneNumber: '',
    address: '',
    domicile: '',
  };

  ngOnInit() {
    if (this.id) {
      this._candidateService.getByIdCandidate(this.id).subscribe({
        next: (candidate) => {
          this.detailCandidate.bootcampClassId = candidate.data.bootcampClassId;
          this.detailCandidate.firstName = candidate.data.firstName;
          this.detailCandidate.lastName = candidate.data.lastName;
          this.detailCandidate.birthDate = candidate.data.birthDate.toString().split('T')[0];
          this.detailCandidate.gender = candidate.data.gender;
          this.detailCandidate.phoneNumber = candidate.data.phoneNumber;
          this.detailCandidate.address = candidate.data.address;

          console.log(this.detailCandidate);
        },
      });
    }
  }

  onBack()
  {
    this._router.navigate(['candidate']);
  }
}
