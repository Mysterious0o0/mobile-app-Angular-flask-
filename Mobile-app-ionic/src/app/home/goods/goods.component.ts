import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from '../../services/home.service';
import {AlertStringService} from '../../services/alert-string.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {

  goodsId: string;
  goods = {};

  constructor(private routerInfo: ActivatedRoute, private homeService: HomeService,
              private router: Router, private Alert: AlertStringService) {
    this.goodsId = routerInfo.snapshot.params['id'];
    this.homeService.showGoodsInfo(this.goodsId).then(response => {
      // console.log(response);
      this.goods = response;
    }).catch(err => {
      this.Alert.presentAlert('服务器请求失败，请重试');
    });

  }

  ngOnInit() {
  }

  addCart() {
    this.homeService.addGoods2cart(this.goodsId).then(response => {
      if (response['status'] === 200) {
      } else if (response['status'] === 403) {
        this.Alert.presentAlert(response['error']);
        localStorage.removeItem('userToken');
        this.router.navigate(['/tabs/mine/login']);
      } else {
        this.Alert.presentAlert(response['error']);
      }
    }).catch(err => {
      this.Alert.presentAlert('服务器请求失败，请重试');
    });
  }
}
