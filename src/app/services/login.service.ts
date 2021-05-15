import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string = "http://localhost:9090/api/login";

  constructor(private http:HttpClient) { }

  login(user: String, password: String): Observable<HttpResponse<Object>>{
    var url = this.url;
    const httpHeaders = new HttpHeaders({Authorization: 'Basic ' + btoa(user + ":" + password)})
    return this.http.get<HttpResponse<Object>>(url, {headers: httpHeaders, observe: "response", withCredentials: true});
  }

  logout(){
    console.log("logout")
    this.http.get<HttpResponse<Object>>(this.url+"?logout");
  }
}
