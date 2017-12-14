import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TopicsService } from './../shared/topics.service';

@Component({
  selector: 'app-sub-topic',
  templateUrl: './sub-topic.component.html',
  styleUrls: ['./sub-topic.component.css']
})
export class SubTopicComponent implements OnInit {

  topicIndex: number;
  topic: {title: string, desc: string} = {
    title: '',
    desc: ''
  };

  constructor(private topicsService: TopicsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.topicIndex = +params['id'] - 1;
        if (this.topicsService.topicList.length > 0 ) {
          this.topic.title = this.topicsService.topicList[this.topicIndex].title;
          this.topic.desc = this.topicsService.topicList[this.topicIndex].desc;
        } else {
          this.router.navigate(['/topics']);
        }
      }
    );
    
  }

}
