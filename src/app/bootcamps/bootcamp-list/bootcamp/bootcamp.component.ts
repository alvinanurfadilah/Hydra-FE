import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Bootcamp, ResponseBootcamp, UpdateBootcampPlan } from '../../bootcamps.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { BootcampService } from '../../bootcamps.service';

@Component({
  selector: 'tr[app-bootcamp]',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './bootcamp.component.html',
  styleUrl: './bootcamp.component.css'
})
export class BootcampComponent implements OnInit {
  @Input({ required: true }) bootcamp!: ResponseBootcamp;
  @Input({ required: true}) progress!: number;
  @Output() activated = new EventEmitter<void>();

  private _authService = inject(AuthService);
  private _bootcampService = inject(BootcampService);
  dateFormat = 'MMM, dd yyyy';
  hasAdmin?: boolean;

  updateBootcampPlan: UpdateBootcampPlan = {
    id: 0,
    progress: 0
  }

  ngOnInit(): void {
    this._authService.hasAdmin$.subscribe((result) => (this.hasAdmin = result));
  }

  onActive(id: number)
  {
    this.updateBootcampPlan.id = this.bootcamp.id;
    this.updateBootcampPlan.progress = 2;
    this._bootcampService.updateBootcampPlan(id, this.updateBootcampPlan).subscribe({
      next: () => {
        window.alert('Berhasil mengubah progress menjadi active')
        this.activated.emit();
      },
      error: (err) => {
        console.log(err);
        window.alert(err.message)
      }
    });
  }

  onCancel(id: number)
  {
    this.updateBootcampPlan.id = this.bootcamp.id;
    this.updateBootcampPlan.progress = 0;
    this._bootcampService.updateBootcampPlan(id, this.updateBootcampPlan).subscribe({
      next: () => {
        window.alert('Bootcamp berhasil di cancel')
        this.activated.emit();
      },
      error: (err) => {
        console.log(err);
        window.alert(err.message)
      }
    });
  }
}
