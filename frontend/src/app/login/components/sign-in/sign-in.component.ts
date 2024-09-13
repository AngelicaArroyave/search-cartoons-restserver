import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  errorMessage?: string;
  loginForm: FormGroup;

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  redirectToSignUp() {
    this.router.navigate(['sign-up']);
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.loginService.login(email, password).subscribe(response => {
        response ? this.router.navigate(['user']) : this.errorMessage = 'Invalid email or password';
      }, error => {
        console.log('Error in login request', error);
        this.errorMessage = 'Error logging in. Please try again';
      })
    }
  }
}
