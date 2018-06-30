import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tictactitle',
  templateUrl: './tictactitle.component.html',
  styleUrls: ['./tictactitle.component.scss']
})
export class TictactitleComponent implements OnInit {

  constructor() { }
  title = "Welcome To Tic Tac Toe!"
  ngOnInit() {
  }

}
