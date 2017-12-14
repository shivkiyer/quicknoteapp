import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TopicFormComponent } from './topic-page/topic-form/topic-form.component';

import { TopicsService } from './shared/topics.service';

@NgModule({
  declarations: [
    AppComponent,
    TopicPageComponent,
    WelcomePageComponent,
    TopicFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [TopicsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
