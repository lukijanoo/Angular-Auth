import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // <-- 1. IMPORT RouterLink
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/services/authentication.service';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink, // <-- 2. ADD RouterLink to the imports array
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  authService = inject(AuthenticationService);
  toastr = inject(ToastrService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email ?? '', password ?? '').subscribe({
      next: () => {
        this.toastr.success('Logged in successfully!');
        this.router.navigate(['/home'], { replaceUrl: true });
      },
      error: (err) => {
        this.toastr.error('Invalid email or password');
      }
    });
  }
}