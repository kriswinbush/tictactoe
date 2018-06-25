import { Component, OnInit } from '@angular/core';
import { GameEngineService } from "../game-engine.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor(private gameEngine: GameEngineService, private router:Router) { }

  ngOnInit() {}

  addRow() {
    this.gameEngine.generateRow();
  }
  checkPlayersSquare(btn) {
    // get player from game engine player turn var
    if(this.gameEngine.evaluatePlay(btn)) {
      this.router.navigate(['/win'])
    }

  }
}
