import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TopicsService } from './topics.service';
import { SubTopicsService } from './sub-topics.service';


@Injectable()
export class NoteService {

  baseURL = 'http://localhost:3000';

  constructor(private http: Http,
              private topicsService: TopicsService,
              private subTopicsService: SubTopicsService) {}

  addNote(topicIndex: number,
          subTopicIndex: number,
          noteForm: any) {

    var topicTitle = this.topicsService.topicList[topicIndex].title;
    var subTopicTitle = this.subTopicsService.subTopicsList[subTopicIndex].title;

    this.http.post(this.baseURL + '/notedb',
                  {
                    topic: topicTitle,
                    subTopic: subTopicTitle,
                    note: noteForm
                  }).subscribe();
  }
}
