import { Component, OnInit } from '@angular/core';
import { GameEngineService } from "../game-engine.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.scss']
})
export class WinComponent implements OnInit {

  constructor(private gameEngine: GameEngineService, private router:Router) { }

  ngOnInit() {

  }
  resetGame() {
    this.router.navigate(['/']);
  }
}
