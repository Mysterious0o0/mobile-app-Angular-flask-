import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {emailValidator, equalValidator, mobileValidator} from '../../services/formValid';
import {AlertStringService} from '../../services/alert-string.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  secret = false;
  registerFormModel: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private auth: AuthService,
              private Alert: AlertStringService) {
    this.registerFormModel = fb.group({
      username: ['', [Validators.required, Validators.maxLength(32)]],
      email: ['', emailValidator],
      mobile: ['', mobileValidator],
      passwordGroup: fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
        confirmp: [''],
      }, {validator: equalValidator})

    });
  }

  ngOnInit() {
  }

  toSecret(flag: number) {
    // console.log(flag);
    this.secret = flag === 0;
  }

  onSubmit() {
    const registerValid: boolean = this.registerFormModel.valid;
    if (registerValid) {
      const data: object = {
        'username': this.registerFormModel.get('username').value,
        'email': this.registerFormModel.get('email').value,
        'mobile': this.registerFormModel.get('mobile').value,
        'password': this.registerFormModel.get(['passwordGroup', 'password']).value,
        'confirm': this.registerFormModel.get(['passwordGroup', 'confirmp']).value
      };
      this.auth.register(data).then((response) => {
        this.rigisterStatus(response, data['username']);
      }).catch((err) => {
        // console.log(err);
        this.Alert.presentAlert('服务器请求失败，请重试');
      });
    } else {
      this.Alert.presentAlert('输入信息有误，注册失败');
    }
  }

  rigisterStatus(response: object, name: string) {
    if (response['status'] === 200) {
      this.Alert.successAlert(name + '注册成功');
      this.router.navigate(['/login']);
    } else {
      this.Alert.presentAlert(name + '注册失败  ' + response['error']);
    }
  }

}
