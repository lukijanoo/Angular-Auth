import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // <-- IMPORT ToastrService

import { AuthenticationService } from 'src/app/services/authentication.service';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  authService = inject(AuthenticationService);
  toastr = inject(ToastrService); // <-- INJECT ToastrService
  router = inject(Router);

  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  submit() {
    if (!this.signUpForm.valid) {
      return;
    }

    const { name, email, password } = this.signUpForm.value;

    this.authService.signUp(name ?? '', email ?? '', password ?? '').subscribe({
      next: () => {
        this.toastr.success('Congrats! You are all signed up');
        // Apply the same fix here!
        this.router.navigate(['/home'], { replaceUrl: true });
      },
      error: (err) => {
        this.toastr.error('Sign up failed. That email may already be in use.');
      }
    });
  }
}