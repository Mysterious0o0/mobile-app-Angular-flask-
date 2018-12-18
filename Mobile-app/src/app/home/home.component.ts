import { Component, OnInit } from '@angular/core';
import {HomeService} from "../services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrays= [];
  products: string[];
  name2id = {};
  seller: string;
  searchValue:string = '';

  constructor(private homeServer: HomeService) {
    homeServer.gIndexdata().then(response =>{
      this.arrays = response['menu'];
      this.products = response['goods'];
      this.name2id = response['name2id']
    }).catch(err =>{
      alert('服务器请求失败，请刷新重试')
    });
   }

  ngOnInit() {
  }

  onSearchSeller(index: number){

    this.seller = this.arrays[index];
    let menuid = this.name2id[this.seller];
    this.homeServer.gMenuGoods(menuid).then(response => {
      this.products = response;
      // console.log(response)
    }).catch(err => {
      alert('服务器请求失败，请刷新重试')
    });
  }

  onSearchType(value: any) {
    // 后期要和商家id一起过滤产品信息
    this.homeServer.searchGoods(value).then(response => {
      console.log(response);
      if(response[0] == null){
        alert('未查询到该商品，请重新查询')
      }else {
        this.products = response;
      }
    }).catch(err => {
      alert('服务器请求失败，请重新搜索')
    });
    this.searchValue = null;
  }

}
