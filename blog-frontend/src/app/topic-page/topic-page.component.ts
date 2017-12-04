import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent implements OnInit {

  displaySub = false;
  newTopic = false;

  topicList = [];

  constructor() { }

  ngOnInit() {
  }

  viewTopics() {
    // this.topicList = ["a", "b", "c"];
    this.displaySub = true;
  }

  addNewTopic() {
    this.newTopic = true;
  }
}
