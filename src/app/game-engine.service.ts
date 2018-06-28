import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  constructor() {}
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

  foundWinner = false;

  currentPlayer = {
    name:'', 
    isWinner: false, 
    checkedMatrix:[], 
    color:""
  };

  playerMarkers = ['color1', 'color2', 'color3'];
  numRows = 5;
  numColumns = 4;
  numPlayers = 1;
  players = [];
  board = [];

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
    this.foundWinner = false;
  }
  
  nextPlayer() {
    let idx = this.players.findIndex(el =>this.currentPlayer.name === el.name)
    var nextIdx = (idx >= this.players.length-1) ? (nextIdx = 0) : (nextIdx = idx + 1)
    this.currentPlayer = Object.assign({}, this.players[nextIdx]);
  }

  generateRow() {
    let row = [];
    for (let i = 0; i < this.numColumns; i++) {
      row.push({name:"open", owner:'', checked:false, color:''})
    }
    this.board.push(row)
  }

  addColumn() {
    this.board.map(row => {
      row.push({name:"open", owner:'', checked:false, color:''})
      return row;
    })
    this.numColumns = this.board[0].length;
  }
  removeColumn() {
    this.board.forEach(row => row.pop());
    this.numColumns = this.board[0].length;
    for(let i = 0; i < this.players.length; i++) {
      if( this.checkMatrixForMatchs(this.players[i]) ) {
        //if true set current player to winner for results screen
        this.currentPlayer = this.players[i];
        break;
      }
    }
    return this.foundWinner;
  }
  removeRow() {
    this.board.pop();
    for(let i = 0; i < this.players.length; i++) {
      if( this.checkMatrixForMatchs(this.players[i]) ) {
        //if true set current player to winner for results screen
        this.currentPlayer = this.players[i];
        break;
      }
    }
    return this.foundWinner;
  }
  generateBoard() {
    for(let i= 0; i < this.numRows; i++) {
      this.generateRow();
    }
  }

  addPlayers() {
    for(let i = 0; i < this.numPlayers; i++) {
      this.players.push({name:`Player: ${i}`, isWinner: false, checkedMatrix:[], color:this.playerMarkers[i]})
    }
    this.currentPlayer = this.players[0];
  }

  evaluatePlay(btn){
    const {name, color} = this.currentPlayer;
    btn.owner = name;
    btn.color = color;
    btn.checked = true;
    btn.name = name;

    if(this.checkPlayerWon()) {
      this.foundWinner = true;
    } else { 
      this.nextPlayer();
    };
    return this.foundWinner;
    
  }

  checkPlayerWon() {
    return this.checkMatrixForMatchs(this.currentPlayer);
  }

  checkMatrixForMatchs(player) {
    let playerMatrix = this.board.map(boardRowArray => {
      return boardRowArray.map(e => e.owner.indexOf(player.name))
    })
    //all values in row are the same
    this.rowCheck(player, playerMatrix);
    //all values in a column are the same
    this.columnCheck(player, playerMatrix);
    //Four in a square wins the game
    this.squareCheck(player, playerMatrix);
    
    return this.foundWinner;
  }

  rowCheck(player, matrix) {
    //all values in row are the same
    for(let i =0; i < matrix.length; i++) {
      //first test if all values in this row are the same
      var rowCheck = matrix[i].every(elVal => elVal === matrix[i][0] && elVal !== -1);
     if(rowCheck) {
        player.isWinner = true;
        this.foundWinner = true;
       break;
     }
    };
  }

  columnCheck(player, matrix) {
    var playerHasColumnWin = [];
    //all values in a column are the same
    matrix.forEach((rowEl) => {
      if( rowEl.indexOf(0) !== -1) {
        playerHasColumnWin.push(rowEl.indexOf(0))
      }
      var columnWin = playerHasColumnWin.every(elVal => elVal === playerHasColumnWin[0])
      if(columnWin && playerHasColumnWin.length === matrix.length) {
        player.isWinner = true;
        this.foundWinner = true;
      }
    });
  }

  squareCheck(player, matrix) {
    //Four in a square wins the game
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
              this.foundWinner = true;
            }
          }
        }
      }
    });
  }

}
