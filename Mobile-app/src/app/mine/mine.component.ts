import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailValidator, equalValidator, mobileValidator} from "../guard/formValid";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit{

  num: number;
  i: number;
  array: string;
  leftNavs: string[] = ['基本信息', '重置密码'];
  info: object = {'username': '', 'Name': '', 'email': '', 'mobile': '', 'integral': ''};
  token: any = localStorage.getItem('userToken');

  infoFormModel: FormGroup;
  passwordFormModel: FormGroup;

  constructor( fb: FormBuilder, private router: Router, private auth: AuthService) {

    this.passwordFormModel = fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      newPasswordGroup: fb.group({
        password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
        confirmp:[''],
      }, {validator: equalValidator})
    });

    this.infoFormModel = fb.group({
      Name: [this.info['Name'],[Validators.required, Validators.maxLength(32)]],
      email: [this.info['email'], emailValidator],
      mobile: [this.info['mobile'], mobileValidator]
    });
  }

  ngOnInit(num: number=0) {
    if(num == 0){
      this.auth.disposeInfo(this.token).then((response) =>{
        this.showInfoStatus(response);
      }).catch((err) => {
        // console.log(err);
        alert('服务器请求失败，请重试')
      });
    }
    this.i = 0;
    this.array = this.leftNavs[num];
    this.num = num;
  }

  onSearchNav(index: number){
    this.array = this.leftNavs[index];
    this.num = index
    }

  onChangeInfo(){
    if(this.infoFormModel.valid){
      let message = confirm("是否确认更改用户信息");
      if (message == true) {
        this.auth.disposeInfo(this.token, this.infoFormModel.value).then(response=> {
          if(response['status'] == 200) {
            alert(response['success'] + "更改成功  " + response['error']);
          }else {
            alert("用户信息更改失败：" + response['error']);
          }
          this.ngOnInit(0);
          this.onSetValue();
        }).catch(err => {
          this.ngOnInit(0);
          this.onSetValue();
          alert('服务器请求失败，信息未更改，请重试')
        });
      } else if (message == false) {
        this.ngOnInit(0);
        this.onSetValue();
        alert("用户取消更改，更改无效");
      }
    }else {
      this.i = 0;
      this.onSetValue();
      alert("输入信息有误，更改失败，请重新输入");
    }
  }

  onSetValue() {
    if(this.i == 0){
      this.infoFormModel.get('Name').setValue(this.info['Name']);
      this.infoFormModel.get('email').setValue(this.info['email']);
      this.infoFormModel.get('mobile').setValue(this.info['mobile']);
    }this.i += 1;
  }

  onChangePW(){
    if(this.passwordFormModel.valid){
      let message = confirm("是否确认更改密码");
      if (message == true) {
        let dataPW: object = {
          'old_password': this.passwordFormModel.get('oldPassword').value,
          'new_password': this.passwordFormModel.get(['newPasswordGroup', 'password']).value,
          'confirm': this.passwordFormModel.get(['newPasswordGroup', 'confirmp']).value
        };
        this.auth.disposeInfo(this.token, null, dataPW).then(response=> {
          if(response['status'] == 200) {
            alert("用户密码已重置");
            this.passwordFormModel.get('oldPassword').reset('');
            this.passwordFormModel.get(['newPasswordGroup', 'password']).reset('');
            this.passwordFormModel.get(['newPasswordGroup', 'confirmp']).reset('');

          }else {
            alert(response['error']);
          }
        }).catch(err => {
          alert('服务器请求失败，更改无效，请重试')
        });
      } else if (message == false) {
        alert("密码更改无效");
      }
    }else {
      alert("输入格式错误，更改无效");
    }
  }

  onExit(){
    let message = confirm("是否确认退出当前用户");
    if (message == true) {
      alert("用户已退出，请重新登陆");
      localStorage.removeItem('userToken');
      this.router.navigate(['/login'])
    } else if (message == false) {
      alert("用户暂不退出");
    }
  }

  showInfoStatus(response: object) {
    if(response['status'] == 200) {
      let data = response['userInfo'];
      this.info = {
        'username': data['username'],
        'Name': data['Name'],
        'email': data['email'],
        'mobile': data['mobile'],
        'integral': data['integral']
      }
    }else {
      alert("用户信息查询失败：" + response['error']);
      this.router.navigate(['/login'])
    }
  }

}

