import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { User } from './user';

import "rxjs"

@Injectable()
export class UserService {

  constructor(private _http: Http) { }
  login(user: User){
      return this._http.post("/login", user ).toPromise()
    }

    check_status(){
      return this._http.get("/checkStatus")
              .map(data => data.json())
              .toPromise()
    }

    logout(){
    return this._http.get('/logout')
              .map( data => data.json() )
              .toPromise();
  }

  get_current_user(){
    return this._http.get("/get_current_user")
              .map(data => data.json())
              .toPromise()
  }

  register(newUser: User){
    // console.log("In user service")
    return this._http.post("/register", newUser ).toPromise()
  }
}
