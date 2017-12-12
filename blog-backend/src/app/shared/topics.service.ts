export class TopicsService {
  topicList: {title: string, desc: string}[] = [];

  addNewTopic(topic: {title: string, desc: string}) {
    this.topicList.push(topic);
  }
}
