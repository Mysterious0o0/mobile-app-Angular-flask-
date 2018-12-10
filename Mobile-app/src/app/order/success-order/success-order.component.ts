import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.css']
})
export class SuccessOrderComponent implements OnInit {

  constructor() { }

  orders:object[] = [
    {'id': 1, 'goodsname': "goods1", 'count': 1, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'id': 2, 'goodsname': "goods2", 'count': 1, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'id': 3, 'goodsname': "goods3", 'count': 2, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'id': 4, 'goodsname': "goods4", 'count': 3, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'id': 5, 'goodsname': "goods5", 'count': 2, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'id': 6, 'goodsname': "goods6", 'count': 4, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'id': 7, 'goodsname': "goods7", 'count': 1, 'price': 100, 'unit': '/件', 'sumprice': 0},

  ];
  projects: object[];
  sumPrice: number = 0;

  ngOnInit() {
    this.sumPrice = 0;
    for(let i in this.orders){
      this.orders[i]['sumprice'] = this.orders[i]['count'] * this.orders[i]['price'];
      this.sumPrice += this.orders[i]['count'] * this.orders[i]['price']
    }
    this.projects = this.orders
  }

  goodsRejected(index:number){
    console.log(this.orders[index]['goodsname'] + '被退货')
  }

  exchangeGoods(index:number){
    console.log(this.orders[index]['goodsname'] + '要求换货')
  }

  signForGoods(index:number){
    console.log(this.orders[index]['goodsname'] + '已签收')
  }
}
