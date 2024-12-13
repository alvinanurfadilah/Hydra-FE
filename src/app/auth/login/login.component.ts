import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl(''),
  });

  onSubmit() {
    if (this.form.invalid) {
      window.alert('ada data yang tidak valid');
      return;
    }

    this._authService
      .login({
        username: this.form.value.username!,
        password: this.form.value.password!,
      })
      .subscribe({
        next: () => {
          console.log("berhasil login");
          this._router.navigate(['dashboard']);
        },
        error: () => {
          window.alert('gagal login');
        },
      });
  }
}
