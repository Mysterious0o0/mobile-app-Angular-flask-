import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  BAES_URL: string = 'http://www.webserver.sfc/order';

  constructor(private http: HttpClient) { }

  gOrderdata(addressid): Promise<any>{
    let token = localStorage.getItem('userToken');
    let url: string = `${this.BAES_URL}`;
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'ADDRESS-Type': `Bearer ${addressid}`});
    return this.http.get(url, {headers: headers}).toPromise()
  }

  buyCart(addressid): Promise<any>{
    let token = localStorage.getItem('userToken');

    let url: string = `${this.BAES_URL}/buycart`;
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'ADDRESS-Type': `Bearer ${addressid}`});
    return this.http.get(url, {headers: headers}).toPromise()
  }

  addAdderss(addressForm): Promise<any>{
    let token = localStorage.getItem('userToken');
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`});
    let url: string = `${this.BAES_URL}/addAddress`;
    return this.http.post(url, addressForm, {headers: headers}).toPromise()
  }

  selectAddress(): Promise<any>{
    let token = localStorage.getItem('userToken');
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`});
    let url: string = `${this.BAES_URL}/seladdress`;
    return this.http.get(url, {headers: headers}).toPromise()
  }

  setAddress(addressId): Promise<any>{
    let token = localStorage.getItem('userToken');
    let url: string = `${this.BAES_URL}/setaddress`;
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'ADDRESS-Type': `Bearer ${addressId}`});
    return this.http.get(url, {headers: headers}).toPromise()
  }

  getSorderData(): Promise<any>{
    let token = localStorage.getItem('userToken');
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`});
    let url: string = `${this.BAES_URL}/getsorder`;
    return this.http.get(url, {headers: headers}).toPromise()
  }

  setGoodsStatus(orderid, flage): Promise<any>{
    let token = localStorage.getItem('userToken');
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Status-Type': `Bearer ${orderid}`});
    if(flage==0){
      // 退货
      let url: string = `${this.BAES_URL}/goodsRejected`;
      return this.http.get(url, {headers: headers}).toPromise()
    }else{
      // 签收
      let url: string = `${this.BAES_URL}/signForGoods`;
      return this.http.get(url, {headers: headers}).toPromise()
    }
  }
  getHisorderData(): Promise<any>{
    let token = localStorage.getItem('userToken');
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`});
    let url: string = `${this.BAES_URL}/gethisorder`;
    return this.http.get(url, {headers: headers}).toPromise()
  }
}

