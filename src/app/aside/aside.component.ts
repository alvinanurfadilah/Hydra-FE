import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { JwtService } from '../auth/jwt.service';
import { AuthService } from '../auth/auth.service';
import { Role, User } from '../auth/auth.model';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit {
  private _jwtService = inject(JwtService);
  private _authService = inject(AuthService);

  username!: string;
  roles!: Role[];
  role!: string;
  hasAdmin?: boolean;

  ngOnInit(): void {
    this.username = this._jwtService.getUsername();

    this._authService.getUserByUsername(this.username).subscribe({
      next: (user) => {
        this.roles = user.roles
      }
    })

    this._authService.hasAdmin$.subscribe({
      next: (result) => {
        this.hasAdmin = result;
      }
    });
  }
}
