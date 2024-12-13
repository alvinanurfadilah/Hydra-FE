import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BootcampService } from '../bootcamps.service';
import { Bootcamp, NewBootcamp } from '../bootcamps.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bootcamp-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bootcamp-form.component.html',
  styleUrl: './bootcamp-form.component.css',
})
export class BootcampFormComponent implements OnInit {
  private _bootcampService = inject(BootcampService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  @Input({ required: true }) id!: number;

  form = new FormGroup({
    description: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    startDate: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    endDate: new FormControl<string | null>(''),
  });

  bootcampFormData: Bootcamp = {
    id: this.id,
    description: '',
    startDate: '',
    endDate: ''
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        this.bootcampFormData.id = this.id;
        this.bootcampFormData.description = this.form.value.description!;
        this.bootcampFormData.startDate = this.form.value.startDate!;
        this.bootcampFormData.endDate = this.form.value.endDate!;

        this._bootcampService
          .editBootcamp(this.id, this.bootcampFormData)
          .subscribe({
            next: (bootcamp) => {
              console.log('berhasil mengubah', bootcamp);
              this._router.navigate(['../../'], { relativeTo: this._route });
            },
          });
      } else {
        this._bootcampService
          .newBootcamp(this.form.value as NewBootcamp)
          .subscribe({
            next: (bootcamp) => {
              console.log('berhasil menambahkan', bootcamp);
              this._router.navigate(['../'], { relativeTo: this._route });
            },
          });
      }
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this._bootcampService.getByIdBootcamp(this.id).subscribe({
        next: (bootcamp) => {
          // this.bootcampFormData.id = bootcamp.id;
          console.log(bootcamp.data.startDate);
          this.form.controls.description.setValue(bootcamp.data.description);
          this.form.controls.startDate.setValue(bootcamp.data.startDate.toString().split('T')[0]);
          this.form.controls.endDate.setValue(bootcamp.data.endDate.toString().split('T')[0]);
        },
      });
    }
  }
}
