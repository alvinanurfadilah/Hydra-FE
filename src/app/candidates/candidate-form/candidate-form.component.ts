import { Component, inject, Input } from '@angular/core';
import { Bootcamp } from '../../bootcamps/bootcamps.model';
import { BootcampService } from '../../bootcamps/bootcamps.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Candidate, gendersLabel, NewCandidate } from '../candidates.model';
import { CandidateService } from '../candidates.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-candidate-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.css',
})
export class CandidateFormComponent {
  getAllBootcamps!: Bootcamp[];

  private _candidateService = inject(CandidateService);
  private _bootcampService = inject(BootcampService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  @Input({ required: true }) id!: number;

  form = new FormGroup({
    bootcampClassId: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    firstName: new FormControl<string | null>('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl<string | null>('', {
      validators: [Validators.required],
    }),
    gender: new FormControl<string | null>('', {
      validators: [Validators.required],
    }),
    birthDate: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    address: new FormControl<string | null>('', {
      validators: [Validators.required],
    }),
    domicile: new FormControl<string | null>('', {
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl<string | null>('', {
      validators: [Validators.required],
    }),
  });

  genderDropdown = [...gendersLabel];

  candidateFormData: Candidate = {
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
    this.getBootcamp();

    if (this.id) {
      this._candidateService.getByIdCandidate(this.id).subscribe({
        next: (candidate) => {
          this.form.controls.bootcampClassId.setValue(
            candidate.data.bootcampClassId
          );
          this.form.controls.firstName.setValue(candidate.data.firstName);
          this.form.controls.lastName.setValue(candidate.data.lastName);
          this.form.controls.birthDate.setValue(
            candidate.data.birthDate.toString().split('T')[0]
          );
          this.form.controls.gender.setValue(candidate.data.gender);
          this.form.controls.phoneNumber.setValue(candidate.data.phoneNumber);
          this.form.controls.address.setValue(candidate.data.address);
          this.form.controls.domicile.setValue(candidate.data.domicile);
        },
      });
    }
  }

  private getBootcamp() {
    this._bootcampService.getAllBootcamps().subscribe({
      next: (bootcamp) => {
        this.getAllBootcamps = bootcamp;
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        this.candidateFormData.id = this.id;
        this.candidateFormData.bootcampClassId =
          this.form.value.bootcampClassId!;
        this.candidateFormData.firstName = this.form.value.firstName!;
        this.candidateFormData.lastName = this.form.value.lastName!;
        this.candidateFormData.birthDate = this.form.value.birthDate!;
        this.candidateFormData.gender = this.form.value.gender!;
        this.candidateFormData.phoneNumber = this.form.value.phoneNumber!;
        this.candidateFormData.address = this.form.value.address!;
        this.candidateFormData.domicile = this.form.value.domicile!;

        this._candidateService
          .editCanidate(this.id, this.candidateFormData)
          .subscribe({
            next: (candidate) => {
              console.log('berhasil mengubah', candidate);
              this._router.navigate(['../../'], { relativeTo: this._route });
            },
          });
      } else {
        this._candidateService
          .newCandidate(this.form.value as NewCandidate)
          .subscribe({
            next: (candidate) => {
              // console.log("berhasil menambhakan", candidate);
              this._router.navigate(['../'], { relativeTo: this._route });
            },
          });
      }
    }
  }
}
