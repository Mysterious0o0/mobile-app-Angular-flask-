import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.css']
})
export class SuccessOrderComponent implements OnInit {

  projects=[];
  len:number;

  constructor(private orderService: OrderService) {
    this.orderService.getSorderData().then(response=>{
      if(response['status']==200){
        this.projects = response['sorder'];
        this.len = Object.keys(response['sorder']).length
      }else {
        alert(response['error'])
      }
    }).catch(err=>{
      alert('服务器查询异常， 请刷新重试')
    })
  }


  ngOnInit() {}

  goodsRejected(index:number){
    this.setStatus(this.projects[index].sorderid, 0)
  }

  signForGoods(index:number){
    this.setStatus(this.projects[index].sorderid, 1)
  }

  setStatus(sorderid:any, flage:number){
    this.orderService.setGoodsStatus(sorderid, flage).then(response=>{
      if(response['status']==200 && flage==1){
        alert('货物已签收完成，欢迎下次光临')
      }else if(response['status']==200 && flage==0){
        alert('已申请退货，正在等待商家确认')
      }else if(response['status']!=200){
        alert(response['error'])
      }
    }).catch(err=>{
      alert('服务器异常， 请点击重试')
    })
  }

  selectMore(){
    this.orderService.getHisorderData().then(response=>{
      if(response['status']==200){
        this.projects = response['sorder'];
        this.len = Object.keys(response['sorder']).length
      }else {
        alert(response['error'])
      }
    }).catch(err=>{
      alert('服务器查询异常， 请刷新重试')
    })
  }
}
