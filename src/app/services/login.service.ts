import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string = "http://localhost:9090/";
  private response: Observable<HttpResponse<Object>>;

  constructor(private http:HttpClient) { }

  login(user: String, password: String): Observable<HttpResponse<Object>>{
    var url = this.url + "login";
    const httpHeaders = new HttpHeaders({Authorization: 'Basic ' + btoa(user + ":" + password)})
    return this.http.get<HttpResponse<Object>>(url, {headers: httpHeaders, observe: "response", withCredentials: true});
  }

  logout(){
    var url = this.url + "api/logout";
    this.response = this.http.get<HttpResponse<Object>>(url, {withCredentials: true});
    this.response.subscribe();
  }
}
