import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartPage } from './cart.page';

const routes: Routes = [
  // {path: '', redirectTo: '/tabs/cart', pathMatch: 'full'},
  {path: '', component: CartPage},
  {path: 'goorder/:index', redirectTo: '/tabs/order/goorder/:index', pathMatch: 'full'},

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
