import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from './../../environments/environment';
import { TopicsService } from './topics.service';

@Injectable()
export class SubTopicsService {

  baseURL: string = environment.configSettings.baseURL;
  subTopicsList: {title: string, topic: string, desc: string, "_id": string}[] = [];

  constructor(private http: Http,
              private topicsService: TopicsService) {}

  addSubTopic(topic: string,
              subTopic: {title: string, desc: string}) {
    this.http.post(this.baseURL+'/topicsdb' + '/' + topic, subTopic).subscribe(
      (response) => {
        var data = response.json();
        this.subTopicsList.push({
          title: data.title,
          topic: topic,
          desc: data.desc,
          "_id": data["_id"]
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
              topic: topicId,
              desc: dataItem.desc,
              "_id": dataItem["_id"]
            });
        });
    });
  }
}
