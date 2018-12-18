import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import {GoodDetailsComponent} from "./good-details/good-details.component";
import {HomeService} from "../services/home.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    GoodDetailsComponent
  ],
  providers: [HomeService]
})
export class HomeModule {}
