import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  BAES_URL = 'http://www.webserver.sfc/home';

  constructor(private http: HttpClient) {
  }

  gIndexdata(index, ways= null): Promise<any> {
    const url = `${this.BAES_URL}`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Good-Index': `Bearer ${index} ${ways}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  gMenuGoods(MenuID, index, ways= null): Promise<any> {
    const url = `${this.BAES_URL}/meunGoods`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Good-Type': `Bearer ${MenuID} ${index} ${ways}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  searchGoods(name): Promise<any> {
    const url = `${this.BAES_URL}/search`;
    const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(url, name, {headers: headers}).toPromise();
  }

  showGoodsInfo(GoodsId): Promise<any> {
    const url = `${this.BAES_URL}/goodsinfo`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Good-Type': `Bearer ${GoodsId}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  addGoods2cart(GoodsId): Promise<any> {
    const token: string = localStorage.getItem('userToken');
    const url = `${this.BAES_URL}/addCart`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Good-Type': `Bearer ${GoodsId}`,
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(url, null, {headers: headers}).toPromise();
  }

}
