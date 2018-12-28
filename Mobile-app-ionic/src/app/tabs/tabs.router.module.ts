import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {path: 'home', loadChildren: '../home/home.module#HomePageModule'},
      {path: 'cart', loadChildren: '../cart/cart.module#CartPageModule'},
      {path: 'order', loadChildren: '../order/order.module#OrderPageModule'},
      {path: 'mine', loadChildren: '../mine/mine.module#MinePageModule'},
      {path: 'intro', loadChildren: '../intro/intro.module#IntroPageModule'},
      {path: '', redirectTo: '/tabs/home', pathMatch: 'full'}
    ]
  },
  {
    path: '', redirectTo: '/tabs/home', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
