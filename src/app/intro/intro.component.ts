import { Component, OnInit } from '@angular/core';
import { GameEngineService } from "../game-engine.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(private gameEngine: GameEngineService, private router: Router) { }

  ngOnInit() {}

  startGame() {
    this.router.navigate(['/play']);
    this.gameEngine.gameInit();
  }
}
