import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BAES_URL: string = 'http://www.webserver.sfc/mine';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }


  login(user): Promise<any>{
    let url: string = `${this.BAES_URL}/login`;
    return this.http.post(url, user, {headers: this.headers}).toPromise()
  }

  register(user): Promise<any>{
    let url: string = `${this.BAES_URL}/register`;
    return this.http.post(url, user, {headers: this.headers}).toPromise()
  }

  disposeInfo(token, infoForm=null, passForm=null): Promise<any>{
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // 请求数据
    if(infoForm == null && passForm == null){
      let url: string = `${this.BAES_URL}/showInfo`;
      return this.http.get(url, {headers: headers}).toPromise()
    }
    // 更改用户信息
    else if(passForm == null){
      let url: string = `${this.BAES_URL}/changeInfo`;
      return this.http.post(url, infoForm, {headers: headers}).toPromise()
    }
    //更改密码
    else {
      let url: string = `${this.BAES_URL}/changePW`;
      return this.http.post(url, passForm, {headers: headers}).toPromise()
    }
     }


}
