import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TopicsService } from './topics.service';
import { SubTopicsService } from './sub-topics.service';
import { environment } from './../../environments/environment';


@Injectable()
export class NoteService {

  baseURL: string = environment.configSettings.baseURL;
  noteList: any[] = [];

  constructor(private http: Http,
              private topicsService: TopicsService,
              private subTopicsService: SubTopicsService) {}

  addNote(topicIndex: number,
          subTopicIndex: number,
          noteForm: any): Observable<any> {

    var topicId = this.topicsService.topicList[topicIndex]._id;
    var subTopicId = this.subTopicsService.subTopicsList[subTopicIndex]._id;

    return this.http.post(this.baseURL + '/topicsdb' + '/' + topicId + '/' + subTopicId, noteForm)
                    .map(response => response.json());
  }

  getNotes(topicIndex:number,
            subTopicIndex: number): Observable<any> {
    this.noteList = [];
    if (this.topicsService.topicList.length>0 &&
        this.subTopicsService.subTopicsList.length>0) {
          let topicId = this.topicsService.topicList[topicIndex]['_id'];
          let subTopicId = this.subTopicsService.subTopicsList[subTopicIndex]['_id'];
          return this.http.get(this.baseURL + '/topicsdb' + '/' + topicId + '/' + subTopicId)
                          .map(response => response.json());
    }
  }

  deleteNote(topicIndex: number,
              subTopicIndex: number,
              noteIndex: number): Observable<any> {
    var topicId = this.topicsService.topicList[topicIndex]._id;
    var subTopicId = this.subTopicsService.subTopicsList[subTopicIndex]._id;
    var noteId = this.noteList[noteIndex]._id;
    return this.http.delete(this.baseURL + '/topicsdb/' + topicId + '/' + subTopicId + '/' + noteId);
  }

  changeOldNote(topicIndex: number, subTopicIndex: number,
                noteIndex: number, noteData: any): Observable<any> {
    var topicId = this.topicsService.topicList[topicIndex]._id;
    var subTopicId = this.subTopicsService.subTopicsList[subTopicIndex]._id;
    var noteId = this.noteList[noteIndex]._id;
    return this.http.patch(this.baseURL + '/topicsdb/' + topicId + '/' + subTopicId + '/' + noteId, noteData)
        .map(
          (response) => {
            let data = response.json();
            this.noteList[noteIndex].title = data.title;
            this.noteList[noteIndex].contents = data.contents;
            return;
          }
        );
  }

}
