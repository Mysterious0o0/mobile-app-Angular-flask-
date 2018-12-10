import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  secret: boolean = false;
  loginFormModel: FormGroup;

  constructor(fb: FormBuilder) {
    this.loginFormModel = fb.group({
      username:['', [Validators.required, Validators.maxLength(32)]],
      password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    })
  }

  ngOnInit() {
  }

  toSecret(flag:number) {
    this.secret = flag == 0;
  }

  onSubmit(){
    let nameValid: boolean = this.loginFormModel.get('username').valid;
    // console.log("username 校验结果为：" + nameValid);
    let passValid: boolean = this.loginFormModel.get('password').valid;
    // console.log("username 校验结果为：" + passValid);
    if(nameValid && passValid) {
      console.log('登陆成功'); // 与后台关联，加入账号密码校验
      console.log('账号：' + this.loginFormModel.get('username').value);
      console.log('密码：' + this.loginFormModel.get('password').value)
    }
  }
}
