import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  BAES_URL = 'http://www.webserver.sfc/cart';

  constructor(private http: HttpClient) {
  }

  gCartdata(): Promise<any> {
    const token = localStorage.getItem('userToken');
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.BAES_URL}/cart`;
    return this.http.get(url, {headers: headers}).toPromise();
  }

  handleGoods(GoodsId, status): Promise<any> {
    const token = localStorage.getItem('userToken');
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Good-Type': `Bearer ${GoodsId}`,
    });
    if (status === 'add') {
      const url = `${this.BAES_URL}/addGoods`;
      return this.http.get(url, {headers: headers}).toPromise();
    } else if (status === 'sub') {
      const url = `${this.BAES_URL}/subGoods`;
      return this.http.get(url, {headers: headers}).toPromise();
    }
  }
}
