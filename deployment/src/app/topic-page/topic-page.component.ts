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

  topicList: {title: string, desc: string}[];
  topicOnDisplay: number = -1;

  constructor(private topicsService: TopicsService) { }

  ngOnInit() {
    this.topicsService.getTopicList();
    this.topicList = this.topicsService.topicList;
  }

  viewTopics() {
    this.displaySub = true;
  }

  addNewTopic() {
    this.newTopic = true;
  }

  displayTopic(topicIndex: number) {
    this.topicOnDisplay = topicIndex;
  }
}
