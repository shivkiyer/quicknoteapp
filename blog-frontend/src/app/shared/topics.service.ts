import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { environment } from './../../environments/environment';

@Injectable()
export class TopicsService {
  baseURL: string = environment.configSettings.baseURL;
  topicList: {title: string, desc: string, _id: string}[] = [];

  constructor(private http: Http) {}

  addNewTopic(topic: {title: string, desc: string}): Observable<any> {
    return this.http.post(this.baseURL + '/topicsdb', topic)
                    .map(response => response.json());
  }

  getTopicList(): Observable<any> {
    this.topicList = [];
    return this.http.get(this.baseURL + '/topicsdb')
                    .map(response => response.json());
  }

  deleteTopic(topicIndex): Observable<any> {
    var topicId = this.topicList[topicIndex]._id;
    return this.http.delete(this.baseURL + '/topicsdb/' + topicId)
      .map(
        (response) => {
          this.topicList.splice(topicIndex, 1);
          return;
        }
      )
  }

  changeOldTopic(topicIndex: number, topicData: any): Observable<any> {
    var topicId = this.topicList[topicIndex]._id;
    return this.http.patch(this.baseURL + '/topicsdb/' + topicId, topicData)
      .map(
        () => {
          this.topicList[topicIndex].title = topicData.title;
          this.topicList[topicIndex].desc = topicData.desc;
          return;
        }
      );
  }

}
