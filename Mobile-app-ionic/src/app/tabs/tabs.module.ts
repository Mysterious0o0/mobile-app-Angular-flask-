import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import {HomePageModule} from '../home/home.module';
import {CartPageModule} from '../cart/cart.module';
import {OrderPageModule} from '../order/order.module';
import {MinePageModule} from '../mine/mine.module';
import {IntroPageModule} from '../intro/intro.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    CartPageModule,
    OrderPageModule,
    MinePageModule,
    IntroPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
