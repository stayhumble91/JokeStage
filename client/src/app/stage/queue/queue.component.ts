import { Component, OnInit } from '@angular/core';
import { UserService } from './../../user/user.service';
import { User } from './../../user/user';
import { Queue } from './queue';
import { QueueService } from './queue.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  current_user= {user_id: "", username: ""}
  queue: Array<any> = []

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

    this.get_queue()
      



    // this._userService.get_current_user()
    //                 .then( data => {
    //                   console.log("found current user ... " + data)
    //                   this.current_user = data
    //                 })
    //                 .catch( err => { console.log("error retrieving current user... ", err);})

    // console.log(this.current_user)
  }

  join_queue() {
    this._queueService.join_queue(this.current_user)
        .then(() => {console.log("user added to queue")})
        .catch(() => console.log("user not added to queue"))
    this.get_queue()
  }

  get_queue(){
    this._queueService.get_queue()
        .then (data => {
          console.log("got data")
          this.queue = data
        })
        .catch (() => { console.log("couldn't get the queue")})
  }
}
