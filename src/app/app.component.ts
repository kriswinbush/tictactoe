import { Component } from '@angular/core';
import { GameEngineService } from "./game-engine.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
  }
  title = 'Tic Tac Toe';
}
