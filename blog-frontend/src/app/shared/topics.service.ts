import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { environment } from './../../environments/environment';

@Injectable()
export class TopicsService {
  baseURL: string = environment.configSettings.baseURL;
  topicList: {title: string, desc: string, _id: string}[] = [];

  constructor(private http: Http) {}

  addNewTopic(topic: {title: string, desc: string}) {
    this.http.post(this.baseURL + '/topicsdb', topic)
      .subscribe(
        (response) => {
          var data = response.json();
          this.topicList.push({
            title: data.title,
            desc: data.desc,
            "_id": data["_id"]
          }
          );
        }
      );
  }

  getTopicList() {
    this.topicList = [];
    this.http.get(this.baseURL + '/topicsdb').subscribe(
      (response) => {
        response.json().forEach((topicItem) => {
          this.topicList.push({
            title: topicItem.title,
            desc: topicItem.desc,
            "_id": topicItem["_id"]
          });
        });
      },
      (error) => console.log(error)
    );
  }

}
