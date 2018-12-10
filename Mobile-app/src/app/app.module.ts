import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MineModule} from "./mine/mine.module";
import {HomeModule} from "./home/home.module";
import { GoodsNumPipe } from './pipe/goods-num.pipe';
import {OrderModule} from "./order/order.module";

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    IntroductionComponent,
    FooterComponent,
    GoodsNumPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MineModule,
    HomeModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
