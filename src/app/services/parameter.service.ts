import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  private url:string = "http://localhost:9090/api/parameter/";

  constructor(private http:HttpClient) { }

  getCourses(): Observable<HttpResponse<Object>>{
    var url = this.url + "courses";
    return this.http.get<HttpResponse<Object>>(url, {observe: "response", withCredentials: true});
  }

  getInstructors(id: string): Observable<HttpResponse<Object>>{
    var url = this.url + "instructors/" + id;
    return this.http.get<HttpResponse<Object>>(url, {observe: "response", withCredentials: true});
  }
}
