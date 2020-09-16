import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule, CommonModule, AppRoutingModule ],
  declarations: [ AppComponent, UsersComponent, UserComponent, SpinnerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
