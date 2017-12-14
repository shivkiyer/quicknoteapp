import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TopicsService {
  baseURL = 'http://localhost:3000';
  topicList: {title: string, desc: string}[] = [];

  constructor(private http: Http) {}

  addNewTopic(topic: {title: string, desc: string}) {
    this.topicList.push(topic);
    this.http.post(this.baseURL + '/topicsdb', topic)
      .subscribe();
  }

  getTopicList() {
    this.topicList = [];
    this.http.get(this.baseURL + '/topicsdb').subscribe(
      (response) => {
        response.json().forEach((topicItem) => {
          this.topicList.push({
            title: topicItem.title,
            desc: topicItem.desc
          });
        });
      },
      (error) => console.log(error)
    );
  }

}
