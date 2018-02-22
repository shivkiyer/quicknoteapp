import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TopicsService } from './../shared/topics.service';
import { SubTopicsService } from './../shared/sub-topics.service';

@Component({
  selector: 'app-sub-topic',
  templateUrl: './sub-topic.component.html',
  styleUrls: ['./sub-topic.component.css']
})
export class SubTopicComponent implements OnInit {

  topicIndex: number = -1;
  subTopicOnDisplay: number;
  displayPage: boolean = false;
  topicTitle: string;
  topicId: string;
  addNewForm: boolean = false;
  subTopicsList: {title: string, topic: string, desc: string, "_id": string}[] = [];
  deleteError: boolean;
  deleteMessage: string;
  deleteIndex: number;
  modifyStatus: boolean;
  modifyIndex: number;

  constructor(private topicsService: TopicsService,
              private router: Router,
              private route: ActivatedRoute,
              private subTopicsService: SubTopicsService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.displayPage = false;
    this.modifyStatus = false;
    this.modifyIndex = -1;
    this.route.params.subscribe(
      (params: Params) => {
        this.topicIndex = +params['id'] - 1;
        if (this.topicsService.topicList.length > 0 ) {
          this.topicTitle = this.topicsService.topicList[this.topicIndex].title;
          this.topicId = this.topicsService.topicList[this.topicIndex]["_id"];
          this.subTopicsService.getSubTopics(this.topicId)
                .subscribe(
                  (data) => {
                    data.forEach((dataItem) => {
                      this.subTopicsService.subTopicsList.push({
                        title: dataItem.title,
                        topic: this.topicId,
                        desc: dataItem.desc,
                        "_id": dataItem["_id"]
                        });
                    });
                    this.displayPage = true;
                  }
                )
        } else {
          this.router.navigate(['/topics']);
        }
      }
    );

    this.subTopicsList = this.subTopicsService.subTopicsList;
    this.addNewForm = false;
    this.subTopicOnDisplay = -1;
  }

  displaySubTopic(subTopicIndex: number) {
    if (this.subTopicOnDisplay===subTopicIndex) {
      this.subTopicOnDisplay = -1;
    } else {
      this.subTopicOnDisplay = subTopicIndex;
    }
  }

  addNewSubTopic() {
    this.addNewForm = true;
    this.subTopicOnDisplay = -1;
  }

  openSubTopic(subTopicIndex: number) {
    const tIndex = this.topicIndex + 1;
    const subTIndex = subTopicIndex + 1;
    this.router.navigate(['/topics/',tIndex, subTIndex]);
  }

  deleteSubTopic(subTopicIndex: number) {
    this.deleteError = false;
    this.subTopicsService.deleteSubTopic(this.topicIndex, subTopicIndex)
        .subscribe(
          () => {
            this.subTopicsList = this.subTopicsService.subTopicsList;
          },
          (error) => {
            this.deleteError = true;
            this.deleteMessage = error.json().message;
            this.deleteIndex = subTopicIndex;
          }
        );
  }

  modifySubTopic(subTopicIndex: number) {
    this.modifyStatus = true;
    this.modifyIndex = subTopicIndex;
    this.addNewForm = true;
    this.subTopicOnDisplay = -1;
  }

}
