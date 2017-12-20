import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SubTopicsService } from './../../shared/sub-topics.service';

@Component({
  selector: 'app-sub-topic-form',
  templateUrl: './sub-topic-form.component.html',
  styleUrls: ['./sub-topic-form.component.css']
})
export class SubTopicFormComponent implements OnInit {
  subTopicForm: FormGroup;
  // subTopicsList: {title: string, desc: string}[] = [];
  @Input() topic: {title: string, desc:string};
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private subTopicsService: SubTopicsService) {
    this.subTopicForm = new FormGroup({
      'title': new FormControl('Title', Validators.required),
      'desc': new FormControl('Description', Validators.required)
    });
  }

  ngOnInit() {
  }

  addSubTopic() {
    this.subTopicsService.addSubTopic(this.topic, this.subTopicForm.value);
    this.formSubmitted.emit();
  }

  cancelForm() {
    this.formSubmitted.emit();
  }

  resetForm() {
    this.subTopicForm.reset();
  }

}
