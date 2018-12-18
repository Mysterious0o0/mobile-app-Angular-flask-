import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MineComponent} from "./mine.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {StatusAuthenticatedService} from "../services/status-authenticated.service";
import {LoginRedisterService} from "../services/login-redister.service";

const routes: Routes = [
  {path: 'mine', component: MineComponent, canActivate: [StatusAuthenticatedService]
  },
  {path: 'login', component: LoginFormComponent, canActivate:[LoginRedisterService]
  }, //http://localhost:4200/login
  {path: 'register', component: RegisterFormComponent, canActivate: [LoginRedisterService]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MineRoutingModule { }
