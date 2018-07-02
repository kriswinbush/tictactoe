import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameEngineService } from "../game-engine.service";
import { Router } from "@angular/router";
import { LocaldbService } from "../localdb.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnDestroy {

  constructor(private lDb: LocaldbService, private gameEngine: GameEngineService, private router:Router) { }
  ngOnInit() {
    this.gameEngine.gameInit();
  }
  
  ngOnDestroy() {
    this.gameEngine.resetBoardValues();
  }

  addRow = () => this.gameEngine.generateRow();
  
  removeRow = () =>{
    this.gameEngine.removeRow()
      .then(res => {
        res.hasOwnProperty('win') ? this.router.navigate(['/win']) : null;
      });
  } 
   
  addColumn = () => this.gameEngine.addColumn();
  
  removeColumn = () =>{
    this.gameEngine.removeColumn()
      .then(res => {
        res.hasOwnProperty('win') ? this.router.navigate(['/win']) : null;
      });
  }
   
  checkPlayersSquare = btn =>{
    this.gameEngine.evaluatePlay(btn) 
      .then(res => {
        let player = this.gameEngine.currentPlayer;
        if(player.isWinner === true && res.hasOwnProperty('win')) {
          player.wins = player.wins + 1;
          this.lDb.addItem(player)
            .then(player => {
              setTimeout(() => { this.router.navigate(['/win']) }, 2000)  
            });
        } else {
          return null;
        }
      });
  }
}
