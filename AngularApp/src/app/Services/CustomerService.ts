import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService{

    constructor(private http:HttpClient,private _router:Router) { }

    _baseUrl ="https://localhost:44321/gateway/Customer";
    _loginUrl ="https://localhost:44321/gateway/Customer/login-user";

    addCustomer(input:any){
        return this.http.post<any>(this._baseUrl,input);
      }
      updateCustomer(input:any){
        return this.http.put<any>(this._baseUrl,input);
      }
      getCustomer(id:any){
        return this.http.get<any>(this._baseUrl+"?id="+id);
      }
      getAll()
      {
        return this.http.get<any>(this._baseUrl+"/GetAll");
      }
      login(input:any){
        return this.http.post<any>(this._loginUrl,input);
      }
}