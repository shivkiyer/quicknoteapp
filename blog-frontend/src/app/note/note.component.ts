import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TopicsService } from './../shared/topics.service';
import { SubTopicsService } from './../shared/sub-topics.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  topicIndex: number;
  subTopicIndex: number;

  constructor(private route: ActivatedRoute,
              private topicsService: TopicsService,
              private subTopicsService: SubTopicsService,
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
  }

}
