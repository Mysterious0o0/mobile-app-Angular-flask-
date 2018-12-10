import {Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, DoCheck{

  constructor() { }

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

  ngOnInit() {

  }

  subGoods(index: number){
    this.carts[index]['count'] -= 1;

  }

  addGoods(index: number){
    this.carts[index]['count'] += 1;
  }

  ngDoCheck(): void {
    this.sumPrice = 0;
    for(let i in this.carts){
      this.carts[i]['sumprice'] = this.carts[i]['count'] * this.carts[i]['price'];
      this.sumPrice += this.carts[i]['count'] * this.carts[i]['price']
    }
    this.projects = this.carts.filter(item =>{
      let filterValues = item['count'];
      return filterValues > 0
    });
  }
}
