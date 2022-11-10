import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class requestService{

    constructor(private http:HttpClient,private _router:Router) { }

    _baseUrl ="https://localhost:44321/gateway/request";
    _delete = "https://localhost:44321/gateway/request?id=";
    _pending = "https://localhost:44321/gateway/request/GetPending?id=";

    addRequest(input:any){
        return this.http.post<any>(this._baseUrl,input);
      }

      EditRequest(input:any){
        return this.http.put<any>(this._baseUrl,input);
      }

      geRequests(id:any){
        
        return this.http.get<any>(this._baseUrl+"?id="+id);
      }
 
      getPending(id:any){
        return  this.http.get<any>(this._pending+id);
      }
      deleteBook(id:any){
        debugger;
        return this.http.delete<any>(this._delete+id);
      }
      

}