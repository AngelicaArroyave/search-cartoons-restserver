import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  errorMessage?: string
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private loginService: LoginService) { }

  redirectToSignUp() {
    this.router.navigate(['sign-up'])
  }

  login() {
    if(this.loginForm.invalid) {
      this.errorMessage = 'Error logging in. Please try again'
      return
    }

    const email = this.loginForm.value.email as string // O const email = this.loginForm.value.email ?? ''
    const password = this.loginForm.value.password as string // O const password = this.loginForm.value.password ?? ''

    this.loginService.login(email, password).subscribe({
      next: response => {
        response ?
                  (this.router.navigate(['user']),
                  localStorage.setItem('token', response.token))
                  : this.errorMessage = 'Invalid email or password'
      },
      error: error => {
        console.log('Error in login request', error)
        this.errorMessage = 'Error logging in. Please try again'
      }
    })
  }

  logout() {
    if(!this.loginService.loggedIn()) return

    localStorage.removeItem('token')
    this.router.navigate(['sign-in'])
  }
}
