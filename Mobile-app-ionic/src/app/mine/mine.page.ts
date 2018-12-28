import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {emailValidator, equalValidator, mobileValidator} from '../services/formValid';
import {AlertStringService} from '../services/alert-string.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

  num: number;
  i: number;
  array: string;
  leftNavs: string[] = ['基本信息', '重置密码', '退出登录'];
  info: object = {'username': '', 'realname': '', 'email': '', 'mobile': '', 'integral': ''};
  token: any = localStorage.getItem('userToken');
  infoFormModel: FormGroup;
  passwordFormModel: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private auth: AuthService,
              private Alert: AlertStringService, private alertController: AlertController) {

    this.passwordFormModel = fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      newPasswordGroup: fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
        confirmp: [''],
      }, {validator: equalValidator})
    });

    this.infoFormModel = fb.group({
      realname: [this.info['realname'], [Validators.required, Validators.maxLength(32)]],
      email: [this.info['email'], emailValidator],
      mobile: [this.info['mobile'], mobileValidator]
    });
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }
  ngOnInit(num: number = 0) {
    if (num === 0) {
      this.auth.disposeInfo(this.token).then((response) => {
        this.showInfoStatus(response);
      }).catch((err) => {
        // console.log(err);
        this.Alert.presentAlert('服务器请求失败，请重试');
      });
    }
    this.i = 0;
    this.array = this.leftNavs[num];
    this.num = num;
  }

  onSearchNav(index: number) {
    this.array = this.leftNavs[index];
    this.num = index;
  }

  async onChangeInfo() {
    if (this.infoFormModel.valid) {
      const alert = await this.alertController.create({
        header: '警告',
        message: '是否确认更改用户信息',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.Alert.successAlert('用户取消更改，更改无效');
              this.ngOnInit(0);
              this.onSetValue();
            }
          }, {
            text: '确定',
            handler: () => {
              this.auth.disposeInfo(this.token, this.infoFormModel.value).then(response => {
                if (response['status'] === 200) {
                  this.Alert.successAlert(response['success'] + '更改成功  ' + response['error']);
                } else {
                  this.Alert.presentAlert('用户信息更改失败：' + response['error']);
                  this.ngOnInit(0);
                  this.onSetValue();
                }
              }).catch(err => {
                this.ngOnInit(0);
                this.onSetValue();
                this.Alert.presentAlert('服务器请求失败，信息未更改，请重试');
              });
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.i = 0;
      this.onSetValue();
      this.Alert.presentAlert('输入信息有误，更改失败，请重新输入');
    }
  }

  onSetValue() {
    if (this.i === 0) {
      this.infoFormModel.get('realname').setValue(this.info['realname']);
      this.infoFormModel.get('email').setValue(this.info['email']);
      this.infoFormModel.get('mobile').setValue(this.info['mobile']);
    }
    this.i += 1;
  }

  async onChangePW() {
    if (this.passwordFormModel.valid) {
      const alert = await this.alertController.create({
        header: '警告',
        message: '是否确认更改密码',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.Alert.successAlert('用户取消更改，更改无效');
            }
          }, {
            text: '确定',
            handler: () => {
              const dataPW: object = {
                'old_password': this.passwordFormModel.get('oldPassword').value,
                'new_password': this.passwordFormModel.get(['newPasswordGroup', 'password']).value,
                'confirm': this.passwordFormModel.get(['newPasswordGroup', 'confirmp']).value
              };
              this.auth.disposeInfo(this.token, null, dataPW).then(response => {
                if (response['status'] === 200) {
                  this.Alert.successAlert('用户密码已重置');
                  this.passwordFormModel.get('oldPassword').reset('');
                  this.passwordFormModel.get(['newPasswordGroup', 'password']).reset('');
                  this.passwordFormModel.get(['newPasswordGroup', 'confirmp']).reset('');

                } else {
                  this.Alert.presentAlert(response['error']);
                }
              }).catch(err => {
                this.Alert.presentAlert('服务器请求失败，更改无效，请重试');
              });
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.Alert.presentAlert('输入格式错误，更改无效');
    }
  }

  async onExit() {
    const alert = await this.alertController.create({
      header: '警告',
      message: '是否确认退出当前用户',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.Alert.successAlert('用户取消更改，暂不退出');
          }
        }, {
          text: '确定',
          handler: () => {
            this.Alert.successAlert('用户已退出，请重新登陆');
            localStorage.removeItem('userToken');
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }

  showInfoStatus(response: object) {
    if (response['status'] === 200) {
      const data = response['userInfo'];
      this.info = {
        'username': data['username'],
        'realname': data['realname'],
        'email': data['email'],
        'mobile': data['mobile'],
        'integral': data['integral']
      };
    } else {
      this.Alert.presentAlert('用户信息查询失败：' + response['error']);
      localStorage.removeItem('userToken');
      this.router.navigate(['/login']);
    }
  }
}
