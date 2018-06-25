import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from "./intro/intro.component";
import { StartComponent } from "./start/start.component";
import { PlayComponent } from "./play/play.component";
import { WinComponent } from "./win/win.component";

const routes: Routes = [
  { path:'', component: IntroComponent },
  { path:"start", component: StartComponent },
  { path:"play", component: PlayComponent },
  { path:"win", component: WinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
