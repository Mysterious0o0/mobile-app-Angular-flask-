import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    BAES_URL = 'http://www.webserver.sfc/mine';
    private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) {
    }


    login(user): Promise<any> {
        const url = `${this.BAES_URL}/login`;
        return this.http.post(url, user, {headers: this.headers}).toPromise();
    }

    register(user): Promise<any> {
        const url = `${this.BAES_URL}/register`;
        return this.http.post(url, user, {headers: this.headers}).toPromise();
    }

    disposeInfo(token, infoForm = null, passForm = null): Promise<any> {
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        // 请求数据
        if (infoForm == null && passForm == null) {
            const url = `${this.BAES_URL}/showInfo`;
            return this.http.get(url, {headers: headers}).toPromise();
        } else if (passForm == null) {
            // 更改用户信息
            const url = `${this.BAES_URL}/changeInfo`;
            return this.http.post(url, infoForm, {headers: headers}).toPromise();
        } else {
            // 更改密码
          const url = `${this.BAES_URL}/changePW`;
            return this.http.post(url, passForm, {headers: headers}).toPromise();
        }
    }


}

