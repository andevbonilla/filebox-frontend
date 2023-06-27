import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = localStorage.getItem('token') || '';
  baseUrl:any = environment.baseUrl;

  public userInfo:any;

  constructor(private http:HttpClient) { 
  }

  loginService(body:any){
    return this.http.post(`${this.baseUrl}/api/auth/login`, body).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token)
      })
    )
  }

  renewToken(){

    return this.http.get(`${this.baseUrl}/api/auth/renew-token`, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap((resp:any)=>{

        const {email, google, username, _id, img} = resp.user;
        this.userInfo = new UserModel(username, email, img, google, _id);

        localStorage.setItem('token', resp.token);

      }),
      map(resp=> true),
      catchError(error=> of(false))
    )

  }
}
