export class TopicsService {
  topicList = [];

  addNewTopic(topic: any) {
    this.topicList.push(topic);
  }
}
