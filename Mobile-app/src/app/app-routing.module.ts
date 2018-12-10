import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CartComponent} from "./cart/cart.component";
import {OrderComponent} from "./order/order.component";
import {MineComponent} from "./mine/mine.component";
import {IntroductionComponent} from "./introduction/introduction.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'order', component: OrderComponent},
  {path: 'mine', component: MineComponent},
  {path: 'intro', component: IntroductionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
