import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from './../../environments/environment';
import { TopicsService } from './topics.service';

@Injectable()
export class SubTopicsService {

  baseURL: string = environment.configSettings.baseURL;
  subTopicsList: {title: string, desc: string, "_id": string}[] = [];

  constructor(private http: Http,
              private topicsService: TopicsService) {}

  addSubTopic(topic: {title: string, desc: string},
              subTopic: {title: string, desc: string}) {
    let topicId;
    this.topicsService.topicList.forEach((item) => {
      if ((item.title === topic.title) && (item.desc === topic.desc)) {
        topicId = item._id;
      }
    });
    this.http.post(this.baseURL+'/topicsdb' + '/' + topicId, subTopic).subscribe(
      (response) => {
        var data = response.json();
        this.subTopicsList.push({
          title: data.title,
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
              desc: dataItem.desc,
              "_id": dataItem["_id"]
            });
        });
    });
  }
}
