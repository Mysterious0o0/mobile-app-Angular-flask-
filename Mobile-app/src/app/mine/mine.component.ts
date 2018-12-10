import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailValidator, equalValidator, mobileValidator} from "../guard/formValid";

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit{

  infoFormModel: FormGroup;
  passwordFormModel: FormGroup;

  constructor(fb: FormBuilder) {
    this.passwordFormModel = fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      newPasswordGroup: fb.group({
        password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
        confirmp:[''],
      }, {validator: equalValidator})
    });
    this.infoFormModel = fb.group({
      Name: [this.userInfo['Name'], [Validators.required, Validators.maxLength(32)]],
      email: [this.userInfo['email'], emailValidator],
      mobile: [this.userInfo['mobile'], mobileValidator]
    })
  }

  userInfo: object = {'username': 'xxx', 'Name': 'xxx', 'email': '787878778@qq.com', 'mobile': 12345678901, 'integral':55};

  leftNavs: string[] = ['基本信息', '重置密码'];
  array: string;
  num: number;
  info: object;

  ngOnInit(i: number=0) {
    this.array = this.leftNavs[i];
    this.info = this.userInfo;
    this.num = i;
  }

  onSearchNav(index: number){
    this.array = this.leftNavs[index];
    this.num = index
    }

  rec(state: string) {
    switch (state) {
      case 'changeInfo': {
        let message = confirm("是否确认更改用户信息");
        if (message == true) {
          alert("信息已更改");
          this.ngOnInit(0);
        } else if (message == false) {
          alert("更改无效");
        }
      }break;
      case 'changePass':{
        let message = confirm("是否确认更改密码");
        if (message == true) {
          alert("密码已更改");
          this.ngOnInit(1);
        } else if (message == false) {
          alert("更改无效");
        }
      }break;
    }
  }

  onSubmit(){
    // console.log(this.passwordFormModel.value);
    if(this.passwordFormModel.valid){
      // this.passwordFormModel.get('oldPassword').setValue('请输入旧密码');
      // this.passwordFormModel.get(['newPasswordGroup', 'password']).setValue('请输入新密码');
      // this.passwordFormModel.get(['newPasswordGroup', 'confirmp']).setValue('请确认密码');

      this.rec('changePass');
    }else {
      alert("输入错误，更改失败");
    }
  }

  onChangeInfo(){
    if(this.infoFormModel.valid){
      this.rec('changeInfo')
    }else {
      alert("输入错误，更改失败");
    }
  }
}
