import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private topicsService: TopicsService,
              private router: Router) { }

  ngOnInit() {
    this.topicsService.getTopicList();
    this.topicList = this.topicsService.topicList;
  }

  viewTopics() {
    this.displaySub = !this.displaySub;
  }

  addNewTopic() {
    this.newTopic = true;
    this.topicOnDisplay = -1;
  }

  displayTopic(topicIndex: number) {
    if (this.topicOnDisplay===topicIndex) {
      this.topicOnDisplay = -1;
    } else {
      this.topicOnDisplay = topicIndex;
    }
  }

  openTopic(topicIndex: number) {
    this.router.navigate(['/topics', topicIndex + 1]);
  }
}
