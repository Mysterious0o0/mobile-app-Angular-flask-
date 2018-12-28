import {Component, OnInit} from '@angular/core';
import {HomeService} from '../services/home.service';
import {Router} from '@angular/router';
import {AlertStringService} from '../services/alert-string.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  all_index = 1;
  mune_index = 1;
  arrays = [];
  products: string[];
  name2id = {};
  seller: string;
  searchValue = '';
  status = false;

  constructor(private homeServer: HomeService, private router: Router,
              private Alert: AlertStringService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.homeServer.gIndexdata(this.all_index).then(response => {
      this.arrays = response['menu'];
      this.products = response['goods'];
      this.name2id = response['name2id'];
    }).catch(err => {
      this.Alert.presentAlert('服务器请求失败，请刷新重试');
    });
  }


  onSearchSeller(index: number) {
    this.status = false;
    this.mune_index = 1;
    this.seller = this.arrays[index];
    const menuid = this.name2id[this.seller];
    this.homeServer.gMenuGoods(menuid, this.mune_index).then(response => {
      this.products = response;
    }).catch(err => {
      this.Alert.presentAlert('服务器请求失败，请刷新重试');
    });
  }

  onSearchType(value: any) {
    this.homeServer.searchGoods(value).then(response => {
      console.log(response);
      if (response[0] == null) {
        this.Alert.presentAlert('未查询到该商品，请重新查询');
      } else {
        this.products = response;
      }
    }).catch(err => {
      this.Alert.presentAlert('服务器请求失败，请重新搜索');
    });
    this.searchValue = null;
  }

  goGoods(i: number) {
    this.router.navigate(['/goods', this.products[i]['goodsid']], {skipLocationChange: true});
  }

  doRefresh(event) {
    if (this.seller === undefined) {
      this.homeServer.gIndexdata(this.all_index, 'Refresh').then(response => {
        this.products = response['goods'];
        this.name2id = response['name2id'];
        // console.log(this.products);
      }).catch(err => {
        this.Alert.presentAlert('服务器请求失败，请刷新重试');
      });
    } else {
      const menuid = this.name2id[this.seller];
      this.homeServer.gMenuGoods(menuid, this.mune_index, 'Refresh').then(response => {
        this.products = response;
        // console.log(this.products);
      }).catch(err => {
        this.Alert.presentAlert('服务器请求失败，请刷新重试');
      });
    }
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  doInfinite(event) {
    // console.log('Begin async operation');
    if (this.seller === undefined) {
      this.homeServer.gIndexdata(++this.all_index, 'Infinite').then(response => {
        for (const goods of response['goods']) {
          this.products.push(goods);
        }
        // console.log(this.products);
        // console.log(Object.keys(response['goods']).length);
        if (Object.keys(response['goods']).length === 0 || Object.keys(response['goods']).length < 10) {
          event.target.disabled = true;
          this.status = true;
        }
      }).catch(err => {
        this.Alert.presentAlert('服务器请求失败，请刷新重试');
      });
    } else {
      const menuid = this.name2id[this.seller];
      this.homeServer.gMenuGoods(menuid, ++this.mune_index, 'Infinite').then(response => {
        for (const goods of response) {
          this.products.push(goods);
        }
        // console.log(this.products);
        if (Object.keys(response).length === 0 || Object.keys(response).length < 10) {
          event.target.disabled = true;
          this.status = true;
        }
      }).catch(err => {
        this.Alert.presentAlert('服务器请求失败，请刷新重试');
      });
    }
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();

      // 禁止上拉刷新，若为true则只能刷新一次
      // event.target.disabled = true;
    }, 500);
  }

}
