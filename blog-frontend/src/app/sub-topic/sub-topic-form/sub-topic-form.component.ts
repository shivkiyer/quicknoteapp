import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SubTopicsService } from './../../shared/sub-topics.service';

@Component({
  selector: 'app-sub-topic-form',
  templateUrl: './sub-topic-form.component.html',
  styleUrls: ['./sub-topic-form.component.css']
})
export class SubTopicFormComponent implements OnInit {
  subTopicForm: FormGroup;
  subTopicList: {title: string, desc: string}[] = [];
  @Input() topic: {title: string, desc:string};

  constructor(private subTopicsService: SubTopicsService) {
    this.subTopicForm = new FormGroup({
      'title': new FormControl('Title', Validators.required),
      'desc': new FormControl('Description', Validators.required)
    });
  }

  ngOnInit() {
    this.subTopicList = this.subTopicsService.subTopicList;
  }

  addSubTopic() {
    this.subTopicsService.addSubTopic(this.topic, this.subTopicForm.value);
  }

}
