import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css']
})
export class SelectAddressComponent implements OnInit {

  address=[];

  constructor(private router: Router, private orderService: OrderService) {
    this.orderService.selectAddress().then(response=>{
      if (response['status']==200){
        this.address = response['address']
      }else{
        alert(response['error'])
      }
    }).catch(err=>{
      alert('服务器响应异常，请稍后重试')
    })
  }

  ngOnInit() {}

  useAddress(index:number){
    this.router.navigate(['/order', this.address[index].addressid])
  }

  setAddress(index:number){
    this.orderService.setAddress(this.address[index].addressid).then(response =>{
      if (response['status']==200) {
        alert('默认地址设置成功')
      }else {
        alert('默认地址设置失败' + response['error'])
      }
    }).catch(err=>{
      alert('服务器响应异常，请稍后重试')
    })
  }

}
