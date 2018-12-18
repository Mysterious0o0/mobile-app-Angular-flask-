import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token: string = localStorage.getItem('userToken');
  BAES_URL: string = 'http://www.webserver.sfc/cart';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`});

  constructor(private http: HttpClient) { }

  gCartdata(): Promise<any>{
    let url: string = `${this.BAES_URL}/cart`;
    return this.http.get(url, {headers: this.headers}).toPromise()
  }

  handleGoods(GoodsId, status): Promise<any>{
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      'Good-Type': `Bearer ${GoodsId}`,
    });
    if(status == 'add'){
      let url: string = `${this.BAES_URL}/addGoods`;
      return this.http.get(url, {headers: headers}).toPromise()
    }else {
      let url: string = `${this.BAES_URL}/subGoods`;
      return this.http.get(url, {headers: headers}).toPromise()

    }
  }
}
