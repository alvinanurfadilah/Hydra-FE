import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserResponse } from '../../users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'tr[app-user]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({ required: true }) user!: UserResponse;
  @Output() deleted = new EventEmitter<void>();

  constructor(private userService: UsersService) {}

  onDelete(username: string) {
    const isDelete = window.confirm(
      `Apakah anda yakin ingin menghapus user ${this.user.username}?`
    );
    if (isDelete) {
      this.userService.deleteUser(username).subscribe({
        next: () => {
          window.alert('Berhasil menghapus user ' + this.user.username);
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
