import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  BAES_URL: string = 'http://www.webserver.sfc/cart';
  constructor(private http: HttpClient) { }

  gCartdata(): Promise<any>{
    let token = localStorage.getItem('userToken');
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`});
    let url: string = `${this.BAES_URL}/cart`;
    return this.http.get(url, {headers: headers}).toPromise()
  }

  handleGoods(GoodsId, status): Promise<any>{
    let token = localStorage.getItem('userToken');
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Good-Type': `Bearer ${GoodsId}`,
    });
    if(status == 'add'){
      let url: string = `${this.BAES_URL}/addGoods`;
      return this.http.get(url, {headers: headers}).toPromise()
    }else if (status == 'sub') {
      let url: string = `${this.BAES_URL}/subGoods`;
      return this.http.get(url, {headers: headers}).toPromise()
    }
  }


}
