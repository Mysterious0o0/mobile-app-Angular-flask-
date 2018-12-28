import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  BAES_URL = 'http://www.webserver.sfc/order';

  constructor(private http: HttpClient) {
  }

  gOrderdata(addressid): Promise<any> {
    const token = localStorage.getItem('userToken');
    const url  = `${this.BAES_URL}`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'ADDRESS-Type': `Bearer ${addressid}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  buyCart(addressid): Promise<any> {
    const token = localStorage.getItem('userToken');

    const url  = `${this.BAES_URL}/buycart`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'ADDRESS-Type': `Bearer ${addressid}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  addAdderss(addressForm): Promise<any> {
    const token = localStorage.getItem('userToken');
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url  = `${this.BAES_URL}/addAddress`;
    return this.http.post(url, addressForm, {headers: headers}).toPromise();
  }

  selectAddress(): Promise<any> {
    const token = localStorage.getItem('userToken');
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url  = `${this.BAES_URL}/seladdress`;
    return this.http.get(url, {headers: headers}).toPromise();
  }

  setAddress(addressId): Promise<any> {
    const token = localStorage.getItem('userToken');
    const url  = `${this.BAES_URL}/setaddress`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'ADDRESS-Type': `Bearer ${addressId}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  getSorderData(index= 0): Promise<any> {
    const token = localStorage.getItem('userToken');
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token} ${index}`
    });
    const url  = `${this.BAES_URL}/getsorder`;
    return this.http.get(url, {headers: headers}).toPromise();
  }

  setGoodsStatus(orderid, flage): Promise<any> {
    const token = localStorage.getItem('userToken');
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Status-Type': `Bearer ${orderid}`
    });
    if (flage === 0) {
      // 退货
      const url  = `${this.BAES_URL}/goodsRejected`;
      return this.http.get(url, {headers: headers}).toPromise();
    } else {
      // 签收
      const url  = `${this.BAES_URL}/signForGoods`;
      return this.http.get(url, {headers: headers}).toPromise();
    }
  }

  getHisorderData(): Promise<any> {
    const token = localStorage.getItem('userToken');
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.BAES_URL}/gethisorder`;
    return this.http.get(url, {headers: headers}).toPromise();
  }
}
