import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailValidator, equalValidator, mobileValidator} from "../../guard/formValid";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  secret: boolean = false;
  registerFormModel: FormGroup;

  constructor(fb: FormBuilder, private router: Router) {
    this.registerFormModel = fb.group({
      username:['', [Validators.required, Validators.maxLength(32)]],
      email: ['', emailValidator],
      mobile: ['', mobileValidator],
      passwordGroup: fb.group({
        password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
        confirmp:[''],
      }, {validator: equalValidator})

    })
  }

  ngOnInit() {
  }

  toSecret(flag:number) {
    console.log(flag);
    this.secret = flag == 0;
  }

  onSubmit(){
    let registerValid: boolean = this.registerFormModel.valid;
    if(registerValid) {
      console.log(this.registerFormModel.value);
      alert("注册成功");
      this.router.navigate(['/login'])
    }else {
      alert("注册失败");

    }

  }
}
