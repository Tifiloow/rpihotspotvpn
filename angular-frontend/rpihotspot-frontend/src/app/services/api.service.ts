import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  req = {}
  constructor(private http: HttpClient) { }
  testapi(cb){

      this.req = this.http.get('http://localhost:3000/').subscribe((data)=>{
        cb(data)
      })

      }
      
  }
    