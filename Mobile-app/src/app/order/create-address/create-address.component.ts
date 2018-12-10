import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {mobileValidator} from "../../guard/formValid";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent implements OnInit {

  addressFormModel: FormGroup;

  constructor(fb: FormBuilder, private router: Router) {
    this.addressFormModel = fb.group({
      username: ['', [Validators.required, Validators.maxLength(32)]],
      mobile: ['', mobileValidator],
      address: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    let registerValid: boolean = this.addressFormModel.valid;
    if (registerValid) {
      console.log(this.addressFormModel.value);
      alert("地址添加成功");
      this.router.navigate(['/order'])
    } else {
      alert("地址添加失败");
    }
  }
}
