import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.toastr.success('Registration successful!', 'Success');
          this.router.navigate(['/login'], { 
            state: { requireEmailConfirmation: true } 
          });
        },
        error: (err) => {
          if (err.status === 409) {
            this.toastr.error('This email is already registered. Please try logging in instead.', 'Email Exists');
          } else {
            const errorMessage = err.error?.message || 'An error occurred during registration.';
            this.toastr.error(errorMessage, 'Registration Failed');
          }
          console.error(err);
        }
      });
    }
  }
}