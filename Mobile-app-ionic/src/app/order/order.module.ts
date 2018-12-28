import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderPage } from './order.page';
import { GoOrderComponent } from './go-order/go-order.component';
import { SelectAddressComponent } from './select-address/select-address.component';
import { CreateAddressComponent } from './create-address/create-address.component';
import {StatusService} from '../services/status.service';

const routes: Routes = [
  // {path: '', redirectTo: '/tabs/order', pathMatch: 'full'},
  {path: '', component: OrderPage},
  {path: 'goorder/:index', redirectTo: '/tabs/order/goorder/:index', pathMatch: 'full'},
  {path: 'createadd/:index', redirectTo: '/tabs/order/createadd/:index', pathMatch: 'full'},
  {path: 'selectadd', redirectTo: '/tabs/order/selectadd', pathMatch: 'full'},
  {path: 'goorder/:index', component: GoOrderComponent, canActivate: [StatusService]},
  {path: 'goorder', component: GoOrderComponent, canActivate: [StatusService]},

  {path: 'createadd/:index', component: CreateAddressComponent, canActivate: [StatusService]},
  {path: 'selectadd', component: SelectAddressComponent, canActivate: [StatusService]},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderPage, GoOrderComponent, SelectAddressComponent, CreateAddressComponent]
})
export class OrderPageModule {}
