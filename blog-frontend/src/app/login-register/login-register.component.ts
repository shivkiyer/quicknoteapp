import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  userForm: FormGroup;
  registrationForm: FormGroup;

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.userForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });

    this.registrationForm = new FormGroup({
      'username': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl(),
      'repeatpassword': new FormControl()
    });
  }

  onLogin() {

  }

  registerUser() {

  }

}
