import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertStringService} from '../../services/alert-string.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  secret = false;
  loginFormModel: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private auth: AuthService,
              private Alert: AlertStringService) {
    this.loginFormModel = fb.group({
      username: ['', [Validators.required, Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    });

  }

  ngOnInit() {

  }

  toSecret(flag: number) {
    this.secret = flag === 0;
  }

  onSubmit() {
    if (this.loginFormModel.valid) {
      this.auth.login(this.loginFormModel.value).then((response) => {
        this.loginStatus(response);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  loginStatus(response: object) {
    if (response['status'] === 200) {
      localStorage.setItem('userToken', response['userToken']);
      this.router.navigate(['/tabs/home']);
    } else {
      this.Alert.presentAlert('登陆失败 ' + response['error']);
    }
  }

}
