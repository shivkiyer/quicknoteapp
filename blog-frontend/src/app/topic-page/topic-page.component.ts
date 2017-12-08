import { Component, OnInit } from '@angular/core';

import { TopicsService } from '../shared/topics.service';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent implements OnInit {

  displaySub = false;
  newTopic = false;

  topicList:Array<any>;

  constructor(private topicsService: TopicsService) { }

  ngOnInit() {
    this.topicList = this.topicsService.topicList;
  }

  viewTopics() {
    // this.topicList = ["a", "b", "c"];
    this.displaySub = true;
  }

  addNewTopic() {
    this.newTopic = true;
  }
}
