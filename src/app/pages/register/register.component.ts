import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private router: Router,
    private auth: AuthService,
    private api: ApiService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(): FormGroup {
    return this._formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  createUser() {
    this.api.register(this.registerForm.getRawValue())
      .subscribe(
        (response) => {
          this.auth.signInUser(response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          // this.alertService.error(error);
        });
  }
}
