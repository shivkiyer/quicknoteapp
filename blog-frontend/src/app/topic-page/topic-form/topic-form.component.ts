import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TopicsService } from '../../shared/topics.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {
  @Input() modifyStatus: boolean;
  @Input() modifyIndex: number;
  @Output() formSubmitted = new EventEmitter<void>();
  topicForm: FormGroup;
  formValue = '';
  formDone = false;

  constructor(private topicsService: TopicsService) {
    this.topicForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'desc': new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    if (this.modifyStatus) {
      this.topicForm = new FormGroup({
        'title': new FormControl(this.topicsService.topicList[this.modifyIndex].title, Validators.required),
        'desc': new FormControl(this.topicsService.topicList[this.modifyIndex].desc, Validators.required)
      });
    }
  }

  addNewTopic() {
    this.formValue = JSON.stringify(this.topicForm.value);
    let newFormValue = {
      title: this.topicForm.value.title,
      desc: this.topicForm.value.desc
    };

    if (this.modifyStatus) {
      this.topicsService.changeOldTopic(this.modifyIndex, newFormValue)
          .subscribe(
            () => {
              this.formDone = true;
              this.formSubmitted.emit();
            }
          );
    } else {
      this.topicsService.addNewTopic(newFormValue)
                .subscribe(
                  (data) => {
                    this.topicsService.topicList.push(
                      {
                        title: data.title,
                        desc: data.desc,
                        "_id": data["_id"]
                      }
                    );
                    this.formDone = true;
                    this.formSubmitted.emit();
                  }
                );
    }
  }

  clearTopicForm() {
    this.topicForm.reset();
  }

  cancelAddTopic() {
    this.formDone = true;
    this.formSubmitted.emit();
  }

}
