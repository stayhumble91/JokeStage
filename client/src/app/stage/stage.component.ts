import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { Http } from "@angular/http";

import "rxjs"

import { UserService } from "./../user/user.service"

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  user = {username: "", user_id: ""}

  constructor( private _userService: UserService, private _router: Router, private _http: Http ) { }

  ngOnInit() {
    console.log("in stage")
    this._userService.check_status()
      .then((data) => {
        if(data){
          this.user.username = data.username
          this.user.user_id = data._id
          console.log("user is " + this.user.username)
          console.log("user ID is " + this.user.user_id)
        }
      })
      .catch(() => this._router.navigate(["/login"]) )
    
  }

  logout() {
    this._userService.logout()
                    .then(() => {
                      this._router.navigate(['/'])
                    })
                    .catch((err) => {
                      console.log(err)
                      this._router.navigate(['/'])
                    })
  }

}
