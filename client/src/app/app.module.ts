import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { StageComponent } from './stage/stage.component';
import { QueueComponent } from './stage/queue/queue.component';
import { ReactionComponent } from './stage/reaction/reaction.component';
import { JokeDisplayComponent } from './stage/joke-display/joke-display.component';
import { AudienceComponent } from './stage/audience/audience.component';
import { QueueService } from './stage/queue/queue.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    StageComponent,
    QueueComponent,
    ReactionComponent,
    JokeDisplayComponent,
    AudienceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserService, QueueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
