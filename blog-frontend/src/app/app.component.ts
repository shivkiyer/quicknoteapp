import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('headerLink') headerLink: ElementRef;
  clickEvent = new EventEmitter<boolean>();
  title = 'app';
  displaySub = false;

  topicList = [];

  viewTopics(event: Event) {
    this.topicList = ["a", "b", "c"];
    console.log(this.headerLink);
    this.clickEvent.emit(true);
    this.displaySub = true;
    console.log('event', event);
  }
}
