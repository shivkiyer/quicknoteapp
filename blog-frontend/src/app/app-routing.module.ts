import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SubTopicComponent } from './sub-topic/sub-topic.component';
import { NoteComponent } from './note/note.component';

var appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'home', component: WelcomePageComponent },
  { path: 'topics', component: TopicPageComponent },
  { path: 'topics/:id', component: SubTopicComponent },
  { path: 'topics/:id/:subid', component: NoteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
