import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
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
    turns:"", 
    isWinner: false, 
    checkedMatrix:[], 
    color:""
  };

  playerMarkers = ['color1', 'color2', 'color3'];
  numRows = 4;
  numColumns = 4;
  numPlayers = 1;
  players = [];
  board = [];

  gameInit() {
    this.generateBoard();
    this.addPlayers();
  }

  evaluatePlay(btn){
    const {name, color } = this.currentPlayer;
    btn.owner = name;
    btn.color = color;
    btn.checked = true;
    btn.name = name;
    if(this.checkPlayerWon()) {
      this.foundWinner = true;
      return true;
    } else { 
      this.nextPlayer();
      return false;
    };
    
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
  generateBoard() {
    for( let i= 0; i < this.numRows; i++) {
      this.generateRow();
    }
  }

  addPlayers() {
    for(let i = 0; i < this.numPlayers; i++) {
      this.players.push({name:`player${i}`, turns:"", isWinner: false, checkedMatrix:[], color:this.playerMarkers[i]})
    }
    this.currentPlayer = this.players[0];
  }

  checkPlayerWon() {
    return this.checkMatrixForMatchs(this.currentPlayer);
  }
  checkMatrixForMatchs(player) {
    var playerWonTheGame = false;
    var playerHasColumnWin = [];

    let playerMatrix = this.board.map(boardRowArray => {
      return boardRowArray.map(e => e.owner.indexOf(player.name))
    })
    //all values in row the same
    for(let i =0; i < playerMatrix.length; i++) {
      //first test if all values in this row are the same
      var rowCheck = playerMatrix[i].every(elVal => elVal === playerMatrix[i][0] && elVal !== -1);
     if(rowCheck) {
       playerWonTheGame = true;
       break;
     }
    }
    //all values in a column the same
    playerMatrix.forEach((rowEl) => {
      if( rowEl.indexOf(0) !== -1) {
        playerHasColumnWin.push(rowEl.indexOf(0))
      }
      var columnWin = playerHasColumnWin.every(elVal => elVal === playerHasColumnWin[0])
      if(columnWin && playerHasColumnWin.length === playerMatrix.length) {
        playerWonTheGame = true;
      }
    });

    playerMatrix.forEach((rowEl, idx) => {
      console.log(playerMatrix);
      console.log('iteration index: ', idx)
      var i0 = rowEl.indexOf(0);
      if(i0 != -1) {
        var i1 = rowEl[i0 + 1]
        if(i1 != -1){
          console.log('2 player squares in a row')
          //check row length???
          var nextIdx = idx + 1;
          var prevIdx = idx - 1;
          console.log("board length",this.board.length)
          console.log("player matrix length",playerMatrix.length)
          console.log("next Index", nextIdx)
          console.log('orev Index', prevIdx)
          if(nextIdx >= playerMatrix.length || prevIdx == -1) {
            console.log('no rows left')
          } else {
            console.log("playerMatrix next row nextIdx first element 0 value: ",playerMatrix[nextIdx][i0]);
            console.log("playerMatrix next row nextIdx next element 0 value: ",playerMatrix[nextIdx][i0 + 1]);
            console.log("playerMatrix next row prevIdx first element 0 value: ",playerMatrix[prevIdx][i0]);
            console.log("playerMatrix next row prevIdx next element 0 value: ", playerMatrix[prevIdx][i0 + 1]);
            if( (playerMatrix[nextIdx][i0] == 0 && playerMatrix[nextIdx][i0 + 1] == 0) || (playerMatrix[prevIdx][i0] == 0 && playerMatrix[prevIdx][i0 + 1] == 0)) {
              console.log("winner");
              playerWonTheGame = true;
            }
            console.log(playerMatrix[nextIdx])
          }
        }
        console.log(i0)
      }
    })
    return playerWonTheGame;
  }
  comp(arr1, arr2) {
    var sqrComp = false;
    var idx = arr1[0];

    if(arr1[0] === arr2[idx +1]) {
      console.log('im going to compare')
      let w = arr1.reduce((o, item, i)=> {
        if(arr2.indexOf(item) ) {
          console.log(arr2.indexOf(item))
        }
        console.log(item == arr2[i])
        return;
      })
    } else {
      console.log('passing on compare')
    }
    return sqrComp;
  }
  constructor() {}
}
