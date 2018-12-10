import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineComponent} from "./mine.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";

const routes: Routes = [
  {path: '', component: MineComponent},
  {path: 'login', component: LoginFormComponent}, //http://localhost:4200/login
  {path: 'register', component: RegisterFormComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MineRoutingModule { }
