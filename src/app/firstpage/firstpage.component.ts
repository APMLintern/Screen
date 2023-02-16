import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.scss']
})
export class FirstpageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  myFunction(){
    this.router.navigate(['./loginpage']); 
  }
  playAudio(){
    let audio = new Audio();
    audio.src = "../../assets/truck-departing-01-[AudioTrimmer.com].wav";
    audio.load();
    audio.play();
    // console.log("tjajtj")
    // this.playAudio();
    
  }
  playSound(){
    let audio = new Audio();
    audio.src = "../../assets/truck-departing-01-[AudioTrimmer.com].wav";
    audio.load();
    audio.play();
    }
}
