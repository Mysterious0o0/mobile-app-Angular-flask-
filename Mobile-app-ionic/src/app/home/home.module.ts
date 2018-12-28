import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {HomePage} from './home.page';
import {HomeService} from '../services/home.service';
import {GoodsComponent} from './goods/goods.component';

const routes: Routes = [
  // {path: '', redirectTo: '/tabs/home', pathMatch: 'full'},
  {path: '', component: HomePage},
  {path: 'goods/:id', redirectTo: '/tabs/home/goods/:id', pathMatch: 'full'},
  {path: 'goods/:id', component: GoodsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage, GoodsComponent],
  providers: [HomeService]
})
export class HomePageModule {
}
