import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css']
})
export class SelectAddressComponent implements OnInit {

  Info: object[] = [
    {'username': '蒸', 'mobile': 13287275832, 'address': ''},
    {'username': '蒸', 'mobile': null , 'address': '你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜'},
    {'username': '', 'mobile': 13287275832, 'address': '你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜'},
    {'username': '蒸', 'mobile': 13287275832, 'address': '你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜你猜'},
    {'username': '蒸', 'mobile': 13287275832, 'address': '你猜'},

  ];

  userInfo: object[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.userInfo = this.Info
  }

  useAddress(index:number){
    // console.log(this.Info[index]);
    // 通过后台把用户信息推到order页面
    this.router.navigate(['/order'])
  }

  setAddress(index:number){
    // console.log(this.Info[index])
    // 通过后台把更改用户地址信息
  }

}
