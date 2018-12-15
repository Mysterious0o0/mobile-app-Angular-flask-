import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailValidator, equalValidator, mobileValidator} from "../../guard/formValid";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  secret: boolean = false;
  registerFormModel: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private auth: AuthService) {
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
    // console.log(flag);
    this.secret = flag == 0;
  }

  onSubmit(){
    let registerValid: boolean = this.registerFormModel.valid;
    if(registerValid) {
      let data: object = {
        'username': this.registerFormModel.get('username').value,
        'email': this.registerFormModel.get('email').value,
        'mobile': this.registerFormModel.get('mobile').value,
        'password': this.registerFormModel.get(['passwordGroup', 'password']).value,
        'confirm': this.registerFormModel.get(['passwordGroup', 'confirmp']).value
      };
      this.auth.register(data).then((response) => {
          this.rigisterStatus(response, data['username'])
        }).catch((err) => {
        // console.log(err);
        alert('服务器请求失败，请重试')
        });
    }else {
      alert("注册失败");
    }
  }

  rigisterStatus(response: object, name:string) {
    if(response['status'] == 200) {
      alert(name + "注册成功");
      this.router.navigate(['/login'])
    }else {
      alert(name + "注册失败  " + response['error'])
    }
  }
}
