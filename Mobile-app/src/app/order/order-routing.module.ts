import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SuccessOrderComponent} from "./success-order/success-order.component";
import {OrderComponent} from "./order.component";
import {CreateAddressComponent} from "./create-address/create-address.component";
import {SelectAddressComponent} from "./select-address/select-address.component";

const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: 'sucorder', component: SuccessOrderComponent}, //http://localhost:4200/sucorder
  {path: 'createadd', component: CreateAddressComponent}, //http://localhost:4200/createadd
  {path: 'selectadd', component: SelectAddressComponent}, //http://localhost:4200/selectadd
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderRoutingModule { }
