import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
