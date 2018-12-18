import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  BAES_URL: string = 'http://www.webserver.sfc/home';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  gIndexdata(): Promise<any>{
    let url: string = `${this.BAES_URL}`;
    return this.http.get(url, {headers: this.headers}).toPromise()
  }

  gMenuGoods(MenuID): Promise<any>{
    let url: string = `${this.BAES_URL}/meunGoods`;
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Good-Type': `Bearer ${MenuID}`
    });
    return this.http.get(url, {headers: headers}).toPromise()
  }

  searchGoods(name): Promise<any>{
    let url: string = `${this.BAES_URL}/search`;
    return this.http.post(url, name,{headers: this.headers}).toPromise()
  }

  showGoodsInfo(GoodsId): Promise<any>{
    let url: string = `${this.BAES_URL}/goodsinfo`;
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Good-Type': `Bearer ${GoodsId}`
    });
    return this.http.get(url, {headers: headers}).toPromise()
  }

  addGoods2cart(GoodsId): Promise<any>{
    let token: string = localStorage.getItem('userToken');
    let url: string = `${this.BAES_URL}/addCart`;
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Good-Type': `Bearer ${GoodsId}`,
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(url, null,{headers: headers}).toPromise()
  }


}

