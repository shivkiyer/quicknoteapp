import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  userForm: FormGroup;

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.userForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });
  }

}
