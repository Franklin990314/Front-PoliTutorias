import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url:string = "http://localhost:9090/api/profile/";

  constructor(private http:HttpClient) { }

  getProfile(id: String): Observable<HttpResponse<Object>>{
    var url = this.url + id;
    return this.http.get<HttpResponse<Object>>(url, {observe: "response", withCredentials: true});
  }

}
