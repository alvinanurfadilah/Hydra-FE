import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkillResponse } from '../../skills.model';
import { SkillsService } from '../../skills.service';

@Component({
  selector: 'tr[app-skill]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent {
  @Input({ required: true }) skill!: SkillResponse;
  @Output() deleted = new EventEmitter<void>();

  constructor(private skillService: SkillsService) {}

  onDelete(id: string) {
    const isDelete = window.confirm(
      `Apakah anda yakin ingin menghapus skill ${this.skill.name}?`
    );
    if (isDelete) {
      this.skillService.deleteSkill(id).subscribe({
        next: () => {
          window.alert('Berhasil menghapus skill ' + this.skill.name);
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
