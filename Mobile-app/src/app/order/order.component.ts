import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  carts:object[] = [
    {'goodsname': "goods1", 'count': 1, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'goodsname': "goods2", 'count': 1, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'goodsname': "goods3", 'count': 2, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'goodsname': "goods4", 'count': 3, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'goodsname': "goods5", 'count': 2, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'goodsname': "goods6", 'count': 4, 'price': 100, 'unit': '/件', 'sumprice': 0},
    {'goodsname': "goods7", 'count': 1, 'price': 100, 'unit': '/件', 'sumprice': 0},

  ];
  projects: object[];
  sumPrice: number = 0;

  Info: object[] = [
    {'username': '蒸', 'mobile': 13287275832, 'address': ''},
    {'username': '蒸', 'mobile': null , 'address': '你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜'},
    {'username': '', 'mobile': 13287275832, 'address': '你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜'},
    {'username': '蒸', 'mobile': 13287275832, 'address': '你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜'},

  ];

  userInfo: object;

  constructor() { }

  ngOnInit() {
    this.sumPrice = 0;
    for(let i in this.carts){
      this.carts[i]['sumprice'] = this.carts[i]['count'] * this.carts[i]['price'];
      this.sumPrice += this.carts[i]['count'] * this.carts[i]['price']
    }
    this.projects = this.carts.filter(item =>{
      let filterValues = item['count'];
      return filterValues > 0
    });
    this.userInfo = this.Info[3]
  }
}
