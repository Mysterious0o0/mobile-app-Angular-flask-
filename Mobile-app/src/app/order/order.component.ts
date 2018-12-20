import {Component, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  address={};
  carts=[];
  addressid: string;
  sumPrice: number;

  constructor(private orderService: OrderService, private router: Router, private routerInfo: ActivatedRoute) {
    this.addressid = this.routerInfo.snapshot.params['index'];
    orderService.gOrderdata(this.addressid).then(response =>{
      if (response['status'] == 200) {
        this.address = response['address'];
        this.carts = response['cartInfo'];
        this.sumPrice = 0;
        for (let cart of this.carts){
          this.sumPrice += cart.sumunit;
        }
      }
    }).catch(err=>{
      alert("服务器响应失败，请重新进入订单页")
    })
  }

  ngOnInit() {}

  buyCart(){
    this.orderService.buyCart(this.addressid).then(response=>{
      if(response['status']==200){
        this.router.navigate(['/sucorder'])
      }else {
        alert(response['error'])
      }
    }).catch(err=>{
      alert("服务器响应失败，请重新提交订单")
    })
  }
}
