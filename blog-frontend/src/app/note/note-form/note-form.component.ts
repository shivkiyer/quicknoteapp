import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { NoteService } from './../../shared/note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  formKeys:string[] = [];
  formContents:string[] = [];
  formContentIndex: number;
  @Output() formSubmitted = new EventEmitter<void>();

  @Input() topicIndex: number;
  @Input() subTopicIndex: number;

  noteForm = new FormGroup({
    title: new FormControl('Title', Validators.required)
  });

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.formKeys = [];
    this.formContents = [];
    this.formContentIndex = 0;
    // console.log(this.subTopicIndex);
    // console.log(this.topicIndex);
  }

  noteSubmit() {
    // console.log(this.noteForm.value);
    this.noteService.addNote(this.topicIndex, this.subTopicIndex, this.noteForm.value);
    this.formSubmitted.emit();
  }

  addText() {
    this.formKeys.push('text');
    var textKey = 'text' + this.formContentIndex;
    this.formContents.push(textKey);
    this.noteForm.addControl(
      textKey,
      new FormControl('Note text', Validators.required)
    );

    this.formContentIndex += 1;
    // console.log(this.formContents);
    // console.log(this.formKeys);
  }

  addCode() {
    this.formKeys.push('code');
    var codeKey = 'code' + this.formContentIndex;
    this.formContents.push(codeKey);
    this.noteForm.addControl(
      codeKey,
      new FormControl('Code', Validators.required)
    );

    this.formContentIndex += 1;
    // console.log(this.formContents);
    // console.log(this.formKeys);
  }

  deleteContent(itemIndex: number) {
    var deleteKey = this.formContents[itemIndex];
    // console.log(deleteKey);
    this.formKeys.splice(itemIndex, 1);
    this.formContents.splice(itemIndex, 1);
    this.noteForm.removeControl(deleteKey);
    // console.log(this.formKeys);
    // console.log(this.formContents);
  }

}
