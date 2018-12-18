import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {log} from "util";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  secret: boolean = false;
  loginFormModel: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private auth: AuthService) {
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
    if(this.loginFormModel.valid) {
      // let loginData: object = {
      //   'username': this.loginFormModel.get('username').value,
      //   'password': this.loginFormModel.get('password').value
      // };
      // console.log(loginData);
      this.auth.login(this.loginFormModel.value).then((response) => {
        this.loginStatus(response);
      }).catch((err) => {
        console.log(err)
      });
    }
  }

  loginStatus(response: object) {
    if(response['status'] == 200) {
      localStorage.setItem('userToken', response['userToken']);
      this.router.navigate(['/mine'])
    }else {
      // console.log(response['error']);
      alert("登陆失败 " + response['error'])
    }
  }
}
