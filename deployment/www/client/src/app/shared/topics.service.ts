import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TopicsService {
  topicList: {title: string, desc: string}[] = [];

  constructor(private http: Http) {}

  addNewTopic(topic: {title: string, desc: string}) {
    this.topicList.push(topic);
    return this.http.post('/topicsdb', topic);
  }

  getTopicList() {
    this.http.get('/topicsdb').subscribe(
      (response) => {
        // var data = response.json();
        console.log(response.json());
        response.json().forEach((topicItem) => {
          this.topicList.push(topicItem);
        });
      },
      (error) => console.log(error)
    );
  }
}
