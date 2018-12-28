import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {mobileValidator} from '../../services/formValid';
import {OrderService} from '../../services/order.service';
import {AlertStringService} from '../../services/alert-string.service';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent implements OnInit {

  addressFormModel: FormGroup;
  addressid = '';

  constructor(fb: FormBuilder, private router: Router, private orderService: OrderService,
              private routerInfo: ActivatedRoute, private Alert: AlertStringService) {
    this.addressFormModel = fb.group({
      username: ['', [Validators.required, Validators.maxLength(32)]],
      mobile: ['', mobileValidator],
      address: ['', Validators.required]
    });
    this.addressid = routerInfo.snapshot.params['index'];
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.addressFormModel.valid) {
      console.log(this.addressFormModel.value);
      this.orderService.addAdderss(this.addressFormModel.value).then(response => {
        if (response['status'] === 200) {
          this.Alert.presentAlert('地址添加成功');
          this.router.navigate(['/goorder', response['addressid']], {skipLocationChange: true});
        } else if (response['status'] === 403) {
          this.Alert.presentAlert(response['error']);
          localStorage.removeItem('userToken');
          this.router.navigate(['/tabs/mine/login']);
        } else {
          this.Alert.presentAlert(response['error']);
        }

      }).catch(err => {
        this.Alert.presentAlert('服务器响应异常，请重新提交');
      });
    } else {
      this.Alert.presentAlert('地址添加失败，输入校验失败，请重新核对输入信息并提交');
    }
  }

  goOrder() {
    this.router.navigate(['./goorder', this.addressid], {skipLocationChange: true});
  }

}
