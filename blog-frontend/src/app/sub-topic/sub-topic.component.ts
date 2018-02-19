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

  topicIndex: number;
  subTopicOnDisplay: number;
  topic: string;
  addNewForm: boolean = false;
  subTopicsList: {title: string, topic: string, desc: string, "_id": string}[] = [];

  constructor(private topicsService: TopicsService,
              private router: Router,
              private route: ActivatedRoute,
              private subTopicsService: SubTopicsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.topicIndex = +params['id'] - 1;
        if (this.topicsService.topicList.length > 0 ) {
          this.topic = this.topicsService.topicList[this.topicIndex].title;
          this.subTopicsService.getSubTopics(this.topicsService.topicList[this.topicIndex]["_id"]);
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

}
