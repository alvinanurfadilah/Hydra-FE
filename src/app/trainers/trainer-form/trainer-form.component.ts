import { Component, inject, Input, OnInit } from '@angular/core';
import { TrainersService } from '../trainers.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TrainerInsert, TrainerUpdate, User } from '../trainers.model';

@Component({
  selector: 'app-trainer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trainer-form.component.html',
  styleUrl: './trainer-form.component.css',
})
export class TrainerFormComponent implements OnInit {
  @Input({ required: true }) id!: number;
  private _trainerService = inject(TrainersService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  getAllUser!: User[];

  form = new FormGroup({
    username: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    firstName: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    birthDate: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    gender: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    isAvailable: new FormControl<number>(0),
    isActive: new FormControl<number>(0),
  });

  trainerFormData: TrainerUpdate = {
    id: this.id,
    username: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    phoneNumber: '',
    isAvailable: 0,
    isActive: 0,
  };

  ngOnInit(): void {
    this._trainerService.getAllUser().subscribe({
      next: (user) => {
        this.getAllUser = user;
      },
    });

    if (this.id) {
      this._trainerService.getByIdTrainer(this.id).subscribe({
        next: (trainer) => {
          console.log(trainer.data);

          this.form.controls.username.setValue(trainer.data.username);
          this.form.controls.firstName.setValue(trainer.data.firstName);
          this.form.controls.lastName.setValue(trainer.data.lastName);
          this.form.controls.birthDate.setValue(trainer.data.birthDate.split('T')[0]);
          this.form.controls.gender.setValue(trainer.data.gender);
          this.form.controls.phoneNumber.setValue(trainer.data.phoneNumber);
          this.form.controls.isAvailable.setValue(trainer.data.isAvailable);
          this.form.controls.isActive.setValue(trainer.data.isActive);
        },
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        this.trainerFormData.id = this.id;
        this.trainerFormData.username = this.form.value.username!;
        this.trainerFormData.firstName = this.form.value.firstName!;
        this.trainerFormData.lastName = this.form.value.lastName!;
        this.trainerFormData.birthDate = this.form.value.birthDate!;
        this.trainerFormData.gender = this.form.value.gender!;
        this.trainerFormData.phoneNumber = this.form.value.phoneNumber!;
        this.trainerFormData.isAvailable = this.form.value.isAvailable!;
        this.trainerFormData.isActive = this.form.value.isActive!;

        this._trainerService
          .updateTrainer(this.id, this.trainerFormData)
          .subscribe({
            next: (trainer) => {
              this._router.navigate(['../../'], { relativeTo: this._route });
            },
          });
      } else {
        this._trainerService
          .insertTrainer(this.form.value as TrainerInsert)
          .subscribe({
            next: () => {
              this._router.navigate(['../'], { relativeTo: this._route });
            },
          });
      }
    }
  }
}
