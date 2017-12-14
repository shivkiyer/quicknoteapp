import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SubTopicsService {

  baseURL = 'http://localhost:3000';
  subTopicList: {title: string, desc: string}[] = [];

  constructor(private http: Http) {}

  addSubTopic(topic: {title: string, desc: string},
              subTopic: {title: string, desc: string}) {
    this.subTopicList.push(subTopic);
    console.log(this.subTopicList);
    this.http.post(this.baseURL+'/subtopicsdb', {
      topic,
      subTopic
    }).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}
