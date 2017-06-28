import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Queue } from './queue';

@Injectable()
export class QueueService {

  constructor( private _http: Http ) { }
    join_queue(user: Queue){
      return this._http.post("/join_queue", user).toPromise()
    }

    get_queue(){
      // console.log("in queue.service")
      return this._http.get( '/get_queue' )
                .map( data => data.json() )
                .toPromise();
    }
    get_jokester(){
      return this._http.get("/get_jokester")
                .map( data => data.json() )
                .toPromise();
    }
}
