import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {mobileValidator} from "../../guard/formValid";
import {Router} from "@angular/router";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent implements OnInit {

  addressFormModel: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private orderService: OrderService) {
    this.addressFormModel = fb.group({
      username: ['', [Validators.required, Validators.maxLength(32)]],
      mobile: ['', mobileValidator],
      address: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.addressFormModel.valid) {
      console.log(this.addressFormModel.value);
      this.orderService.addAdderss(this.addressFormModel.value).then(response=>{
        alert("地址添加成功");
        this.router.navigate(['/order'])
      }).catch(err=>{
        alert('服务器响应异常，请重新提交')
      })
    } else {
      alert("地址添加失败，输入校验失败，请重新核对输入信息并提交");
    }
  }
}
