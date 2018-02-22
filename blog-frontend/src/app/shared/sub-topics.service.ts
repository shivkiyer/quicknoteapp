import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { environment } from './../../environments/environment';
import { TopicsService } from './topics.service';

@Injectable()
export class SubTopicsService {

  baseURL: string = environment.configSettings.baseURL;
  subTopicsList: {title: string, topic: string, desc: string, "_id": string}[] = [];

  constructor(private http: Http,
              private topicsService: TopicsService) {}

  addSubTopic(topic: string,
              subTopic: {title: string, desc: string}): Observable<any> {
    return this.http.post(this.baseURL +'/topicsdb' + '/' + topic, subTopic)
                    .map(response => response.json());
  }

  getSubTopics(topicId: string): Observable<any> {
    this.subTopicsList = [];
    return this.http.get(this.baseURL + '/topicsdb' + "/" + topicId)
              .map(response => response.json());
  }

  deleteSubTopic(topicIndex: number, subTopicIndex: number): Observable<any> {
    var topicId = this.topicsService.topicList[topicIndex]._id;
    var subTopicId = this.subTopicsList[subTopicIndex]._id;
    return this.http.delete(this.baseURL + '/topicsdb/' + topicId + '/' + subTopicId)
        .map(
          (response) => {
            this.subTopicsList.splice(subTopicIndex, 1);
            return;
          }
        );
  }

  changeOldSubTopic(topicId: string, subTopicIndex: number, subTopicData: any): Observable<any> {
    var subTopicId = this.subTopicsList[subTopicIndex]._id;
    return this.http.patch(this.baseURL + '/topicsdb/' + topicId + '/' + subTopicId, subTopicData)
        .map(
          () => {
            this.subTopicsList[subTopicIndex].title = subTopicData.title;
            this.subTopicsList[subTopicIndex].desc = subTopicData.desc;
            return;
          }
        )
  }

}
