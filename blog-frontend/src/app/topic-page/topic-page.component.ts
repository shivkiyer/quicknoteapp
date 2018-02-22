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
  deleteError: boolean;
  deleteMessage: string;
  deleteIndex: number;
  modifyStatus = false;
  modifyIndex = -1;

  topicList: {title: string, desc: string}[] = [];
  topicOnDisplay: number = -1;

  constructor(private topicsService: TopicsService,
              private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.topicsService.getTopicList()
          .subscribe(
            (data) => {
              data.forEach((dataItem) => {
                this.topicsService.topicList.push({
                  title: dataItem.title,
                  desc: dataItem.desc,
                  "_id": dataItem["_id"]
                });
              });
              this.topicList = this.topicsService.topicList;
            },
            (error) => console.log(error)
          );
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

  deleteTopic(topicIndex: number) {
    this.deleteError = false;
    this.topicsService.deleteTopic(topicIndex)
        .subscribe(
          () => {
            this.topicList = this.topicsService.topicList;
          },
          (error) => {
            this.deleteError = true;
            this.deleteMessage = error.json().message;
            this.deleteIndex = topicIndex;
          }
        );
  }

  modifyTopic(topicIndex: number) {
    this.modifyStatus = true;
    this.modifyIndex = topicIndex;
    this.newTopic = true;
    this.topicOnDisplay = -1;
  }

}
