import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderRoutingModule} from "./order-routing.module";
import {OrderComponent} from "./order.component";
import {SuccessOrderComponent} from "./success-order/success-order.component";
import { CreateAddressComponent } from './create-address/create-address.component';
import { SelectAddressComponent } from './select-address/select-address.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderRoutingModule
  ],
  declarations: [
    OrderComponent,
    SuccessOrderComponent,
    CreateAddressComponent,
    SelectAddressComponent
  ],
  providers: []
})
export class OrderModule {}
