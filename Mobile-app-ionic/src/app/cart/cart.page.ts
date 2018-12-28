import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../services/cart.service';
import {AlertStringService} from '../services/alert-string.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart = {};
  products = [];
  addressid = '';
  sumPrice = 0;
  i = 0;


  constructor(private cartService: CartService, private router: Router,
              private Alert: AlertStringService) {
  }

  ionViewWillEnter() {
    this.cartService.gCartdata().then(response => {
      this.getInfo(response);
    }).catch(err => {
      this.Alert.presentAlert('服务器请求失败，请重试');
    });
  }
  ngOnInit() {
  }

  subGoods(index: number) {
    this.cartService.handleGoods(this.products[index].goodsid, 'sub').then(response => {
      this.getInfo(response);
    }).catch(err => {
      this.Alert.presentAlert('服务器异常，增加失败，请重试');
    });
  }

  addGoods(index: number) {
    this.cartService.handleGoods(this.products[index].goodsid, 'add').then(response => {
      this.getInfo(response);
    }).catch(err => {
      this.Alert.presentAlert('服务器异常，增加失败，请重试');
    });
  }

  getInfo(response: any) {
    if (response['status'] === 200) {
      this.sumPrice = 0;
      this.addressid = response['address'];
      this.products = response['Goods'];
      for (const pro of response['Goods']) {
        this.sumPrice += pro.sumunit;
      }
    } else if (response['status'] === 403) {
      this.Alert.presentAlert(response['error']);
      // 上一个路由
      // console.log(location.pathname);
      localStorage.removeItem('userToken');
      this.router.navigate(['/tabs/mine/login']);
    } else {
      this.Alert.presentAlert(response['error']);
    }
  }

  goOrder() {
    this.router.navigate(['./goorder', this.addressid], {skipLocationChange: true});
  }


}
