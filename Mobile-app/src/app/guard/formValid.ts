import {FormControl, FormGroup} from "@angular/forms";


export function mobileValidator(control: FormControl): any {
  // 手机号正则表达式
  const mobieReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  // 校验输入的值
  const valid = mobieReg.test(control.value);
  return valid ? null : {mobile : true};
}

export function emailValidator(control: FormControl): any{
  // 邮箱正则表达式
  const emailReg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
  // 校验输入的值
  const valid = emailReg.test(control.value);
  return valid ? null : {email : true};

}

export function equalValidator(group: FormGroup): any {
  const password: FormControl = group.get('password') as FormControl;
  const confirmp: FormControl = group.get('confirmp') as FormControl;
  // 校验结果
  const valid: boolean = (confirmp.value === password.value);
  // console.log('密码校验结果' + valid);
  return valid ? null : {equal: {err: "密码和确认密码不匹配"}};
}
