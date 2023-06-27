import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  token = localStorage.getItem('token') || '';
  baseUrl:any = environment.baseUrl;

  constructor(private http:HttpClient) { }

  searchFilesFolders(param:any){

    return this.http.get(`${this.baseUrl}/api/search/${param}`, {
      headers: {
        'x-token': this.token
      }
    })
  }
}
