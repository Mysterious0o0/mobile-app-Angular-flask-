import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cart = {};
  products=[];
  addressid: string;
  sumPrice: number = 0;


  constructor(private cartService: CartService, private router: Router) {
    this.cartService.gCartdata().then(response=> {
      this.getInfo(response);
    }).catch(err => {
      alert("服务器请求失败，请重试")
    });
  }

  ngOnInit() { }

  subGoods(index: number){
    this.cartService.handleGoods(this.products[index].goodsid, 'sub').then(response=>{
      this.getInfo(response);
    }).catch(err =>{
      alert('服务器异常，增加失败，请重试')
    })
  }

  addGoods(index: number){
    this.cartService.handleGoods(this.products[index].goodsid, 'add').then(response=>{
      this.getInfo(response);
    }).catch(err =>{
      alert('服务器异常，增加失败，请重试')
    })
  }

  getInfo(response:any){
    if(response['status'] == 200){
      this.sumPrice = 0;
      this.addressid=response['address'];
      this.products = response['Goods'];
      for(let pro of response['Goods']){
        this.sumPrice += pro.sumunit;
      }
    }else {
      alert(response['error'])
    }
  }
}
