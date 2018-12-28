import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertStringService} from '../../services/alert-string.service';

@Component({
  selector: 'app-go-order',
  templateUrl: './go-order.component.html',
  styleUrls: ['./go-order.component.scss']
})
export class GoOrderComponent implements OnInit {

  address = {};
  carts = [];
  addressid: string;
  sumPrice: number;

  constructor(private orderService: OrderService, private router: Router,
              private routerInfo: ActivatedRoute, private Alert: AlertStringService) {
    this.addressid = this.routerInfo.snapshot.params['index'];
    orderService.gOrderdata(this.addressid).then(response => {
      if (response['status'] === 200) {
        this.address = response['address'];
        this.carts = response['cartInfo'];
        this.sumPrice = 0;
        for (const cart of this.carts) {
          this.sumPrice += cart.sumunit;
        }
      } else if (response['status'] === 403) {
        this.Alert.presentAlert(response['error']);
        localStorage.removeItem('userToken');
        this.router.navigate(['/tabs/mine/login']);
      }
    }).catch(err => {
      this.Alert.presentAlert('服务器响应失败，请重新进入订单页');
    });
  }

  ngOnInit() {
  }

  buyCart() {
    this.orderService.buyCart(this.addressid).then(response => {
      if (response['status'] === 200) {
        this.router.navigate(['/tabs/order']);
      } else if (response['status'] === 403) {
        this.Alert.presentAlert(response['error']);
        localStorage.removeItem('userToken');
        this.router.navigate(['/tabs/mine/login']);
      } else {
        this.Alert.presentAlert(response['error']);
      }
    }).catch(err => {
      this.Alert.presentAlert('服务器响应失败，请重新提交订单');
    });
  }

  addAddress() {
    this.router.navigate(['./createadd', this.addressid], {skipLocationChange: true});
  }
}
