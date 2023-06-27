import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  token = localStorage.getItem('token') || '';
  baseUrl:any = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getFiles(uid:any, amount:number){
    
    return this.http.get(`${this.baseUrl}/api/file/files/${uid}/${amount}`, {
      headers: {
        'x-token': this.token
      }
    })
  }

  getFile(id:any){
    
    return this.http.get(`${this.baseUrl}/api/file/${id}`, {
      headers: {
        'x-token': this.token
      }
    })
  }

  deleteFile(fileId:any){
    
    return this.http.delete(`${this.baseUrl}/api/file/${fileId}`, {
      headers: {
        'x-token': this.token
      }
    })
  }

  uptadeFile(fileId:any, newName:any){
    
    return this.http.put(`${this.baseUrl}/api/file/${fileId}`, {newName},{
      headers: {
        'x-token': this.token
      }
    })
  }

  getSignedUrl(aws_key:any){
    
    return this.http.get(`${this.baseUrl}/api/file/url/${aws_key}`,{
      headers: {
        'x-token': this.token
      }
    })
  }
}
