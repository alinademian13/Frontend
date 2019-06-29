import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  returnUrl: string;
  errors: string[] = [];

  constructor(private navbar: NavbarService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.navbar.show();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  login(username, password) {
    if (this.loginForm.errors != null) {
      return;
    }

    this.authService.login(username, password)
      .pipe(first())
      .subscribe(
        data => {
          //this.router.navigate([this.returnUrl]);
          this.router.navigate(['/test']);

        },
        response => {
          this.errors = [];

          if (response.error) {
            this.errors.push(response.error.message);
          }
        });
  }
}
