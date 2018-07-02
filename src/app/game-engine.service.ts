import { Injectable } from '@angular/core';
import { LocaldbService } from "./localdb.service";
interface IPlayer {
  name: string 
  isWinner: boolean
  checkedMatrix: Array<number> 
  color: string
  wins: number
}
@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  constructor(private lDb:LocaldbService) {}
  numOfPlayers = [
    {value: 1, viewValue: 'One'},
    {value: 2, viewValue: 'Two'},
    {value: 3, viewValue: 'Three'}
  ];
  numOfRows = [
    {value: 1, viewValue: 'One'},
    {value: 2, viewValue: 'Two'},
    {value: 3, viewValue: 'Three'},
    {value: 4, viewValue: 'Four'},
    {value: 5, viewValue: 'Five'}
  ];
  numOfColumns = [
    {value: 1, viewValue: 'One'},
    {value: 2, viewValue: 'Two'},
    {value: 3, viewValue: 'Three'},
    {value: 4, viewValue: 'Four'},
    {value: 5, viewValue: 'Five'}
  ];

  currentPlayer: IPlayer;

  playerMarkers: Array<string> = ['color1', 'color2', 'color3'];
  numRows: number = 5;
  numColumns: number = 4;
  numPlayers: number = 1;
  players: Array<IPlayer> = [];
  board: Array<any> = [];

  gameInit() {
    this.generateBoard();
    this.addPlayers();
  }
  resetBoardValues() {
    this.board = [];
    this.players = [];
    this.numPlayers = 1;
    this.numRows = 5;
    this.numColumns = 4;
  }
  
  nextPlayer() {
    let idx = this.players.findIndex(el =>this.currentPlayer.name === el.name)
    var nextIdx = (idx >= this.players.length-1) ? (nextIdx = 0) : (nextIdx = idx + 1)
    this.currentPlayer = Object.assign({}, this.players[nextIdx]);
  }

  generateRow() {
    let row = [];
    for (let i = 0; i < this.numColumns; i++) {
      row.push({name:"open", checked:false, color:''})
    }
    this.board.push(row)
  }

  addColumn() {
    this.board.map(row => {
      row.push({name:"open", checked:false, color:''})
      return row;
    })
    this.numColumns = this.board[0].length;
  }
  removeColumn() {
    this.board.forEach(row => row.pop());
    this.numColumns = this.board[0].length;
    var rColWin = this.players.map(player => this.checkMatrixForMatchs(player));
    return Promise.all([...rColWin])
      .then(res => { 
        return res.reduce((winning,el, idx)=>{
          el["win"] == true ? winning = el : null;  
          return winning;
        },{});
    })
  }

  removeRow() {
    this.board.pop();
    var rRowWin = this.players.map(player => {
      return this.checkMatrixForMatchs(player);
    })
    return Promise.all([...rRowWin])
      .then(res => { 
        return res.reduce((winning,el, idx)=>{
          el["win"] == true ? winning = el : null;  
          return winning;
      },{});
    })
  }

  generateBoard() {
    for(let i= 0; i < this.numRows; i++) {
      this.generateRow();
    }
  }

  async addPlayers() {
    for(let i = 0; i < this.numPlayers; i++) {
      let initPlayer:IPlayer = Object.assign({},{name:`Player: ${i}`, isWinner: false, checkedMatrix:[], color:this.playerMarkers[i], wins: 0});
      let getPlayer:IPlayer = await this.lDb.getItem(initPlayer);
      
      if(getPlayer !== undefined) {
        this.players.push(getPlayer)
      } else {
        let createPlayer:IPlayer = await this.lDb.addItem(initPlayer);
        this.players.push(createPlayer);
      };
    };
    this.currentPlayer = this.players[0];
  }

  evaluatePlay(btn){
    if(btn.checked == false) {
      const {name, color} = this.currentPlayer;
      Object.assign(btn,{name, color, checked: true});
      return this.checkPlayerWon()
      .then(res => {
        var winner = res.reduce((winning, el, idx)=>{
          el["win"] == true ? winning = el : null;  
          return winning;
        },{});

        winner.hasOwnProperty("win") ? null : this.nextPlayer();
        
        return winner;
      })
    } else {
      return Promise.resolve({})
    }
  }

  checkPlayerWon() {
    return this.checkMatrixForMatchs(this.currentPlayer);
  }

  async checkMatrixForMatchs(player) {
    let playerMatrix = this.board.map(boardRowArray => {
      return boardRowArray.map(e => e.name.indexOf(player.name))
    });

    let rCheck = this.rowCheck(player, playerMatrix);
    let cCheck = this.columnCheck(player, playerMatrix);
    let sCheck = this.squareCheck(player, playerMatrix);

    let result = await Promise.all([rCheck,cCheck,sCheck]);

    return result;
  } 

  rowCheck(player, matrix) {
    return new Promise((resolve, reject) => {
      var rowWin = false;
      for(var i =0; i < matrix.length; i++) {
        //first test if all values in this row are the same
        var rowCheck = matrix[i].every(elVal => elVal === matrix[i][0] && elVal !== -1);
       if(rowCheck) {
          player.isWinner = true;
          rowWin = true;
         break;
       }
      };
      resolve({win: rowWin, type:"row", index: i});
    })
    //all values in row are the same
  }

  columnCheck(player, matrix) {
    //debugger;
    return new Promise((resolve, reject) => {
      var colWin = false;
      var playerHasColumnWin = [];
      //all values in a column are the same
      matrix.forEach((rowEl, idx) => {
        if( rowEl.indexOf(0) !== -1) {
          //push object with row index
          playerHasColumnWin.push({el:rowEl.indexOf(0), index: idx})
        }
        if(playerHasColumnWin.length > 0) {
          var columnWin = playerHasColumnWin.every(elVal => elVal.el === playerHasColumnWin[0]['el'])
          if(columnWin && playerHasColumnWin.length === matrix.length) {
            player.isWinner = true;
            colWin = true;
          }
        }
        
      });
      resolve({win: colWin, type:"column", index: playerHasColumnWin.length > 0 ? playerHasColumnWin[0]['el'] : null})
    })
    
  }

  squareCheck(player, matrix) {
    //Four in a square wins the game
    return new Promise((resolve, reject) => {
      var sqWin = false;
      matrix.forEach((rowEl, idx) => {
        var i0 = rowEl.indexOf(0);
        if(i0 != -1) {
          var i1 = rowEl[i0 + 1]
          if(i1 != -1){
            var nextIdx = idx + 1;
            var prevIdx = idx - 1;
            if(nextIdx >= matrix.length || prevIdx == -1) {
              console.log('no rows before of after this row')
            } else {
              if( (matrix[nextIdx][i0] == 0 && matrix[nextIdx][i0 + 1] == 0) || (matrix[prevIdx][i0] == 0 && matrix[prevIdx][i0 + 1] == 0)) {
                console.log("winner");
                player.isWinner = true;
                sqWin = true;
              }
            }
          }
        }
      });
      resolve({win: sqWin, type: "square"});
    })
    
  }

}
