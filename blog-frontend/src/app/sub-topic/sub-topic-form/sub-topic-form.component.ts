import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TopicsService } from './../../shared/topics.service';
import { SubTopicsService } from './../../shared/sub-topics.service';

@Component({
  selector: 'app-sub-topic-form',
  templateUrl: './sub-topic-form.component.html',
  styleUrls: ['./sub-topic-form.component.css']
})
export class SubTopicFormComponent implements OnInit {
  subTopicForm: FormGroup;
  @Input() topicIndex: string;
  topicTitle: string;
  topicId: string;
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private subTopicsService: SubTopicsService,
              private topicsService: TopicsService) {
    this.subTopicForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'desc': new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.topicTitle = this.topicsService.topicList[this.topicIndex].title;
    this.topicId = this.topicsService.topicList[this.topicIndex]["_id"];
  }

  addSubTopic() {
    this.subTopicsService.addSubTopic(this.topicId, this.subTopicForm.value)
          .subscribe(
              (data) => {
                this.subTopicsService.subTopicsList.push({
                  title: data.title,
                  topic: this.topicId,
                  desc: data.desc,
                  "_id": data["_id"]
                  });
                  this.formSubmitted.emit();
              }
          );
  }

  cancelForm() {
    this.formSubmitted.emit();
  }

  resetForm() {
    this.subTopicForm.reset();
  }

}
