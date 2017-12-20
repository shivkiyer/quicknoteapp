import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TopicFormComponent } from './topic-page/topic-form/topic-form.component';
import { SubTopicComponent } from './sub-topic/sub-topic.component';
import { SubTopicFormComponent } from './sub-topic/sub-topic-form/sub-topic-form.component';
import { NoteComponent } from './note/note.component';
import { NoteFormComponent } from './note/note-form/note-form.component';

import { TopicsService } from './shared/topics.service';
import { SubTopicsService } from './shared/sub-topics.service';
import { NoteService } from './shared/note.service';

@NgModule({
  declarations: [
    AppComponent,
    TopicPageComponent,
    WelcomePageComponent,
    TopicFormComponent,
    SubTopicComponent,
    SubTopicFormComponent,
    NoteComponent,
    NoteFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [TopicsService,
              SubTopicsService,
              NoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
