import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TopicsService } from './../../shared/topics.service';
import { SubTopicsService } from './../../shared/sub-topics.service';

@Component({
  selector: 'app-page-tracker',
  templateUrl: './page-tracker.component.html',
  styleUrls: ['./page-tracker.component.css']
})
export class PageTrackerComponent implements OnInit {
  @Input() topicIndex: number;
  @Input() subTopicIndex: number;
  topicTitle: string;
  subTopicTitle: string;
  topicDisplay: string;
  subTopicDisplay: string;
  showTopic = false;
  showSubTopic = false;
  noOfCharacters = 7;

  constructor(private topicsService: TopicsService,
              private subTopicsService: SubTopicsService,
              private router: Router) { }

  ngOnInit() {
    if (window.innerWidth < 500) {
      this.noOfCharacters = 4;
    }
    if (this.topicIndex>-1) {
      this.topicTitle = this.topicsService.topicList[this.topicIndex].title;
      if (this.topicTitle.length > this.noOfCharacters+3) {
        this.topicDisplay = this.topicTitle.slice(0,this.noOfCharacters) + '...';
      } else {
        this.topicDisplay = this.topicTitle;
      }
      this.showTopic = true;
    } else {
      this.showTopic = false;
    }

    if (this.subTopicIndex>-1) {
      this.subTopicTitle = this.subTopicsService.subTopicsList[this.subTopicIndex].title;
      if (this.subTopicTitle.length > this.noOfCharacters+3) {
        this.subTopicDisplay = this.subTopicTitle.slice(0,this.noOfCharacters) + '...';
      } else {
        this.subTopicDisplay = this.subTopicTitle;
      }
      this.showSubTopic = true;
    } else {
      this.showSubTopic = false;
    }
  }

  backToTopic() {
    this.router.navigate(['/topics', this.topicIndex+1]);
  }

  backToSubTopic() {
    this.router.navigate(['/topics', this.topicIndex+1, this.subTopicIndex+1]);
  }

  backToRoot() {
    this.router.navigate(['/topics']);
  }

}
