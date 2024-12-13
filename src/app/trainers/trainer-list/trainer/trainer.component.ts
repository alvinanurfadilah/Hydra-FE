import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrainerResponse } from '../../trainers.model';
import { TrainersService } from '../../trainers.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tr[app-trainer]',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css',
})
export class TrainerComponent {
  @Input({ required: true }) trainer!: TrainerResponse;
  @Output() deleted = new EventEmitter<void>();

  constructor(private trainerService: TrainersService) {}

  onDelete(id: number) {
    const isDelete = window.confirm(
      `Apakah anda yakin ingin menghapus trainer ${this.trainer.username}?`
    );
    if (isDelete) {
      this.trainerService.deleteTrainer(id).subscribe({
        next: () => {
          window.alert('Berhasil menghapus trainer ' + this.trainer.username);
          this.deleted.emit();
        },
        error: (err) => {
          console.log(err);
          window.alert(err.message);
        },
      });
    }
  }
}
