import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameEngineService } from "../game-engine.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnDestroy {

  constructor(private gameEngine: GameEngineService, private router:Router) { }
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
        console.log(res);
        res.hasOwnProperty('win') ? this.router.navigate(['/win']) : null;
      });
  } 
   
  addColumn = () => this.gameEngine.addColumn();
  
  removeColumn = () =>{
    this.gameEngine.removeColumn()
      .then(res => {
        console.log(res);
        res.hasOwnProperty('win') ? this.router.navigate(['/win']) : null;
      });
  }
   
  checkPlayersSquare = btn =>{
    this.gameEngine.evaluatePlay(btn) 
      .then(res => {
        console.log(res);
        res.hasOwnProperty('win') ? setTimeout(() => { this.router.navigate(['/win']) }, 2000)  : null;
      });
  }
 
}
