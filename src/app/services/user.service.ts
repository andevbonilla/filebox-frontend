import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = localStorage.getItem('token') || '';
  baseUrl:any = environment.baseUrl;

  constructor(private http:HttpClient,
              private router:Router) { }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  createUser(body:any){
    return this.http.post(`${this.baseUrl}/api/user/create`, body).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token)
      })
    )
  }

  getUser(id:any){

    return this.http.get(`${this.baseUrl}/api/user/${id}`, {
      headers: {
        'x-token': this.token
      }
    })
  }

  uploadImage(fileImg:any, uid:any, folderId:any){

    return this.http.post(`${this.baseUrl}/api/file/upload-image/${uid}/${folderId}`, fileImg, {
      headers: {
        'x-token': this.token,
      }
    })
  }

}
