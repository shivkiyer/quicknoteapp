import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TopicsService } from '../../shared/topics.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<boolean>();
  topicForm: FormGroup;
  formValue = '';
  formDone = false;

  constructor(private topicsService: TopicsService) {
    this.topicForm = new FormGroup({
      'title': new FormControl('Title', Validators.required),
      'desc': new FormControl('A brief description', Validators.required)
    })
  }

  ngOnInit() {
  }

  addNewTopic() {
    this.formValue = JSON.stringify(this.topicForm.value);
    this.topicsService.addNewTopic({title: this.topicForm.value.title,
                                    desc: this.topicForm.value.desc});
    this.formDone = true;
    this.formSubmitted.emit(true);
  }

  clearTopicForm() {
    this.topicForm.reset();
  }

  cancelAddTopic() {
    this.formDone = true;
    this.formSubmitted.emit(true);
  }

}
