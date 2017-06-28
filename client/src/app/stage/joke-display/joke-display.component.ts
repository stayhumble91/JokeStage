import { Component, OnInit } from '@angular/core';
import { UserService } from './../../user/user.service';
import { User } from './../../user/user';
import { Queue } from './../queue/queue';
import { QueueService } from './../queue/queue.service';

@Component({
  selector: 'app-joke-display',
  templateUrl: './joke-display.component.html',
  styleUrls: ['./joke-display.component.css']
})
export class JokeDisplayComponent implements OnInit {
  current_user= {user_id: "", username: ""}
  jokester = {user_id: "", username: ""}

  constructor( private _userService: UserService, private _queueService: QueueService ) { }

  ngOnInit() {
    this._userService.check_status()
      .then((data) => {
        if(data){
          this.current_user.username = data.username
          this.current_user.user_id = data._id
        }
      })
      .catch(() => console.log("error retrieving users") )

  }

  get_jokester() {
    this._queueService.get_jokester()
        .then((data) => {
          if(data){
            this.jokester.user_id = data.user_id
            this.jokester.username = data.username
          }else{
            console.log("No one left in the queue")
          }

        })
        .catch(() => console.log("Error getting the next jokester"))
  }


}
