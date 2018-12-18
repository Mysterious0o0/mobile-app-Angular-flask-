import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from "./cart/cart.component";
import {IntroductionComponent} from "./introduction/introduction.component";
import {StatusAuthenticatedService} from "./services/status-authenticated.service";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'cart', component: CartComponent, canActivate: [StatusAuthenticatedService]},
  {path: 'intro', component: IntroductionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
