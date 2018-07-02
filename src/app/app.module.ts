import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { IntroComponent } from './intro/intro.component';
import { PlayComponent } from './play/play.component';
import { WinComponent } from './win/win.component';
import { TictactitleComponent } from './tictactitle/tictactitle.component';
import { ChartDirective } from './chart.directive';
import { WINDOW_PROVIDERS } from "./window.service";

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    PlayComponent,
    WinComponent,
    TictactitleComponent,
    ChartDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule 
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
