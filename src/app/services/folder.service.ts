import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  token = localStorage.getItem('token') || '';
  baseUrl:any = environment.baseUrl;

  constructor(private http:HttpClient) { }

  createFolder(body:any){
    
    return this.http.post(`${this.baseUrl}/api/folder/create`, body, {
      headers: {
        'x-token': this.token
      }
    })
  }

  getFolders(uid:any){
    
    return this.http.get(`${this.baseUrl}/api/folder/${uid}`, {
      headers: {
        'x-token': this.token
      }
    })
  }

  getFolder(id:any){
    
    return this.http.get(`${this.baseUrl}/api/folder/folder/${id}`, {
      headers: {
        'x-token': this.token
      }
    })
  }

  addFileToFolder(fileId:string, foldersIds:any[]){
    
    return this.http.put(`${this.baseUrl}/api/folder/add/file`, {fileId, foldersIds}, {
      headers: {
        'x-token': this.token
      }
    })
  }


  updateFolder(folderId:string , newName:string){
    
    return this.http.put(`${this.baseUrl}/api/folder/${folderId}`, {newName}, {
      headers: {
        'x-token': this.token
      }
    })
  }

  deleteFolder(folderId:string){
    
    return this.http.delete(`${this.baseUrl}/api/folder/${folderId}`, {
      headers: {
        'x-token': this.token
      }
    })
  }


}
