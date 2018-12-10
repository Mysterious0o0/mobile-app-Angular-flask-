import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MineComponent} from "./mine.component";
import {MineRoutingModule} from "./mine-routing.module";
import {LoginFormComponent} from "./login-form/login-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MineRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    MineComponent
  ],
  providers: []
})
export class MineModule {}
