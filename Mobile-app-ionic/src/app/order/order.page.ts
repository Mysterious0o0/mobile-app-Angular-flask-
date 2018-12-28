import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '../services/order.service';
import {AlertStringService} from '../services/alert-string.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  index = 1;
  projects = [];
  len: number;
  status = false;

  constructor(private orderService: OrderService, private router: Router,
              private Alert: AlertStringService) {
  }

  ionViewWillEnter() {
    this.orderService.getSorderData().then(response => {
      if (response['status'] === 200) {
        this.projects = response['sorder'];
        // this.len = Object.keys(response['sorder']).length;
        this.pushOrder(Object.keys(response['sorder']).length);
      } else if (response['status'] === 403) {
        this.Alert.presentAlert(response['error']);
        localStorage.removeItem('userToken');
        this.router.navigate(['/tabs/mine/login']);
      } else {
        this.Alert.presentAlert(response['error']);
      }
    }).catch(err => {
      this.Alert.presentAlert('服务器查询异常， 请刷新重试');
    });
  }


  ngOnInit() {
  }

  goodsRejected(index: number) {
    this.index = 1;
    this.status = false;
    this.setStatus(this.projects[index].sorderid, 0);
  }

  signForGoods(index: number) {
    this.index = 1;
    this.status = false;
    this.setStatus(this.projects[index].sorderid, 1);
  }

  setStatus(sorderid: any, flage: number) {
    this.orderService.setGoodsStatus(sorderid, flage).then(response => {
      if (response['status'] === 200 && flage === 1) {
        this.Alert.presentAlert('货物已签收完成，欢迎下次光临');
        this.projects = response['sorder'];
        this.pushOrder(Object.keys(response['sorder']).length);
      } else if (response['status'] === 200 && flage === 0) {
        this.Alert.presentAlert('已申请退货，正在等待商家确认');
        this.projects = response['sorder'];
        this.pushOrder(Object.keys(response['sorder']).length);
      } else if (response['status'] === 403) {
        this.Alert.presentAlert(response['error']);
        localStorage.removeItem('userToken');
        this.router.navigate(['/tabs/mine/login']);
      } else if (response['status'] !== 200) {
        this.Alert.presentAlert(response['error']);
      }
    }).catch(err => {
      this.Alert.presentAlert('服务器异常， 请点击重试');
    });
  }

  pushOrder(len) {
    if (len < 6) {
      this.orderService.getSorderData(this.index++).then(response => {
        if (response['status'] === 200) {
          for (const sorder of response['sorder']) {
            this.projects.push(sorder);
          }
        } else if (response['status'] === 403) {
          this.Alert.presentAlert(response['error']);
          localStorage.removeItem('userToken');
          this.router.navigate(['/tabs/mine/login']);
        } else {
          this.Alert.presentAlert(response['error']);
        }
      });
    }
  }

  selectMore() {
    this.orderService.getHisorderData().then(response => {
      if (response['status'] === 200) {
        this.projects = response['sorder'];
        // this.len = Object.keys(response['sorder']).length;
      } else if (response['status'] === 403) {
        this.Alert.presentAlert(response['error']);
        localStorage.removeItem('userToken');
        this.router.navigate(['/tabs/mine/login']);
      } else {
        this.Alert.presentAlert(response['error']);
      }
    }).catch(err => {
      this.Alert.presentAlert('服务器查询异常， 请刷新重试');
    });
  }

  doInfinite(event) {
    this.orderService.getSorderData(this.index++).then(response => {
      if (response['status'] === 200) {
        for (const sorder of response['sorder']) {
          this.projects.push(sorder);
        }
        if (Object.keys(response['sorder']).length === 0 || Object.keys(response['sorder']).length < 10) {
          // event.target.disabled = true;
          this.status = true;
        }
        // this.len = Object.keys(response['sorder']).length;
      } else if (response['status'] === 403) {
        this.Alert.presentAlert(response['error']);
        localStorage.removeItem('userToken');
        this.router.navigate(['/tabs/mine/login']);
      } else {
        this.Alert.presentAlert(response['error']);
      }
    }).catch(err => {
      this.Alert.presentAlert('服务器查询异常， 请刷新重试');
    });
    setTimeout(() => {
      event.target.complete();
      // event.target.disabled = true;
    }, 500);
  }
}
