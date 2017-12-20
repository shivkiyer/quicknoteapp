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
  topicIndex: number;
  subTopicIndex: number;
  topic: string;
  subTopic: string;
  newForm: boolean;
  note:any[] = [];

  constructor(private route: ActivatedRoute,
              private topicsService: TopicsService,
              private subTopicsService: SubTopicsService,
              private noteService: NoteService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.topicIndex = +params['id'] - 1;
          this.subTopicIndex = +params['subid'] - 1;
          if (this.topicsService.topicList.length===0) {
            this.router.navigate(['/topics']);
          }
          if (this.subTopicsService.subTopicsList.length===0) {
            this.router.navigate(['/topics', this.topicIndex + 1])
          }
        }
    );

    this.newForm = false;
    this.topic = this.topicsService.topicList[this.topicIndex].title;
    this.subTopic = this.subTopicsService.subTopicsList[this.subTopicIndex].title;
    this.noteService.getNotes(this.topicIndex, this.subTopicIndex);
  }

}
