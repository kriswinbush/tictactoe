import { Component, OnInit } from '@angular/core';
import { GameEngineService } from "../game-engine.service";
import { Router } from "@angular/router";
import { LocaldbService } from "../localdb.service";
@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.scss']
})
export class WinComponent implements OnInit {
  values:any = [];
  constructor(private lDb: LocaldbService, private gameEngine: GameEngineService, private router:Router) {}
  
  async ngOnInit() {
    let players = await this.lDb.getAllItems();
    this.values = players;
  }
  
  resetGame() {
    this.gameEngine.resetBoardValues();
    this.router.navigate(['/']);
  }
}
