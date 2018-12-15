import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GoodDetailsComponent} from "./good-details/good-details.component";
import {HomeComponent} from "./home.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'goods', component: GoodDetailsComponent}, //http://localhost:4200/goods
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
