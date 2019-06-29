import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from '../../services/navbar.service';
import { UserRegister } from '../../DTOs/users/userRegister';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  errors: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private navbar: NavbarService) { }

  ngOnInit() {
    this.navbar.show();
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmedPassword: ['', [Validators.required]],
      //passwords: this.formBuilder.group({
      //  password: ['', [Validators.required]],
      //  confirmedPassword: ['', [Validators.required]],
      //}, {validator: this.passwordConfirming}),
    });
  }

  //get form() { return this.registerForm.controls; }
  //get passwords(): any { return this.registerForm.controls.passwords; }

  //passwordConfirming(c: AbstractControl): { invalid: boolean } {
  //  if (c.get('password').value !== c.get('confirmedPassword').value) {
  //      return {invalid: true};
  //  }
  //}

  //arePasswordsEqual(): boolean {
  //  return this.passwords.controls.password.value !== this.passwords.controls.confirmedPassword.value && this.passwords.controls.password.touched && this.passwords.controls.confirmedPassword.touched;
  //}

  register(firstName, lastName, username, email, password) {

    if (this.registerForm.errors != null) {
      return;
    }

    let user: UserRegister = {
      firstName,
      lastName,
      username,
      email,
      password
    };

    this.authService.register(user)
      .subscribe(
        u => {
          this.toastr.success('Account created successfully!', '', {
            positionClass: 'toast-bottom-right',
          });
          this.router.navigate(['login']);
        },
        error => {
          this.errors = [error];
        });
  }

}
