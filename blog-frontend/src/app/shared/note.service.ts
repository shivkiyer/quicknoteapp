import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { TopicsService } from './topics.service';
import { SubTopicsService } from './sub-topics.service';


@Injectable()
export class NoteService {

  baseURL = 'http://localhost:3000';
  noteList: any[] = [];

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
      })
      .subscribe(
        (response: Response) => {
          var data = response.json();
          this.noteList.push(
            {
              title: data['title'],
              topic: data['topic'],
              subTopic: data['subTopic'],
              '_id': data['_id'],
              contents: data['contents']
            }
          );
        }
      );
  }

  getNotes(topicIndex:number,
            subTopicIndex: number) {
    this.noteList = [];
    if (this.topicsService.topicList.length>0 &&
        this.subTopicsService.subTopicsList.length>0) {
          let topicId = this.topicsService.topicList[topicIndex]['_id'];
          let subTopicId = this.subTopicsService.subTopicsList[subTopicIndex]['_id'];
          this.http.get(this.baseURL + '/notedb' + '/' + topicId + '/' + subTopicId)
            .subscribe(
              (response: Response) => {
                var data = response.json();
                data.forEach((dataItem) => {
                  this.noteList.push({
                    title: dataItem['title'],
                    topic: dataItem['topic'],
                    subTopic: dataItem['subTopic'],
                    '_id': dataItem['_id'],
                    contents: dataItem['contents']
                  });
                });
              }
          );
    }
  }
}
