import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MinePage } from './mine.page';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from '../services/auth.service';
import {StatusService} from '../services/status.service';
import {LoginStatusService} from '../services/login-status.service';

const routes: Routes = [
  // {path: '', redirectTo: '/tabs/mine', pathMatch: 'full'},
  {path: '', component: MinePage},
  {path: 'login', redirectTo: '/tabs/mine/login', pathMatch: 'full'},
  {path: 'register', redirectTo: '/tabs/mine/register', pathMatch: 'full'},

  {path: 'login', component: LoginComponent, canActivate: [LoginStatusService]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginStatusService]},

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MinePage, LoginComponent, RegisterComponent],
  providers: [AuthService, StatusService, LoginStatusService]
})
export class MinePageModule {}
