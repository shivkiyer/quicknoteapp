import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SubTopicsService {

  baseURL = 'http://localhost:3000';
  subTopicsList: {title: string, desc: string, "_id": string}[] = [];

  constructor(private http: Http) {}

  addSubTopic(topic: {title: string, desc: string},
              subTopic: {title: string, desc: string}) {
    this.http.post(this.baseURL+'/subtopicsdb', {
      topic,
      subTopic
    }).subscribe(
      (response) => {
        var data = response.json();
        data.forEach((dataItem) => {
          this.subTopicsList.push({
            title: dataItem.title,
            desc: dataItem.desc,
            "_id": dataItem["_id"]
          })
        });
      }
    );
  }

  getSubTopics(topicId: string) {
    this.subTopicsList = [];
    this.http.get(this.baseURL + '/topicsdb' + "/" + topicId)
      .subscribe(
        (response) => {
          var data = response.json();
          data.forEach((dataItem) => {
            this.subTopicsList.push({
              title: dataItem.title,
              desc: dataItem.desc,
              "_id": dataItem["_id"]
            });
        });
    });
  }
}
