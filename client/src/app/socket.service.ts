import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';



@Injectable()
export class SocketService {
  private url = "http://35.165.129.219:8000"
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

  laugh(){
    this.socket.emit("laugh")
  }

  boo(){ 
    this.socket.emit("boo")
  }

  groan(){ 
    this.socket.emit("groan")
  }

  chuckle(){ 
    this.socket.emit("chuckle")
  }

  courtesyLaugh(){ 
    this.socket.emit("courtesyLaugh")
  }

  heckle(){ 
    this.socket.emit("heckle")
  }

  cricket(){ 
    this.socket.emit("cricket")
  }


  

  play_sound(){
    let observable = new Observable(observer => {
      this.socket = io(this.url)
      this.socket.on("send_sound", (data) => {
        observer.next(data)
      })
      return () => {
        this.socket.disconnect()
      }
    })
    return observable
  }

}
