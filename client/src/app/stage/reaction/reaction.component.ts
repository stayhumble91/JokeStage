import { Component, OnInit } from '@angular/core';

import * as io from "socket.io-client"

import { SocketService } from "./../../socket.service"

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {
  sound = "./../../assets/Laugh02.wav"
  joke = ""

  constructor( private _socketService: SocketService) { }

  ngOnInit() {
    // this._socketService.get_jokester().subscribe((joker) => {
    //     this.jokester = joker
    //   })

    this._socketService.get_joke().subscribe((joke: string) => {
        this.joke = joke
      })

    this._socketService.play_sound().subscribe((soundFile) => {
      console.log("play " + soundFile)
      this.playSound(soundFile)
    })
  }

  laugh(){
    this._socketService.laugh()
    // this.playSound()
  }

  boo(){
    this._socketService.boo()
  }

  heckle(){
    this._socketService.heckle()
  }

  chuckle(){
    this._socketService.chuckle()
  }

  groan(){
    this._socketService.groan()
  }

  courtesyLaugh(){
    this._socketService.courtesyLaugh()
  }

    cricket(){
    this._socketService.cricket()
  }
  
  playSound(soundFile){
    var audio = document.createElement("audio");
						audio.src = soundFile;
						audio.play();
  }
}
