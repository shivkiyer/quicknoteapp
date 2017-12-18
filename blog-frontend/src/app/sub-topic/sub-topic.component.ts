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
  topic: {title: string, desc: string} = {
    title: '',
    desc: ''
  };
  formSubmitted: boolean = true;
  subTopicsList: {title: string, desc: string, "_id": string}[] = [];

  constructor(private topicsService: TopicsService,
              private router: Router,
              private route: ActivatedRoute,
              private subTopicsService: SubTopicsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.topicIndex = +params['id'] - 1;
        if (this.topicsService.topicList.length > 0 ) {
          this.topic.title = this.topicsService.topicList[this.topicIndex].title;
          this.topic.desc = this.topicsService.topicList[this.topicIndex].desc;
          this.subTopicsService.getSubTopics(this.topicsService.topicList[this.topicIndex]["_id"]);
        } else {
          this.router.navigate(['/topics']);
        }
      }
    );
    this.subTopicsList = this.subTopicsService.subTopicsList;
    this.formSubmitted = true;
    this.subTopicOnDisplay = -1;
  }

  displaySubTopic(subTopicIndex: number) {
    this.subTopicOnDisplay = subTopicIndex;
  }

}
