import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private url:string = "http://localhost:9090/api/tutorial/";

  constructor(private http:HttpClient) { }

  post(data: Tutorial): Observable<HttpResponse<Object>>{
    var url = this.url;
    return this.http.post<HttpResponse<Object>>(url, data, {observe: "response", withCredentials: true});
  }

  getAll(): Observable<HttpResponse<Object>>{
    var url = this.url;
    return this.http.get<HttpResponse<Object>>(url, {observe: "response", withCredentials: true});
  }

  getbyId(id: number): Observable<HttpResponse<Object>>{
    var url = this.url + id;
    return this.http.get<HttpResponse<Object>>(url, {observe: "response", withCredentials: true});
  }

  put(id: number, data: Tutorial): Observable<HttpResponse<Object>>{
    var url = this.url + id;
    return this.http.put<HttpResponse<Object>>(url, data, {observe: "response", withCredentials: true});
  }

  delete(id: number): Observable<HttpResponse<Object>>{
    var url = this.url + id;
    return this.http.delete<HttpResponse<Object>>(url, {observe: "response", withCredentials: true});
  }

}
