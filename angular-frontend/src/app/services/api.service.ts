import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'undefined'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient, private router: Router, private location: Location) { }

  getdomain(){
    var domain = window.location.origin
    return domain;
  }


  requestheader(){
    if(localStorage.getItem('token')){
      return {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*',
          'Content-Type':  'application/json',
          'Authorization': localStorage.getItem('token'),
        })
      };
  }else{
    return null;
  }
}



getusers(){
  const header = this.requestheader();
  if(header){
    return this.http.get(`${this.getdomain()}/api/getusers`, header)
  }else{
    return of(null)
  }
}

changehostname(hostname){
  const header = this.requestheader()
  if(header && hostname){
    return this.http.post(`${this.getdomain()}/api/changessid`,{ssid: hostname}, header);
  }else{
    return of(null) //error
  }
}
changepassword(password){
  const header = this.requestheader()
  if(header && password){
    return this.http.post(`${this.getdomain()}/api/changepassword`,{password: password}, header);
  }else{
    return of(null) //error
  }
}

startwifi(){
  const header = this.requestheader()
  if(header){
    return this.http.get(`${this.getdomain()}/api/startwifi`, header)
  }else{
    return of(null) //error
  }

}
stopwifi(){
  const header = this.requestheader()
  if(header){
    return this.http.get(`${this.getdomain()}/api/stopwifi`, header)
  }else{
    return of(null) //error
  }
}
ethernetstatus(){
  const header = this.requestheader()
  if(header){
    return this.http.get(`${this.getdomain()}/api/ethernetstatus`, header)
  }else{
    return of(null) //error
  }
}
}


