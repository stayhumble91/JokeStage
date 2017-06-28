import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

import { User } from './user';
import { UserService } from './user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User
  returning_user: User
  confirmPW: string = ""

  constructor( private _user_service: UserService, private _router: Router ) { }

  ngOnInit() {
    this.user = new User()
    this.returning_user = new User()
  }

  login(){
    console.log("Starting to log in")
    this._user_service.login(this.returning_user)
      .then(() => { this._router.navigate(["/stage"]) })
      .catch(() => console.log("Couldn't log in"))
  }

  register(){
    // console.log("starting to register")
    // console.log('user password ' + this.user.password)
    // console.log("password confirmation " + this.confirmPW)
    if(this.user.password == this.confirmPW){
      // console.log("passwords match")
      this._user_service.register(this.user)
          .then(() => { this._router.navigate(["/stage"]) })
          .catch(() => console.log("Couldn't register"))
    }else{
      console.log("passwords do not match")
    }
    
  }

}
