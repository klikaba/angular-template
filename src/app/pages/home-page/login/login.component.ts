import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() submitForm = new EventEmitter<any>();

  constructor(
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this._formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logIn() {
    this.submitForm.emit(this.loginForm.getRawValue());
  }
}
