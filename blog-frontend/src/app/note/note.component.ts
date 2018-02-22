import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TopicsService } from './../shared/topics.service';
import { SubTopicsService } from './../shared/sub-topics.service';
import { NoteService } from './../shared/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  displayPage: boolean = false;
  topicIndex: number;
  subTopicIndex: number;
  topicId: string;
  topicTitle: string;
  subTopicTitle: string;
  subTopicId: string;
  newForm: boolean;
  noteList:any[] = [];
  noteDisplay: boolean = false;
  indexDisplay: number = -1;
  modifyStatus: boolean;
  modifyIndex: number;

  constructor(private route: ActivatedRoute,
              private topicsService: TopicsService,
              private subTopicsService: SubTopicsService,
              private noteService: NoteService,
              private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.displayPage = false;
    this.modifyIndex = -1;
    this.modifyStatus = false;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.topicIndex = +params['id'] - 1;
          this.subTopicIndex = +params['subid'] - 1;
          if (this.topicsService.topicList.length===0) {
            this.router.navigate(['/topics']);
          } else {
            this.topicTitle = this.topicsService.topicList[this.topicIndex].title;
          }
          if (this.subTopicsService.subTopicsList.length===0) {
            this.router.navigate(['/topics', this.topicIndex + 1])
          } else {
            this.subTopicTitle = this.subTopicsService.subTopicsList[this.subTopicIndex].title;
            this.newForm = false;
            this.noteDisplay = false;
            this.indexDisplay = -1;
            this.noteService.getNotes(this.topicIndex, this.subTopicIndex)
                  .subscribe(
                      (data) => {
                        this.noteList = [];
                        data.forEach((dataItem) => {
                          this.noteList.push({
                            title: dataItem['title'],
                            subTopic: dataItem['subTopic'],
                            '_id': dataItem['_id'],
                            contents: dataItem['contents']
                          });
                        });
                        this.noteService.noteList = this.noteList;
                        this.displayPage = true;
                      }
                  );
          }
        }
    );
  }

  newNote() {
    this.newForm = true;
  }

  displayNote(noteIndex: number) {
    if (noteIndex === this.indexDisplay) {
      if (this.noteDisplay === true) {
        this.noteDisplay = false;
      } else {
        this.noteDisplay = true;
      }
    } else {
      this.noteDisplay = true;
      this.indexDisplay = noteIndex;
    }
  }

  deleteNote(noteIndex: number) {
    this.noteService.deleteNote(this.topicIndex, this.subTopicIndex, noteIndex)
          .subscribe(
            (response) => {
              this.noteService.noteList.splice(noteIndex, 1);
              this.noteDisplay = false;
              this.indexDisplay = -1;
            },
            (error) => {
              console.log(error);
            }
          );
  }

  modifyNote(noteIndex: number) {
    this.modifyStatus = true;
    this.modifyIndex = noteIndex;
    this.newForm = true;
    this.indexDisplay = -1;
  }

}
