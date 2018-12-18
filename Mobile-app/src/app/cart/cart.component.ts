import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cart = {};
  products=[];
  sumPrice: number = 0;


  constructor(private cartService: CartService) {
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
      if(response['status']!=200){
        alert(response['error'])
      }
      this.getInfo(response['Goods']);
    }).catch(err =>{
      alert('服务器异常，增加失败，请重试')
    })
  }

  getInfo(response:any){
    this.sumPrice = 0;
    this.products = response;
    for(let pro of response){
      this.sumPrice += pro.sumunit;
    }
  }
}
