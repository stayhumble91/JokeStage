import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';



@Injectable()
export class SocketService {
  private url = "http://localhost:8000"
  private socket

  constructor() { }

  get_queue(){
    let observable = new Observable(observer => {
      this.socket = io(this.url)
      this.socket.on("update_queue", (data) => {
        observer.next(data)
      })
      return () => {
        this.socket.disconnect()
      }
    })
    return observable
  }

  join_queue(data){
    this.socket.emit("join_queue", data)
  }

  get_jokester(){
    let observable = new Observable(observer => {
      this.socket = io(this.url)
      this.socket.on("update_jokester", (data) => {
        observer.next(data)
      })
      return () => {
        this.socket.disconnect()
      }
    })
    return observable
  }

  next_jokester(){
    this.socket.emit("next_jokester")
  }

  get_joke(){
    let observable = new Observable(observer => {
      this.socket = io(this.url)
      this.socket.on("update_joke", (data) => {
        observer.next(data)
      })
      return () => {
        this.socket.disconnect()
      }
    })
    return observable
  }

  share_joke(data){
    console.log("in server serive to share joke... " + data)
    this.socket.emit("share_joke", data)
  }
}
