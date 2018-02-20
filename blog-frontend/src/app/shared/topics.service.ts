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

}
