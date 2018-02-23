import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  smallWindow: boolean;

  constructor() { }

  ngOnInit() {
    if (window.innerWidth < 467) {
      this.smallWindow = true;
    } else {
      this.smallWindow = false;
    }
  }

}
