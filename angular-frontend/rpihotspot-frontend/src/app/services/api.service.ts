import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  req = {}
  constructor(private http: HttpClient) { }
  testapi(){

      this.req = this.http.get('https://localhost:3000/').subscribe((data)=>{
        return data;
      })

      }
      
    }
    