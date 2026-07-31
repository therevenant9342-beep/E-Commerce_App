import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
    if (typeof history !== 'undefined' && history.state.requireEmailConfirmation) {
      this.toastr.info('Please confirm your email before you login.', 'Email Confirmation Required');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = null;
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          if (err.status === 403) {
            this.toastr.error('Please confirm your email address before logging in.', 'Access Denied');
          } else {
            this.toastr.error(err.error?.message || 'Invalid email or password.', 'Login Failed');
          }
        }
      });
    }
  }
}