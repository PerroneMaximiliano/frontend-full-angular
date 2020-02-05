import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLoginForm: boolean = true;
  errorMessage: String = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  get lEmail() {
    return this.loginForm.get('email');
  }

  get lPassword() {
    return this.loginForm.get('password');
  }

  get rEmail() {
    return this.registerForm.get('email');
  }

  get rPassword() {
    return this.registerForm.get('password');
  }

  get rName() {
    return this.registerForm.get('name');
  }

  loginForm = this.formBuilder.group({
    email: ['', {
      validators: [Validators.required]
    }],
    password: ['', {
      validators: [Validators.required, Validators.minLength(4)]
    }]
  });

  registerForm = this.formBuilder.group({
    name: ['', {
      validators: [Validators.required]
    }],
    email: ['', {
      validators: [Validators.required]
    }],
    password: ['', {
      validators: [Validators.required, Validators.minLength(4)]
    }]
  });

  signIn() {
    if (!this.loginForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }

    this.userService.login(this.loginForm.value).subscribe(resp => {

      localStorage.setItem('identity', JSON.stringify(resp.user));
      localStorage.setItem('token', resp.token);
      this.router.navigate(['/']);
    }, (error: any) => {
      this.errorMessage = error.err.message;
    });
  }

  signUp() {
    if (!this.registerForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }

    console.log(this.registerForm.value);
  }

  refrescar() {
    this.registerForm.patchValue({
      email: '',
      password: ''
    });
  }

}
